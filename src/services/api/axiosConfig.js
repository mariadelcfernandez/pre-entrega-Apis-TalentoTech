// src/services/api/axiosConfig.js
import axios from 'axios';
import { toast } from 'react-toastify';

// Crear instancia de axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://661c2b1de7b95ad7fa69d7d5.mockapi.io/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor para agregar token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Agregar timestamp para evitar cache
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
    }
    
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor para manejar errores
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response) {
      // Manejar diferentes códigos de error
      switch (response.status) {
        case 400:
          toast.error('Solicitud incorrecta. Verifica los datos enviados.');
          break;
        case 401:
          toast.error('Sesión expirada. Por favor, inicia sesión nuevamente.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          toast.error('No tienes permisos para realizar esta acción.');
          break;
        case 404:
          toast.error('Recurso no encontrado.');
          break;
        case 500:
          toast.error('Error interno del servidor. Por favor, intenta más tarde.');
          break;
        default:
          toast.error(`Error ${response.status}: ${response.data?.message || 'Error en la petición'}`);
      }
    } else if (error.request) {
      // Error de red
      toast.error('Error de conexión. Verifica tu conexión a internet.');
    } else {
      // Error en la configuración
      toast.error('Error al realizar la petición.');
    }
    
    return Promise.reject(error);
  }
);

export default api;