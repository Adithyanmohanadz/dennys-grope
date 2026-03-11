import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const baseConfig = {
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
};

// ===========================
// ADMIN API INSTANCE
// ===========================
export const adminApi = axios.create(baseConfig);

adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const contentType = error.response?.headers["content-type"];
    if (contentType?.includes("text/html")) {
      return Promise.reject({
        response: { status: 500, data: { message: "Server error. Please try again." } },
      });
    }
    const requestUrl = error.config?.url || "";
    if (error.response?.status === 401 && !requestUrl.includes("v1/admin/login")) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  },
);

// ===========================
// WEBSITE USER API INSTANCE
// ===========================
export const websiteApi = axios.create(baseConfig);

// ── Auth endpoints that should never send a token ────────────────────────────
const WEBSITE_AUTH_URLS = [
  "v1/user/login",
  "v1/user/send-otp",
  "v1/user/verify-otp",
  "v1/user/register",
];

const isAuthUrl = (url = "") => WEBSITE_AUTH_URLS.some((u) => url.includes(u));

// ── Grace period: don't logout if token was saved within last 10 seconds ─────
const tokenSavedRecently = () => {
  const savedAt = localStorage.getItem("website_user_token_saved_at");
  if (!savedAt) return false;
  return Date.now() - parseInt(savedAt) < 10000; // 10 second grace
};

websiteApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("website_user_token");
    // Never send token on auth endpoints (avoids server rejecting with 401)
    if (token && !isAuthUrl(config.url)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

websiteApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const contentType = error.response?.headers["content-type"];
    if (contentType?.includes("text/html")) {
      return Promise.reject({
        response: { status: 500, data: { message: "Server error. Please try again." } },
      });
    }

    if (error.response?.status === 401) {
      const requestUrl = error.config?.url || "";

      // Never wipe token for auth endpoints or within grace period after login
      if (!isAuthUrl(requestUrl) && !tokenSavedRecently()) {
        localStorage.removeItem("website_user_token");
        localStorage.removeItem("website_user");
        localStorage.removeItem("website_user_token_saved_at");
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  },
);

// ===========================
// LEGACY
// ===========================
export const api = adminApi;
