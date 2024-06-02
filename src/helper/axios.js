import axios from 'axios';
import store from '../store'; // Import your Redux store
import { authConstant } from '../action/constants';

const axiosInstance = axios.create({
  baseURL: 'https://backend-shoppingcart-rfe7.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to handle requests with form data
axiosInstance.interceptors.request.use((config) => {
  const { token } = store.getState().auth; // Get the token from your Redux store
  if (token) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${token}`,
    };
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log(error.response);
    const { status } = error.response;
    if (status === 500) {
      // Handle 500 error (server error)
      // localStorage.clear();
      // store.dispatch({ type: authConstant.LOGOUT_REQUEST });
    } else if (status === 401) {
      // Handle 401 error (unauthorized)
      const originalRequest = error.config;
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        store.dispatch({ type: authConstant.LOGOUT_REQUEST });
        // Redirect to the login page or show a message to the user
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
