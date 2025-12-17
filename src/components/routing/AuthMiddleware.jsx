// src/components/routing/AuthMiddleware.jsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

export const AuthMiddleware = ({ children, requireAuth = false, requireAdmin = false }) => {
  const { isAuthenticated, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    // Verificar token expirado
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    
    if (token && tokenExpiry) {
      const now = new Date().getTime();
      if (now > parseInt(tokenExpiry)) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        localStorage.removeItem('user');
        toast.warning('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
        navigate('/login', { replace: true });
        return;
      }
    }

    // Verificar rutas que requieren autenticación
    if (requireAuth && !isAuthenticated) {
      toast.error('Debes iniciar sesión para acceder a esta página');
      navigate('/login', { 
        state: { from: location.pathname },
        replace: true 
      });
      return;
    }

    // Verificar rutas que requieren admin
    if (requireAdmin && (!isAuthenticated || !isAdmin())) {
      toast.error('Acceso denegado. Se requieren permisos de administrador');
      navigate('/', { replace: true });
      return;
    }

    // Redirigir si ya está autenticado y trata de acceder a login/register
    if ((location.pathname === '/login' || location.pathname === '/register') && isAuthenticated) {
      navigate('/', { replace: true });
      return;
    }

  }, [loading, isAuthenticated, requireAuth, requireAdmin, navigate, location, isAdmin]);

  // Mostrar loading mientras se verifica
  if (loading && (requireAuth || requireAdmin)) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p>Verificando permisos...</p>
        </div>
      </div>
    );
  }

  return children;
};

export default AuthMiddleware;