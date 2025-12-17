// src/utils/validators.js
/**
 * Utilidades para validación de formularios
 */

// Expresiones regulares comunes
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  PRICE: /^\d+(\.\d{1,2})?$/,
  ZIP_CODE: /^\d{4,5}(-\d{4})?$/,
  CREDIT_CARD: /^\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}$/
};

// Validaciones comunes
export const validate = {
  // Validar email
  email: (value) => {
    if (!value) return 'El email es requerido';
    if (!REGEX_PATTERNS.EMAIL.test(value)) return 'Email inválido';
    return null;
  },

  // Validar contraseña
  password: (value) => {
    if (!value) return 'La contraseña es requerida';
    if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    if (!REGEX_PATTERNS.PASSWORD.test(value)) {
      return 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial';
    }
    return null;
  },

  // Validar nombre
  name: (value) => {
    if (!value) return 'El nombre es requerido';
    if (value.length < 2) return 'El nombre debe tener al menos 2 caracteres';
    if (value.length > 50) return 'El nombre no puede exceder 50 caracteres';
    return null;
  },

  // Validar precio
  price: (value) => {
    if (!value && value !== 0) return 'El precio es requerido';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 'Debe ser un número válido';
    if (numValue < 0) return 'El precio no puede ser negativo';
    if (numValue > 999999.99) return 'El precio no puede exceder $999,999.99';
    if (!REGEX_PATTERNS.PRICE.test(value.toString())) return 'Formato de precio inválido (ej: 99.99)';
    return null;
  },

  // Validar stock
  stock: (value) => {
    if (!value && value !== 0) return 'El stock es requerido';
    const numValue = parseInt(value);
    if (isNaN(numValue)) return 'Debe ser un número válido';
    if (numValue < 0) return 'El stock no puede ser negativo';
    if (numValue > 99999) return 'El stock no puede exceder 99,999 unidades';
    return null;
  },

  // Validar teléfono
  phone: (value) => {
    if (!value) return 'El teléfono es requerido';
    if (!REGEX_PATTERNS.PHONE.test(value.replace(/\s/g, ''))) return 'Teléfono inválido';
    return null;
  },

  // Validar URL
  url: (value) => {
    if (!value) return null; // URL es opcional
    if (!REGEX_PATTERNS.URL.test(value)) return 'URL inválida';
    return null;
  },

  // Validar requerido
  required: (value, fieldName = 'Este campo') => {
    if (!value && value !== 0 && value !== false) return `${fieldName} es requerido`;
    if (typeof value === 'string' && value.trim() === '') return `${fieldName} es requerido`;
    return null;
  },

  // Validar longitud mínima
  minLength: (value, min, fieldName = 'Este campo') => {
    if (!value) return null;
    if (value.length < min) return `${fieldName} debe tener al menos ${min} caracteres`;
    return null;
  },

  // Validar longitud máxima
  maxLength: (value, max, fieldName = 'Este campo') => {
    if (!value) return null;
    if (value.length > max) return `${fieldName} no puede exceder ${max} caracteres`;
    return null;
  },

  // Validar número entre rango
  range: (value, min, max, fieldName = 'Este campo') => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 'Debe ser un número válido';
    if (numValue < min) return `${fieldName} debe ser mayor o igual a ${min}`;
    if (numValue > max) return `${fieldName} debe ser menor o igual a ${max}`;
    return null;
  }
};

// Esquemas de validación para diferentes formularios
export const VALIDATION_SCHEMAS = {
  LOGIN: {
    email: (value) => validate.email(value),
    password: (value) => validate.password(value)
  },

  REGISTER: {
    name: (value) => validate.name(value),
    email: (value) => validate.email(value),
    password: (value) => validate.password(value),
    confirmPassword: (value, allValues) => {
      if (value !== allValues.password) return 'Las contraseñas no coinciden';
      return null;
    }
  },

  PRODUCT: {
    name: (value) => {
      const required = validate.required(value, 'El nombre');
      if (required) return required;
      return validate.minLength(value, 3, 'El nombre');
    },
    description: (value) => {
      const required = validate.required(value, 'La descripción');
      if (required) return required;
      return validate.minLength(value, 10, 'La descripción');
    },
    price: (value) => validate.price(value),
    category: (value) => validate.required(value, 'La categoría'),
    stock: (value) => validate.stock(value),
    image: (value) => validate.url(value)
  },

  PROFILE: {
    name: (value) => validate.name(value),
    email: (value) => validate.email(value),
    phone: (value) => validate.phone(value)
  },

  ADDRESS: {
    street: (value) => validate.required(value, 'La calle'),
    city: (value) => validate.required(value, 'La ciudad'),
    state: (value) => validate.required(value, 'El estado/provincia'),
    zipCode: (value) => {
      if (!value) return 'El código postal es requerido';
      if (!REGEX_PATTERNS.ZIP_CODE.test(value)) return 'Código postal inválido';
      return null;
    },
    country: (value) => validate.required(value, 'El país')
  }
};

// Función para validar formulario completo
export const validateForm = (formData, schema) => {
  const errors = {};
  let isValid = true;

  Object.keys(schema).forEach(field => {
    const validator = schema[field];
    const value = formData[field];
    
    // Si el validador es una función
    if (typeof validator === 'function') {
      const error = validator(value, formData);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    } 
    // Si el validador es un array de funciones
    else if (Array.isArray(validator)) {
      for (const validateFn of validator) {
        const error = validateFn(value, formData);
        if (error) {
          errors[field] = error;
          isValid = false;
          break;
        }
      }
    }
  });

  return { isValid, errors };
};

// Sanitizar inputs para prevenir XSS
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  
  const reg = /[&<>"'/`=]/ig;
  return input.replace(reg, (match) => map[match]);
};

// Sanitizar objeto completo
export const sanitizeObject = (obj) => {
  const sanitized = {};
  
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'string') {
      sanitized[key] = sanitizeInput(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitized[key] = sanitizeObject(obj[key]);
    } else {
      sanitized[key] = obj[key];
    }
  });
  
  return sanitized;
};

export default {
  REGEX_PATTERNS,
  validate,
  VALIDATION_SCHEMAS,
  validateForm,
  sanitizeInput,
  sanitizeObject
};