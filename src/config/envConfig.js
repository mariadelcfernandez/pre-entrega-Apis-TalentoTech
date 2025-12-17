// src/config/envConfig.js
/**
 * Configuración de variables de entorno
 */

// Validar variables de entorno requeridas
const validateEnv = () => {
  const requiredEnvVars = [];
  
  if (process.env.NODE_ENV === 'production') {
    requiredEnvVars.push(
      'VITE_API_URL',
      'VITE_APP_NAME'
    );
  }
  
  const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Variables de entorno faltantes:', missingVars);
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Variables de entorno requeridas faltantes: ${missingVars.join(', ')}`);
    }
  }
};

// Obtener variable de entorno con valor por defecto
export const getEnv = (key, defaultValue = '') => {
  return import.meta.env[key] || defaultValue;
};

// Determinar el entorno actual
export const getEnvironment = () => {
  return import.meta.env.MODE || 'development';
};

// Verificar si estamos en desarrollo
export const isDevelopment = () => {
  return getEnvironment() === 'development';
};

// Verificar si estamos en producción
export const isProduction = () => {
  return getEnvironment() === 'production';
};

// Verificar si estamos en testing
export const isTesting = () => {
  return getEnvironment() === 'test';
};

// Configuración específica por entorno
export const ENV_CONFIG = {
  // Desarrollo
  development: {
    API_URL: getEnv('VITE_API_URL', 'https://661c2b1de7b95ad7fa69d7d5.mockapi.io/api/v1'),
    DEBUG: true,
    LOG_LEVEL: 'debug',
    ENABLE_MOCKS: true
  },
  /** */
  // Producción
  production: {
    API_URL: getEnv('VITE_API_URL', 'https://api.tudominio.com'),
    DEBUG: false,
    LOG_LEVEL: 'error',
    ENABLE_MOCKS: false
  },
  
  // Testing
  test: {
    API_URL: getEnv('VITE_API_URL', 'http://localhost:3000/api'),
    DEBUG: true,
    LOG_LEVEL: 'silent',
    ENABLE_MOCKS: true
  }
};

// Obtener configuración para el entorno actual
export const getCurrentEnvConfig = () => {
  const env = getEnvironment();
  return ENV_CONFIG[env] || ENV_CONFIG.development;
};

// Inicializar validación
if (typeof window !== 'undefined') {
  validateEnv();
}

export default {
  getEnv,
  getEnvironment,
  isDevelopment,
  isProduction,
  isTesting,
  getCurrentEnvConfig,
  validateEnv
};