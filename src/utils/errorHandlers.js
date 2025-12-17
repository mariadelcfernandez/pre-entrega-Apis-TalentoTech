// src/utils/errorHandlers.js
/**
 * Manejo centralizado de errores
 */

class AppError extends Error {
  constructor(message, code = 'INTERNAL_ERROR', status = 500, details = null) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.status = status;
    this.details = details;
    this.timestamp = new Date().toISOString();
    
    // Capturar stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

// Errores específicos de la aplicación
export const ERROR_CODES = {
  // Errores de autenticación (400-499)
  AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  AUTH_TOKEN_INVALID: 'AUTH_TOKEN_INVALID',
  AUTH_USER_NOT_FOUND: 'AUTH_USER_NOT_FOUND',
  AUTH_USER_DISABLED: 'AUTH_USER_DISABLED',
  AUTH_INSUFFICIENT_PERMISSIONS: 'AUTH_INSUFFICIENT_PERMISSIONS',
  
  // Errores de validación (400)
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  REQUIRED_FIELD: 'REQUIRED_FIELD',
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  INVALID_FORMAT: 'INVALID_FORMAT',
  UNIQUE_CONSTRAINT: 'UNIQUE_CONSTRAINT',
  
  // Errores de recursos (404)
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  ORDER_NOT_FOUND: 'ORDER_NOT_FOUND',
  
  // Errores de negocio (409)
  CONFLICT: 'CONFLICT',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
  INSUFFICIENT_BALANCE: 'INSUFFICIENT_BALANCE',
  
  // Errores del servidor (500+)
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED'
};

// Mapeo de códigos de error a mensajes amigables
export const ERROR_MESSAGES = {
  [ERROR_CODES.AUTH_INVALID_CREDENTIALS]: 'Email o contraseña incorrectos',
  [ERROR_CODES.AUTH_TOKEN_EXPIRED]: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente',
  [ERROR_CODES.AUTH_TOKEN_INVALID]: 'Token de autenticación inválido',
  [ERROR_CODES.AUTH_USER_NOT_FOUND]: 'Usuario no encontrado',
  [ERROR_CODES.AUTH_USER_DISABLED]: 'Tu cuenta ha sido desactivada',
  [ERROR_CODES.AUTH_INSUFFICIENT_PERMISSIONS]: 'No tienes permisos para realizar esta acción',
  
  [ERROR_CODES.VALIDATION_ERROR]: 'Error de validación. Verifica los datos ingresados',
  [ERROR_CODES.REQUIRED_FIELD]: 'Este campo es requerido',
  [ERROR_CODES.INVALID_EMAIL]: 'Email inválido',
  [ERROR_CODES.INVALID_PASSWORD]: 'Contraseña inválida',
  [ERROR_CODES.INVALID_FORMAT]: 'Formato inválido',
  [ERROR_CODES.UNIQUE_CONSTRAINT]: 'Este valor ya está en uso',
  
  [ERROR_CODES.RESOURCE_NOT_FOUND]: 'Recurso no encontrado',
  [ERROR_CODES.PRODUCT_NOT_FOUND]: 'Producto no encontrado',
  [ERROR_CODES.USER_NOT_FOUND]: 'Usuario no encontrado',
  [ERROR_CODES.ORDER_NOT_FOUND]: 'Pedido no encontrado',
  
  [ERROR_CODES.CONFLICT]: 'Conflicto de datos',
  [ERROR_CODES.OUT_OF_STOCK]: 'Producto agotado',
  [ERROR_CODES.INSUFFICIENT_BALANCE]: 'Saldo insuficiente',
  
  [ERROR_CODES.INTERNAL_ERROR]: 'Error interno del servidor',
  [ERROR_CODES.DATABASE_ERROR]: 'Error de base de datos',
  [ERROR_CODES.EXTERNAL_SERVICE_ERROR]: 'Error en servicio externo',
  [ERROR_CODES.RATE_LIMIT_EXCEEDED]: 'Demasiadas solicitudes. Por favor, intenta más tarde'
};

// Handler global de errores
export const errorHandler = {
  // Manejar error de API
  handleApiError: (error) => {
    console.error('[API Error]', error);
    
    // Si es un error de nuestra aplicación
    if (error instanceof AppError) {
      return {
        message: ERROR_MESSAGES[error.code] || error.message,
        code: error.code,
        status: error.status,
        details: error.details,
        timestamp: error.timestamp
      };
    }
    
    // Si es un error de axios/HTTP
    if (error.response) {
      const { status, data } = error.response;
      
      return {
        message: data?.message || `Error ${status}`,
        code: `HTTP_${status}`,
        status,
        details: data?.details || null,
        timestamp: new Date().toISOString()
      };
    }
    
    // Error de red
    if (error.request) {
      return {
        message: 'Error de conexión. Verifica tu internet.',
        code: 'NETWORK_ERROR',
        status: 0,
        details: null,
        timestamp: new Date().toISOString()
      };
    }
    
    // Error genérico
    return {
      message: error.message || 'Error desconocido',
      code: 'UNKNOWN_ERROR',
      status: 500,
      details: null,
      timestamp: new Date().toISOString()
    };
  },

  // Crear error de aplicación
  createAppError: (message, code = ERROR_CODES.INTERNAL_ERROR, status = 500, details = null) => {
    return new AppError(message, code, status, details);
  },

  // Validar y lanzar error
  validateAndThrow: (condition, message, code = ERROR_CODES.VALIDATION_ERROR, status = 400) => {
    if (!condition) {
      throw new AppError(message, code, status);
    }
  },

  // Manejar error en componente React
  handleComponentError: (error, errorInfo) => {
    console.error('[Component Error]', error, errorInfo);
    
    const errorData = errorHandler.handleApiError(error);
    
    // Aquí podrías enviar el error a un servicio de monitoreo
    if (process.env.NODE_ENV === 'production') {
      // sendToErrorMonitoring(errorData);
    }
    
    return errorData;
  }
};

// Hook para manejar errores en componentes
export const useErrorHandler = () => {
  const handleError = (error, context = '') => {
    const errorData = errorHandler.handleApiError(error);
    
    console.error(`[Error${context ? ` in ${context}` : ''}]`, errorData);
    
    // Mostrar notificación al usuario
    if (typeof window !== 'undefined' && window.toast) {
      window.toast.error(errorData.message);
    }
    
    return errorData;
  };

  const createError = (message, code, status, details) => {
    return errorHandler.createAppError(message, code, status, details);
  };

  return { handleError, createError };
};

export default errorHandler;