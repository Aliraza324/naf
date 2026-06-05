import axios from "axios";
import toast from "../utils/toast";
import BASE_URL from "./baseUrl";

// Axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000, // 30 seconds timeout
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
    },
});

// 🔹 Request interceptor (logging + token debug)
axiosInstance.interceptors.request.use(
    (config) => {

        return config;
    },
    (error) => {
        console.error("❌ Request interceptor error:", error);
        return Promise.reject(error);
    }
);

// 🔹 Response interceptor (401 global handling)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Get user info and role before clearing
            const userStr = sessionStorage.getItem("user") || localStorage.getItem("user");
            const user = userStr ? JSON.parse(userStr) : null;
            const role = user?.role?.toLowerCase();

            // Clear stored auth
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");

            const loginPages = ['/login', '/dealer-login', '/register', '/forgot-password'];
            const isOnLoginPage = loginPages.some(p => window.location.pathname === p || window.location.pathname.startsWith(p));
            if (!isOnLoginPage) {
                sessionStorage.setItem("lastVisitedRoute", window.location.pathname);

                toast.error("Your session has expired. Please login again.", 2000);

                // Role-based redirection
                let redirectPath = "/login";
                if (role === 'admin' || role === 'super_admin' || role === 'superadmin') {
                    redirectPath = "/login";
                } else if (role === 'dealer') {
                    redirectPath = "/dealer-login";
                }

                setTimeout(() => {
                    window.location.href = redirectPath;
                }, 2000);
            }
        }
        return Promise.reject(error);
    }
);

// 🔹 Core service
export const apiService = async (
    url,
    method,
    body = null,
    token = null,
    isMultipart = false
) => {
    let attempt = 0;
    const maxRetries = 1;

    // Identify public routes to avoid sending tokens
    const publicRoutes = ['/login', '/signup', '/forgot-password', '/verify-email', '/resend-email-otp', '/auth/user/login', '/auth/user/signup'];
    const isContactPost = (url.includes('/contact') && method?.toUpperCase() === 'POST');
    const isNewsletterPost = (url.includes('/newsletter/subscribe') && method?.toUpperCase() === 'POST');
    const isPublicRoute = publicRoutes.some(route => url.includes(route)) || isContactPost || isNewsletterPost;

    // Check both 'token' and 'authToken' in both storages for maximum compatibility
    const authToken = !isPublicRoute
        ? (token ||
            sessionStorage.getItem("token") ||
            localStorage.getItem("token") ||
            sessionStorage.getItem("authToken") ||
            localStorage.getItem("authToken"))
        : null;

    while (attempt <= maxRetries) {
        try {
            const config = {
                method,
                url,
                headers: {
                    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
                },
            };

            // Multipart ko axios khud handle karega
            if (isMultipart) {
                // no manual Content-Type
            } else if (body && !(body instanceof FormData)) {
                config.headers["Content-Type"] = "application/json";
            }

            if (body) {
                config.data = body;
            }

            const response = await axiosInstance(config);
            return response.data;
        } catch (error) {
            if (attempt < maxRetries) {
                attempt++;
                continue;
            } else {
                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) {
                    throw error;
                }

                handleApiError(error);
                throw error;
            }
        }
    }
};

// 🔹 Error helper
const handleApiError = (error) => {
    if (error.response) {
        let errorMessage =
            error.response.data?.Message ||
            error.response.data?.message ||
            error.response.data?.detail ||
            error.response.statusText ||
            "Server error occurred";

        if (typeof errorMessage === 'object' && errorMessage !== null) {
            // Try to extract the first string value (useful for Laravel validation objects)
            const values = Object.values(errorMessage);
            if (values.length > 0 && Array.isArray(values[0]) && typeof values[0][0] === 'string') {
                errorMessage = values[0][0];
            } else if (values.length > 0 && typeof values[0] === 'string') {
                errorMessage = values[0];
            } else {
                errorMessage = JSON.stringify(errorMessage);
            }
        }

        if (error.response.status !== 401) {
            toast.error(errorMessage, 2000);
        }

        const apiError = new Error(errorMessage);
        apiError.response = error.response;
        throw apiError;
    } else if (error.request) {
        const errorMessage = "No response received from the server";
        toast.warning(errorMessage, 1500);
        const apiError = new Error(errorMessage);
        apiError.request = error.request;
        throw apiError;
    } else {
        const errorMessage = error.message || "Something went wrong";
        toast.error(errorMessage, 1500);
        throw new Error(errorMessage);
    }
};

//
// 🔹 Standard CRUD helpers
//

