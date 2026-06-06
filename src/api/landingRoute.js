import BASE_URL from "./baseUrl";

// Categories API
export const GET_CATEGORIES_API = `${BASE_URL}/categories`;

// Unified Auth Login (admin + dealer)
export const AUTH_LOGIN = `${BASE_URL}/auth/login`;

// Dealer API Routes
export const DEALERS_API = `${BASE_URL}/admin/dealers`;
export const GET_DEALERS_STATS_API = `${BASE_URL}/admin/dealers/stats`;
export const GET_DEALER_DETAIL_API = (id) => `${BASE_URL}/admin/dealers/${id}`;
export const BLOCK_DEALER_API = (id) => `${BASE_URL}/admin/dealers/${id}/block`;
export const UNBLOCK_DEALER_API = (id) => `${BASE_URL}/admin/dealers/${id}/unblock`;
export const DELETE_DEALER_API = (id) => `${BASE_URL}/admin/dealers/${id}`;

// Dealer Profile API Routes
export const GET_DEALER_PROFILE_API = `${BASE_URL}/dealer/profile`;
export const UPDATE_DEALER_PROFILE_API = `${BASE_URL}/dealer/profile`;
export const UPDATE_DEALER_PASSWORD_API = `${BASE_URL}/dealer/password`;
