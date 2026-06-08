import BASE_URL from "./baseUrl";

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


// Admin Dashboard
export const ADMIN_ACTIVITY_API = `${BASE_URL}/admin/activity`;
export const GET_ADMIN_ACTIVITY_API = (limit) =>
  limit ? `${BASE_URL}/admin/activity?limit=${limit}` : `${BASE_URL}/admin/activity`;


// Admin Categories
export const GET_CATEGORIES_API = `${BASE_URL}/categories`;
export const ADMIN_CATEGORIES_API = `${BASE_URL}/admin/categories`;
export const CREATE_CATEGORY_API = `${BASE_URL}/admin/categories`;
export const UPDATE_CATEGORY_API = (id) =>`${BASE_URL}/admin/categories/${id}`;
export const DELETE_CATEGORY_API = (id) => `${BASE_URL}/admin/categories/${id}`;
