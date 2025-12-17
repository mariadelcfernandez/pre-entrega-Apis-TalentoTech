// src/contexts/NotificationContext.jsx
import { createContext, useState, useContext, useCallback } from 'react';
import { toast } from 'react-toastify';

const NotificationContext = createContext({});

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification debe usarse dentro de NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 50)); // Limitar a 50
    setUnreadCount(prev => prev + 1);
    
    // Mostrar toast
    if (notification.showToast !== false) {
      const toastType = notification.type || 'info';
      toast[toastType](notification.message, {
        position: 'top-right',
        autoClose: 3000
      });
    }
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
    setUnreadCount(0);
  }, []);

  const removeNotification = useCallback((id) => {
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, [notifications]);

  const clearAll = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  // Tipos de notificaciones comunes
  const notify = {
    success: (message, options = {}) => {
      addNotification({
        type: 'success',
        message,
        ...options
      });
    },
    
    error: (message, options = {}) => {
      addNotification({
        type: 'error',
        message,
        ...options
      });
    },
    
    warning: (message, options = {}) => {
      addNotification({
        type: 'warning',
        message,
        ...options
      });
    },
    
    info: (message, options = {}) => {
      addNotification({
        type: 'info',
        message,
        ...options
      });
    },
    
    // Notificaciones específicas del sistema
    productAdded: (productName) => {
      addNotification({
        type: 'success',
        message: `Producto "${productName}" agregado exitosamente`,
        action: 'product_created'
      });
    },
    
    orderPlaced: (orderId) => {
      addNotification({
        type: 'success',
        message: `Pedido #${orderId} realizado exitosamente`,
        action: 'order_created'
      });
    },
    
    lowStock: (productName, stock) => {
      addNotification({
        type: 'warning',
        message: `Stock bajo: "${productName}" (${stock} unidades)`,
        action: 'low_stock_alert'
      });
    }
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearAll,
      notify
    }}>
      {children}
    </NotificationContext.Provider>
  );
};