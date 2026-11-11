import axios from 'axios';
import { safeJsonParse } from '../utils/jsonUtils';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 60000,
  withCredentials: true, // Enables browser to automatically send and store HTTP-only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token fallback
api.interceptors.request.use(
  (config) => {
    const rawUser = localStorage.getItem('user');
    const parsedUser = safeJsonParse(rawUser, null);
    if (parsedUser && parsedUser.token) {
      config.headers.Authorization = `Bearer ${parsedUser.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for centralized session expiration handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user');
      // Notify application of session expiration
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('speshway:session-expired', {
            detail: error.response.data || { sessionExpired: true },
          })
        );
      }
    }
    return Promise.reject(error);
  }
);

export default api;
