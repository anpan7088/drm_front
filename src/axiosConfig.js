// src/axiosConfig.js
import axios from 'axios';
import { removeCredentials } from './context/localStorage'

// Create an instance of Axios with default configurations
const axiosInstance = axios.create({
    baseURL: 'https://dorms.sman.cloud/api', // Your API base URL (for production)
    // baseURL: 'http://localhost:8086',    // API base URL for local development
    headers: {
        'Content-Type': 'application/json',
        // Add other default headers if needed
    },
});


// this interceptor will automatically attach the token to the request headers
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);

// this interceptor will automatically logout the user if a 401 or 403 response is received
axiosInstance.interceptors.response.use(
    (response) => {
        // Modify response data if needed
        return response;
    },
    (error) => {
        // alert('Something went wrong. Please try again later.');
        console.error(error.response.status);
        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            // alert('Your session has expired. Please login again.');
            removeCredentials();
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
