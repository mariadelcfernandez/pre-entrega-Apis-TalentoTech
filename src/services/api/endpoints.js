// src/services/api/endpoints.js
export const API_ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    VERIFY_TOKEN: '/auth/verify',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password'
  },
  
  // Productos
  PRODUCTS: {
    GET_ALL: '/products',
    GET_ONE: (id) => `/products/${id}`,
    CREATE: '/products',
    UPDATE: (id) => `/products/${id}`,
    DELETE: (id) => `/products/${id}`,
    UPLOAD_IMAGE: '/products/upload',
    SEARCH: '/products/search'
  },
  
  // Categorías
  CATEGORIES: {
    GET_ALL: '/categories',
    GET_ONE: (id) => `/categories/${id}`,
    CREATE: '/categories',
    UPDATE: (id) => `/categories/${id}`,
    DELETE: (id) => `/categories/${id}`
  },
  
  // Usuarios
  USERS: {
    GET_ALL: '/users',
    GET_ONE: (id) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
    PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password'
  },
  
  // Pedidos
  ORDERS: {
    GET_ALL: '/orders',
    GET_ONE: (id) => `/orders/${id}`,
    CREATE: '/orders',
    UPDATE: (id) => `/orders/${id}`,
    DELETE: (id) => `/orders/${id}`,
    USER_ORDERS: (userId) => `/users/${userId}/orders`,
    UPDATE_STATUS: (id) => `/orders/${id}/status`
  },
  
  // Carrito
  CART: {
    GET: '/cart',
    ADD_ITEM: '/cart/items',
    UPDATE_ITEM: (itemId) => `/cart/items/${itemId}`,
    REMOVE_ITEM: (itemId) => `/cart/items/${itemId}`,
    CLEAR: '/cart/clear'
  }
};

export default API_ENDPOINTS;