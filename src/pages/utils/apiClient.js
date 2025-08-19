/**
 * API client utility for making requests, now relying on HttpOnly cookies for authentication.
 */

/**
 * Refreshes the authentication token by calling the refresh-token endpoint
 * @returns {Promise<boolean>} - Whether the token refresh was successful
 */
const refreshAuthToken = async () => {
  try {
    const baseUrl = process.env.API_URL || ""
    const refreshUrl = `${baseUrl}/api/auth/refresh-token`

    // Call the refresh token endpoint
    const response = await fetch(refreshUrl, {
      method: "POST",
      credentials: "include", // Important for cookies
    })

    if (!response.ok) {
      throw new Error("Token refresh failed")
    }

    return true // Token refresh successful
  } catch (error) {
    error.message
    return false // Token refresh failed
  }
}

/**
 * Creates a fetch request, including credentials for HttpOnly cookies.
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Fetch options
 * @returns {Promise<Response>} - Fetch response
 */
export const fetchWithAuth = async (url, options = {}) => {
  const baseUrl = import.meta.env.VITE_API_URL || ""
  const fullUrl = url.startsWith("http")
    ? url
    : `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`

  // Check if this is an authentication endpoint
  const isAuthEndpoint =
    url.includes("/auth/signin") ||
    url.includes("/auth/signup") ||
    url.includes("/auth/forgot-password") ||
    url.includes("/auth/reset-password")

  // Default headers
  let headers = {
    "Content-Type": "application/json", // Default, can be overridden
    ...options.headers,
  }

  // If body is FormData, remove Content-Type so browser can set it with boundary
  if (options.body instanceof FormData) {
    delete headers["Content-Type"]
  }

  // Ensure credentials (cookies) are sent with the request
  const requestOptions = {
    ...options,
    headers,
    credentials: "include", // Crucial for sending HttpOnly cookies
  }

  try {
    const response = await fetch(fullUrl, requestOptions)

    // If unauthorized and not already trying to refresh token, and not an auth endpoint
    if (
      response.status === 401 &&
      !url.includes("/refresh-token") &&
      !isAuthEndpoint
    ) {
      // console.log("[fetchWithAuth] Received 401, attempting token refresh...")

      // Try to refresh the token
      const refreshSuccess = await refreshAuthToken()

      if (refreshSuccess) {
        // console.log("[fetchWithAuth] Token refresh successful, retrying original request...")
        // Retry the original request with the new token
        const retryResponse = await fetch(fullUrl, requestOptions)

        // Process the retry response the same way as the original
        if (!retryResponse.ok) {
          let errorData
          try {
            errorData = await retryResponse.json()
          } catch (e) {
            // If response is not JSON, use status text or a generic message
            errorData = {
              message:
                retryResponse.statusText ||
                e.message ||
                `Request failed with status ${retryResponse.status}`,
            }
          }

          const error = new Error(
            errorData.message ||
              `Request failed with status ${retryResponse.status}`
          )
          // Mimic Axios error structure for consistency if needed by other parts of the app
          error.response = {
            data: errorData,
            status: retryResponse.status,
            statusText: retryResponse.statusText,
          }
          throw error
        }

        return retryResponse
      } else {
        // console.log("[fetchWithAuth] Token refresh failed, user needs to log in again")
        // If refresh failed, throw authentication error
        throw new Error("Authentication failed. Please log in again.")
      }
    }

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch (e) {
        // If response is not JSON, use status text or a generic message
        errorData = {
          message:
            response.statusText ||
            e.message ||
            `Request failed with status ${response.status}`,
        }
      }

      const error = new Error(
        errorData.message || `Request failed with status ${response.status}`
      )
      // Mimic Axios error structure for consistency if needed by other parts of the app
      error.response = {
        data: errorData,
        status: response.status,
        statusText: response.statusText,
      }
      throw error
    }

    return response
  } catch (error) {
    // Only redirect if it's not an authentication endpoint and the error is from token refresh failure
    if (
      error.message === "Authentication failed. Please log in again." &&
      !isAuthEndpoint
    ) {
      // Clear user data from localStorage to force logout
      localStorage.removeItem("user")
      localStorage.removeItem("role")

      // Redirect to login page
      window.location.href = "/login"
    }

    throw error
  }
}

/**
 * Helper function for GET requests
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Fetch options (optional)
 * @returns {Promise<Object|null|string>} - JSON response data, null for 204, or text
 */
export const get = async (url, options = {}) => {
  const response = await fetchWithAuth(url, { ...options, method: "GET" })
  if (response.status === 204) {
    return null
  }
  const contentType = response.headers.get("content-type")
  if (contentType && contentType.includes("application/json")) {
    return response.json()
  }
  return response.text() // Return as text if not JSON (e.g., for plain string responses)
}

/**
 * Helper function for POST requests
 * @param {string} url - The API endpoint URL
 * @param {Object} body - Request body
 * @param {Object} options - Fetch options (optional)
 * @returns {Promise<Object|null|string>} - JSON response data, null for 204, or text
 */
export const post = async (url, body, options = {}) => {
  const response = await fetchWithAuth(url, {
    ...options,
    method: "POST",
    body: body instanceof FormData ? body : JSON.stringify(body),
  })
  if (response.status === 204) {
    return null
  }
  const contentType = response.headers.get("content-type")
  if (contentType && contentType.includes("application/json")) {
    return response.json()
  }
  return response.text()
}

/**
 * Makes a PUT request, including credentials for HttpOnly cookies.
 * @param {string} url - The API endpoint URL
 * @param {Object} body - Request body
 * @param {Object} options - Additional fetch options
 * @returns {Promise<any>} - Parsed response data
 */
export const put = async (url, body, options = {}) => {
  const response = await fetchWithAuth(url, {
    method: "PUT",
    body: body instanceof FormData ? body : JSON.stringify(body),
    ...options,
  })
  if (response.status === 204) return null
  // Assuming JSON response for PUT, adjust if other content types are expected
  const contentType = response.headers.get("content-type")
  if (contentType && contentType.includes("application/json")) {
    return response.json()
  }
  return response.text()
}

/**
 * Makes a PATCH request, including credentials for HttpOnly cookies.
 * @param {string} url - The API endpoint URL
 * @param {Object} body - Request body
 * @param {Object} options - Additional fetch options
 * @returns {Promise<any>} - Parsed response data
 */
export const patch = async (url, body, options = {}) => {
  const response = await fetchWithAuth(url, {
    method: "PATCH",
    body: body instanceof FormData ? body : JSON.stringify(body),
    ...options,
  })
  if (response.status === 204) return null
  // Assuming JSON response for PATCH, adjust if other content types are expected
  const contentType = response.headers.get("content-type")
  if (contentType && contentType.includes("application/json")) {
    return response.json()
  }
  return response.text()
}

/**
 * Makes a DELETE request, including credentials for HttpOnly cookies.
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Additional fetch options
 * @returns {Promise<any>} - Parsed response data
 */
export const del = async (url, options = {}) => {
  const response = await fetchWithAuth(url, {
    method: "DELETE",
    ...options,
  })
  if (response.status === 204) return null
  // Assuming JSON response for DELETE, adjust if other content types are expected
  const contentType = response.headers.get("content-type")
  if (contentType && contentType.includes("application/json")) {
    return response.json()
  }
  return response.text()
}
