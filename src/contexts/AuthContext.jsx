// src/contexts/AuthContext.jsx
import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { authService } from '../services/authService';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState([]);
  const { getItem, setItem, removeItem } = useLocalStorage();

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = getItem('user');
        const token = getItem('token');
        
        if (savedUser && token) {
          // Verificar token con el backend (opcional, dependiendo de la estrategia)
          // Por ahora, solo cargamos el usuario guardado
          setUser(JSON.parse(savedUser));
          
          // Cargar permisos basados en el rol
          const userData = JSON.parse(savedUser);
          loadPermissions(userData.role);
        }
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
        removeItem('user');
        removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const loadPermissions = (role) => {
    let perms = [];
    if (role === 'admin') {
      perms = ['admin', 'create', 'read', 'update', 'delete', 'manage_users'];
    } else {
      perms = ['read', 'purchase'];
    }
    setPermissions(perms);
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authService.login({ email, password });
      
      const { user: userData, token } = response;
      
      setUser(userData);
      setItem('user', JSON.stringify(userData));
      setItem('token', token);
      loadPermissions(userData.role);
      
      toast.success(`¡Bienvenido, ${userData.name}!`);
      return { success: true, user: userData };
    } catch (error) {
      toast.error(error.message || 'Error al iniciar sesión');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      
      const { user: newUser, token } = response;
      
      setUser(newUser);
      setItem('user', JSON.stringify(newUser));
      setItem('token', token);
      loadPermissions(newUser.role);
      
      toast.success('¡Registro exitoso!');
      return { success: true, user: newUser };
    } catch (error) {
      toast.error(error.message || 'Error al registrarse');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    setPermissions([]);
    removeItem('user');
    removeItem('token');
    toast.info('Sesión cerrada correctamente');
    window.location.href = '/';
  }, [removeItem]);

  const updateUser = useCallback((newData) => {
    setUser(prev => ({ ...prev, ...newData }));
    setItem('user', JSON.stringify({ ...user, ...newData }));
    toast.success('Perfil actualizado');
  }, [user, setItem]);

  const isAdmin = useCallback(() => {
    return user?.role === 'admin';
  }, [user]);

  const hasPermission = useCallback((permission) => {
    if (isAdmin()) return true;
    return permissions.includes(permission);
  }, [permissions, isAdmin]);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin,
    hasPermission,
    permissions,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};