export const get = (url, options = {}) => {
    const token =
        typeof options === "string"
            ? options
            : options.headers?.Authorization?.replace("Bearer ", "") ||
            sessionStorage.getItem("token") ||
            localStorage.getItem("token") ||
            sessionStorage.getItem("authToken") ||
            localStorage.getItem("authToken");
    return apiService(url, "GET", null, token);
};

export const post = (url, body, options = {}) => {
    const token =
        typeof options === "string"
            ? options
            : options.headers?.Authorization?.replace("Bearer ", "") ||
            sessionStorage.getItem("token") ||
            localStorage.getItem("token") ||
            sessionStorage.getItem("authToken") ||
            localStorage.getItem("authToken");

    const isMultipart = options.isMultipart || (body instanceof FormData);

    return apiService(url, "POST", body, token, isMultipart || body instanceof FormData);
};

export const put = (url, body, options = {}) => {
    const token =
        typeof options === "string"
            ? options
            : options.headers?.Authorization?.replace("Bearer ", "") ||
            sessionStorage.getItem("token") ||
            localStorage.getItem("token") ||
            sessionStorage.getItem("authToken") ||
            localStorage.getItem("authToken");

    const isMultipart = options.isMultipart || (body instanceof FormData);

    return apiService(url, "PUT", body, token, isMultipart || (body instanceof FormData));
};

export const patch = (url, body, options = {}) => {
    const token =
        typeof options === "string"
            ? options
            : options.headers?.Authorization?.replace("Bearer ", "") ||
            sessionStorage.getItem("token") ||
            localStorage.getItem("token") ||
            sessionStorage.getItem("authToken") ||
            localStorage.getItem("authToken");

    const isMultipart = options.isMultipart || (body instanceof FormData);

    return apiService(url, "PATCH", body, token, isMultipart || (body instanceof FormData));
};

export const del = (url, options = {}) => {
    const token =
        typeof options === "string"
            ? options
            : options.headers?.Authorization?.replace("Bearer ", "") ||
            sessionStorage.getItem("token") ||
            localStorage.getItem("token") ||
            sessionStorage.getItem("authToken") ||
            localStorage.getItem("authToken");

    return apiService(url, "DELETE", null, token);
};

// delete alias
export const deleteRequest = del;

//
// 🔹 Multipart helpers
//

export const uploadFile = (url, _formData, token) => {
    if (!(_formData instanceof FormData)) {
        throw new Error("uploadFile requires FormData object");
    }
    return apiService(url, "POST", _formData, token, true);
};

export const uploadFiles = (url, _formData, token) => {
    if (!(_formData instanceof FormData)) {
        throw new Error("uploadFiles requires FormData object");
    }
    return apiService(url, "POST", _formData, token, true);
};

export const createWithMultipart = (url, _formData, token) => {
    if (!(_formData instanceof FormData)) {
        throw new Error("createWithMultipart requires FormData object");
    }
    return apiService(url, "POST", _formData, token, true);
};

export const updateWithMultipart = (url, _formData, token) => {
    if (!(_formData instanceof FormData)) {
        throw new Error("updateWithMultipart requires FormData object");
    }
    return apiService(url, "PUT", _formData, token, true);
};

//
// 🔹 Utility helpers
//

export const createFormData = (data) => {
    const _formData = new FormData();

    Object.keys(data).forEach((key) => {
        const value = data[key];
        if (value !== null && value !== undefined) {
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    if (item instanceof File) {
                        _formData.append(key, item);
                    } else {
                        _formData.append(`${key}[${index}]`, item);
                    }
                });
            } else if (value instanceof File) {
                _formData.append(key, value);
            } else {
                _formData.append(key, value);
            }
        }
    });

    return _formData;
};

export const logFormData = (_formData) => {
    // optional: log formData in dev
};

export const apiConfig = {
    defaultTimeout: 30000,
    uploadTimeout: 120000,
    retryAttempts: 1,
    headers: {
        json: {
            "Content-Type": "application/json",
        },
        multipart: {},
    },
};

export const hasValidToken = () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
        console.warn("⚠️ No token found in sessionStorage");
        return false;
    }
    return true;
};

export const getToken = () => {
    return sessionStorage.getItem("token");
};

export const clearAuth = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
};

// 🔚 default export
export default {
    get,
    post,
    put,
    patch,
    del,
    deleteRequest,
    uploadFile,
    uploadFiles,
    createWithMultipart,
    updateWithMultipart,
    createFormData,
    logFormData,
    apiService,
    apiConfig,
    hasValidToken,
    getToken,
    clearAuth,
};
