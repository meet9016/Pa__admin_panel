import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Env se URL le raha hai
});

// ✅ Request Interceptor (auth token add karne ke liye)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token"); // ya sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor (error handle karne ke liye)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default api;
