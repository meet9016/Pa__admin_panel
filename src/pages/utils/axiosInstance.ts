import axios from 'axios'

// const baseURL = process.env.REACT_APP_API_URL;
const baseURL = `${import.meta.env.REACT_APP_API_URL || ""}/api/auth`
const apiAdminInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const api = apiAdminInstance;

apiAdminInstance.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('auth_token');
    // const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['ngrok-skip-browser-warning'] = 'true'
    return config;
  },
  error => Promise.reject(error)
);

apiAdminInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  error => {
    const { response } = error;
    console.log("throw", response);
  
    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);