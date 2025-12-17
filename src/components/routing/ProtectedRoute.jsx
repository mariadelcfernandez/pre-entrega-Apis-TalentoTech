// src/components/routing/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';

/**
 * Layout para rutas públicas
 */
export const PublicLayout = ({ children }) => (
  <div className="public-layout">
    {children}
  </div>
);

/**
 * Layout para rutas privadas
 */
export const PrivateLayout = ({ children }) => {
  const { user } = useAuth();
  
  return (
    <div className="private-layout">
      {user && (
        <div className="alert alert-info mb-0 py-2 text-center" role="alert">
          <small>
            <i className="fas fa-user-circle me-1"></i>
            Conectado como: <strong>{user.name}</strong>
            {user.role === 'admin' && ' (Administrador)'}
          </small>
        </div>
      )}
      <main className="py-4">
        {children}
      </main>
    </div>
  );
};

/**
 * Layout para rutas de administrador
 */
export const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  
  return (
    <div className="admin-layout d-flex">
      {/* Sidebar */}
      <div className="admin-sidebar bg-dark text-white" style={{ width: '250px', minHeight: '100vh' }}>
        <div className="p-3">
          <h4 className="text-center mb-4">
            <i className="fas fa-crown me-2"></i>
            Admin Panel
          </h4>
          <div className="mb-4 text-center">
            <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" 
                 style={{ width: '60px', height: '60px' }}>
              <i className="fas fa-user" style={{ fontSize: '1.5rem' }}></i>
            </div>
            <p className="mt-2 mb-0"><strong>{user?.name}</strong></p>
            <small className="text-light">Administrador</small>
          </div>
          
          <nav className="nav flex-column">
            <a href="/admin/dashboard" className="nav-link text-white py-2">
              <i className="fas fa-tachometer-alt me-2"></i> Dashboard
            </a>
            <a href="/admin/products" className="nav-link text-white py-2">
              <i className="fas fa-box me-2"></i> Productos
            </a>
            <a href="/admin/users" className="nav-link text-white py-2">
              <i className="fas fa-users me-2"></i> Usuarios
            </a>
            <a href="/admin/orders" className="nav-link text-white py-2">
              <i className="fas fa-shopping-cart me-2"></i> Pedidos
            </a>
            <a href="/admin/settings" className="nav-link text-white py-2">
              <i className="fas fa-cog me-2"></i> Configuración
            </a>
            <hr className="text-white-50" />
            <button 
              onClick={logout}
              className="nav-link text-white py-2 text-start bg-transparent border-0"
            >
              <i className="fas fa-sign-out-alt me-2"></i> Cerrar Sesión
            </button>
          </nav>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="admin-content flex-grow-1 bg-light">
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Ruta pública - solo para usuarios NO autenticados
 */
export const PublicRoute = ({ children, redirectTo = '/' }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <PublicLayout>{children}</PublicLayout>;
};

/**
 * Ruta protegida - solo para usuarios autenticados
 */
export const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!isAuthenticated) {
    toast.error('Debes iniciar sesión para acceder a esta página');
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  return <PrivateLayout>{children}</PrivateLayout>;
};

/**
 * Ruta de administrador - solo para usuarios con rol admin
 */
export const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!isAuthenticated) {
    toast.error('Debes iniciar sesión para acceder al panel de administración');
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!isAdmin()) {
    toast.error('No tienes permisos de administrador para acceder a esta sección');
    return <Navigate to="/" replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

/**
 * Middleware de autenticación para componentes específicos
 */
export const AuthMiddleware = ({ children, requireAuth = false, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !isAuthenticated) {
        toast.error('Acceso no autorizado');
        window.location.href = '/login';
        return;
      }

      if (requireAdmin && !isAdmin()) {
        toast.error('Permisos insuficientes');
        window.location.href = '/';
        return;
      }

      setVerified(true);
    }
  }, [loading, isAuthenticated, requireAuth, requireAdmin, isAdmin]);

  if (loading || (requireAuth && !verified)) {
    return <LoadingSpinner />;
  }

  return children;
};

/**
 * Componente para verificar permisos específicos
 */
export const PermissionGuard = ({ children, permissions, fallback = null }) => {
  const { user, isAdmin } = useAuth();

  const hasPermission = () => {
    if (isAdmin()) return true;
    
    if (!user || !user.permissions) return false;
    
    if (typeof permissions === 'string') {
      return user.permissions.includes(permissions);
    }
    
    if (Array.isArray(permissions)) {
      return permissions.every(permission => user.permissions.includes(permission));
    }
    
    return false;
  };

  return hasPermission() ? children : fallback;
};

// Prop Types
PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired
};

PermissionGuard.propTypes = {
  children: PropTypes.node.isRequired,
  permissions: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  fallback: PropTypes.node
};