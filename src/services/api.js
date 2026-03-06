import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Base configuration shared by both instances
const baseConfig = {
    baseURL: API_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
    }
};

// ===========================
// ADMIN API INSTANCE
// ===========================
export const adminApi = axios.create(baseConfig);

adminApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

adminApi.interceptors.response.use(
    (response) => response,
    (error) => {
        const contentType = error.response?.headers['content-type'];
        if (contentType && contentType.includes('text/html')) {
            return Promise.reject({
                response: {
                    status: 500,
                    data: { message: 'Server error. Please try again.' }
                }
            });
        }

        const requestUrl = error.config?.url || "";

        // ⛔ DO NOT redirect for admin login API
        if (error.response?.status === 401) {
            if (!requestUrl.includes("v1/admin/login")) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('token');
                window.location.href = '/admin/login'; // Only redirect for other 401s
            }
        }

        return Promise.reject(error);
    }
);

// ===========================
// WEBSITE USER API INSTANCE
// ===========================
export const websiteApi = axios.create(baseConfig);

websiteApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('website_user_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

websiteApi.interceptors.response.use(
    (response) => response,
    (error) => {
        const contentType = error.response?.headers['content-type'];
        if (contentType && contentType.includes('text/html')) {
            return Promise.reject({
                response: {
                    status: 500,
                    data: { message: 'Server error. Please try again.' }
                }
            });
        }

        if (error.response?.status === 401) {
            const requestUrl = error.config?.url || "";

            // Skip redirect for login endpoint
            if (!requestUrl.includes("v1/user/login")) {
                localStorage.removeItem("website_user_token");
                localStorage.removeItem("website_user");
                window.location.href = "/"; // Safe for other APIs
            }
        }

        return Promise.reject(error);
    }
);

// ===========================
// LEGACY: Keep 'api' for backward compatibility
// Defaults to admin API (or choose based on your main usage)
// ===========================
export const api = adminApi;