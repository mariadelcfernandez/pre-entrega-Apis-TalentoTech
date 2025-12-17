// src/middleware/apiMiddleware.js
import axios from 'axios';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://661c2b1de7b95ad7fa69d7d5.mockapi.io/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request Interceptor - Agregar token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const token = user?.token;
    
    if (token && !config.headers['skip-auth']) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Agregar timestamp para evitar cache
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
    }
    
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response Interceptor - Manejar respuestas y errores
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response.data;
  },
  (error) => {
    const { response } = error;
    const originalRequest = error.config;
    
    // Si es error 401 (No autorizado) y no hemos intentado refrescar el token
    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Intentar refrescar el token
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (refreshToken) {
        return api.post('/auth/refresh', { refreshToken })
          .then(({ token, refreshToken: newRefreshToken }) => {
            // Actualizar tokens
            const user = JSON.parse(localStorage.getItem('user'));
            user.token = token;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('refreshToken', newRefreshToken);
            
            // Reintentar la petición original
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((refreshError) => {
            // Si el refresh falla, desloguear al usuario
            localStorage.removeItem('user');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
            return Promise.reject(refreshError);
          });
      }
    }
    
    // Manejar otros errores
    const errorMessage = response?.data?.message || 
                        response?.data?.error || 
                        error.message || 
                        'Error en la conexión';
    
    console.error('[API Response Error]', {
      status: response?.status,
      url: originalRequest?.url,
      message: errorMessage
    });
    
    // Mostrar toast de error (excepto para errores 401 que ya manejamos)
    if (response?.status !== 401) {
      import('react-toastify').then(({ toast }) => {
        toast.error(errorMessage);
      });
    }
    
    return Promise.reject(error);
  }
);

// Métodos helpers
export const apiMiddleware = {
  get: (url, config = {}) => api.get(url, config),
  post: (url, data, config = {}) => api.post(url, data, config),
  put: (url, data, config = {}) => api.put(url, data, config),
  patch: (url, data, config = {}) => api.patch(url, data, config),
  delete: (url, config = {}) => api.delete(url, config),
  
  // Método para subir archivos
  upload: (url, formData, config = {}) => {
    return api.post(url, formData, {
      ...config,
      headers: {
        ...config.headers,
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  // Método para peticiones sin autenticación
  public: {
    get: (url, config = {}) => api.get(url, { ...config, headers: { ...config.headers, 'skip-auth': true } }),
    post: (url, data, config = {}) => api.post(url, data, { ...config, headers: { ...config.headers, 'skip-auth': true } })
  }
};

export default api;