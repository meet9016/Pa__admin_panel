/**
 * Authentication service for handling all auth-related API requests
 */

import { post, get, patch } from "../utils/apiClient"

// Base API URL - can be configured based on environment
// const API_URL = `${import.meta.env.VITE_API_URL || ""}/api/auth`
const API_URL = "https://pa.2-min.in/"
/**
 * Login user with email and password
 * @param {Object} credentials - User credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} User data with token
 */
export const loginUser = async (credentials) => {
  try {
    const response = await post(`${API_URL}/${endPointApi.loginUser}`, credentials)
    return response
  } catch (error) {
    // console.error("Login error:", {
    //   message: error.message,
    //   status: error.response?.status,
    //   data: error.response?.data,
    // })

    // Handle specific error types
    if (error.response?.status === 401) {
      throw new Error("Invalid email or password")
    } else if (error.response?.status >= 500) {
      throw new Error("Server error. Please try again later.")
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message)
    }

    throw new Error("Login failed. Please try again.")
  }
}

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.name - User's full name
 * @param {string} userData.email - User's email
 * @param {string} userData.password - User's password
 * @param {string} userData.phoneNumber - User's phone number
 * @returns {Promise<Object>} User data with token
 */
export const registerUser = async (userData) => {
  try {
    return await post(`${API_URL}/signup`, userData)
  } catch (error) {
    // Handle specific error types
    if (error.response?.status === 400) {
      // Handle validation errors
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        // Format validation errors
        const errorMessages = error.response.data.errors.map(err => err.message).join('. ')
        throw new Error(errorMessages)
      } else if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      } else {
        throw new Error("Please check your input and try again.")
      }
    } else if (error.response?.status === 409) {
      throw new Error("A user with this email already exists.")
    } else if (error.response?.status >= 500) {
      throw new Error("Server error. Please try again later.")
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message)
    }

    throw new Error("Registration failed. Please try again.")
  }
}

/**
 * Request password reset email
 * @param {Object} data - Request data
 * @param {string} data.email - User's email
 * @returns {Promise<Object>} Success message
 */
export const forgotPassword = async (data) => {
  try {
    return await post(`${API_URL}/forgot-password`, data)
  } catch (error) {
    // console.error("Forgot password error:", error)

    // Handle specific error types
    if (error.response?.status === 400) {
      throw new Error("Please enter a valid email address")
    } else if (error.response?.status >= 500) {
      throw new Error("Server error. Please try again later.")
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message)
    }

    throw new Error(
      "Error processing password reset request. Please try again later."
    )
  }
}

/**
 * Reset user password with token
 * @param {Object} data - Reset data
 * @param {string} data.token - Reset token
 * @param {string} data.password - New password
 * @returns {Promise<Object>} Success message
 */
export const resetPassword = async (data) => {
  try {
    return await post(`${API_URL}/reset-password`, data)
  } catch (error) {
    // console.error("Reset password error:", error)

    // Handle specific error types
    if (error.response?.status === 400) {
      throw new Error(
        "Invalid or expired reset token. Please request a new password reset."
      )
    } else if (error.response?.status >= 500) {
      throw new Error("Server error. Please try again later.")
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message)
    }

    throw new Error("Error resetting password. Please try again later.")
  }
}

/**
 * Logout user
 * @returns {Promise<Object>} Success message
 */
export const logoutUser = async () => {
  try {
    return await post(`${API_URL}/logout`, {})
  } catch (error) {
    error.message
    throw error
  }
}

/**
 * Get current user profile
 * @returns {Promise<Object>} User profile data
 */
export const getUserProfile = async () => {
  try {
    return await get(`${API_URL}/me`)
  } catch (error) {
    error.message
    throw error
  }
}

/**
 * Update user profile
 * @param {Object} profileData - Profile data to update
 * @param {string} profileData.name - User's name
 * @param {string} profileData.email - User's email
 * @param {string} profileData.phoneNumber - User's phone number
 * @param {string} profileData.bio - User's bio
 * @param {string} profileData.profileImage - User's profile image URL
 * @returns {Promise<Object>} Updated user data
 */
export const updateUserProfile = async (profileData) => {
  try {
    return await patch(`${API_URL}/me`, profileData)
  } catch (error) {
    error.message
    throw error
  }
}
