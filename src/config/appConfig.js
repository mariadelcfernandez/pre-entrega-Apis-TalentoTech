// src/config/appConfig.js
/**
 * Configuración centralizada de la aplicación
 */

export const APP_CONFIG = {
  // Información de la aplicación
  APP_NAME: 'Tecnoya',
  APP_VERSION: '1.0.0',
  APP_DESCRIPTION: 'Tienda online completa con carrito, autenticación y panel de administración',
  
  // Configuración de API
  API: {
    BASE_URL: import.meta.env.VITE_API_URL || 'https://661c2b1de7b95ad7fa69d7d5.mockapi.io/api/v1',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000
  },
  
  // Configuración de autenticación
  AUTH: {
    TOKEN_KEY: 'token',
    USER_KEY: 'user',
    TOKEN_EXPIRY_KEY: 'tokenExpiry',
    TOKEN_EXPIRY_HOURS: 24,
    REFRESH_TOKEN_KEY: 'refreshToken'
  },
  
  // Configuración del carrito
  CART: {
    CART_KEY: 'cart',
    MAX_QUANTITY: 99,
    MIN_QUANTITY: 1
  },
  
  // Configuración de paginación
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 12,
    PAGE_SIZES: [12, 24, 48, 96],
    MAX_PAGES_TO_SHOW: 5
  },
  
  // Configuración de productos
  PRODUCTS: {
    MIN_PRICE: 0,
    MAX_PRICE: 999999.99,
    MIN_STOCK: 0,
    MAX_STOCK: 99999,
    MAX_IMAGES: 5
  },
  
  // Configuración de búsqueda
  SEARCH: {
    DEBOUNCE_DELAY: 300,
    MIN_SEARCH_LENGTH: 2,
    MAX_SEARCH_SUGGESTIONS: 10
  },
  
  // Configuración de validación
  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
    PASSWORD_MIN_LENGTH: 6,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50,
    DESCRIPTION_MIN_LENGTH: 10,
    DESCRIPTION_MAX_LENGTH: 2000
  },
  
  // Configuración de monitoreo
  MONITORING: {
    ENABLED: import.meta.env.VITE_ENABLE_MONITORING === 'true',
    SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
    LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL || 'error'
  },
  
  // Feature flags
  FEATURES: {
    ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    ENABLE_PAYMENTS: import.meta.env.VITE_ENABLE_PAYMENTS === 'true',
    ENABLE_REVIEWS: import.meta.env.VITE_ENABLE_REVIEWS === 'true',
    ENABLE_WISHLIST: import.meta.env.VITE_ENABLE_WISHLIST === 'true'
  },
  
  // Configuración de UI
  UI: {
    THEME: {
      PRIMARY: '#667eea',
      SECONDARY: '#764ba2',
      SUCCESS: '#28a745',
      DANGER: '#dc3545',
      WARNING: '#ffc107',
      INFO: '#17a2b8',
      LIGHT: '#f8f9fa',
      DARK: '#343a40'
    },
    BREAKPOINTS: {
      XS: 0,
      SM: 576,
      MD: 768,
      LG: 992,
      XL: 1200,
      XXL: 1400
    }
  }
};

// Funciones helper de configuración
export const getConfig = (key, defaultValue = null) => {
  const keys = key.split('.');
  let value = APP_CONFIG;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return defaultValue;
    }
  }
  
  return value;
};

export const isFeatureEnabled = (feature) => {
  return APP_CONFIG.FEATURES[feature] === true;
};

export const getApiUrl = (endpoint = '') => {
  const baseUrl = APP_CONFIG.API.BASE_URL;
  return endpoint ? `${baseUrl}${endpoint}` : baseUrl;
};

export default APP_CONFIG;