// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import styled from 'styled-components';
import {
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaSearch,
  FaBell,
  FaCog
} from 'react-icons/fa';

const NavbarContainer = styled.nav`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: white;
    opacity: 0.9;
  }
  
  span {
    color: #ffd700;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 992px) {
    position: fixed;
    top: 0;
    right: ${props => props.open ? '0' : '-100%'};
    width: 300px;
    height: 100vh;
    background: white;
    flex-direction: column;
    align-items: stretch;
    padding: 2rem;
    transition: right 0.3s ease;
    box-shadow: -5px 0 20px rgba(0,0,0,0.1);
  }
`;

const NavLinkStyled = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.2);
    font-weight: 600;
  }
  
  @media (max-width: 992px) {
    color: #333;
    
    &:hover {
      background: #f8f9fa;
    }
    
    &.active {
      background: #667eea;
      color: white;
    }
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 992px) {
    display: block;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff4757;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartButton = styled.button`
  background: none;
  border: none;
  color: white;
  position: relative;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  
  &:hover {
    opacity: 0.8;
  }
`;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  background: none;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  min-width: 200px;
  z-index: 1000;
  overflow: hidden;
  display: ${props => props.open ? 'block' : 'none'};
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #333;
  text-decoration: none;
  transition: background 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
    color: #667eea;
  }
  
  &.danger {
    color: #dc3545;
    
    &:hover {
      background: #f8d7da;
    }
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: #28a745;
  color: white;
  font-size: 0.6rem;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  // Simular notificaciones
  useEffect(() => {
    if (isAuthenticated) {
      const mockNotifications = [
        { id: 1, message: '¡Oferta especial! 20% de descuento', read: false },
        { id: 2, message: 'Tu pedido ha sido enviado', read: false }
      ];
      setNotifications(mockNotifications.filter(n => !n.read));
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isUserMenuOpen) setIsUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const unreadNotifications = notifications.length;

  return (
    <NavbarContainer>
      <div className="container">
        <NavContent>
          {/* Logo */}
          <Logo to="/">
            <FaShoppingCart />
            <span>Shop</span>Online
          </Logo>

          {/* Menu principal (desktop) */}
          <NavMenu open={isMenuOpen}>
            <MobileToggle onClick={toggleMenu}>
              <FaTimes />
            </MobileToggle>
            
            <NavLinkStyled to="/" onClick={() => setIsMenuOpen(false)}>
              Inicio
            </NavLinkStyled>
            
            <NavLinkStyled to="/productos" onClick={() => setIsMenuOpen(false)}>
              Productos
            </NavLinkStyled>
            
            <NavLinkStyled to="/nosotros" onClick={() => setIsMenuOpen(false)}>
              Nosotros
            </NavLinkStyled>
            
            <NavLinkStyled to="/contacto" onClick={() => setIsMenuOpen(false)}>
              Contacto
            </NavLinkStyled>
            
            {isAuthenticated && isAdmin() && (
              <NavLinkStyled to="/admin" onClick={() => setIsMenuOpen(false)}>
                <FaCog /> Admin
              </NavLinkStyled>
            )}
          </NavMenu>

          {/* Acciones del usuario */}
          <div className="d-flex align-items-center gap-3">
            {/* Carrito */}
            <CartButton onClick={() => navigate('/carrito')}>
              <FaShoppingCart />
              {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
            </CartButton>
            
            {/* Notificaciones */}
            {isAuthenticated && (
              <button className="btn btn-link text-white position-relative">
                <FaBell />
                {unreadNotifications > 0 && (
                  <NotificationBadge>{unreadNotifications}</NotificationBadge>
                )}
              </button>
            )}
            
            {/* Usuario */}
            {isAuthenticated ? (
              <UserMenu>
                <UserButton onClick={toggleUserMenu}>
                  <FaUser />
                  <span className="d-none d-md-inline">{user?.name}</span>
                </UserButton>
                
                <Dropdown open={isUserMenuOpen}>
                  <div className="p-3 border-bottom">
                    <div className="d-flex align-items-center gap-2">
                      <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" 
                           style={{ width: '40px', height: '40px' }}>
                        <FaUser color="white" />
                      </div>
                      <div>
                        <strong>{user?.name}</strong>
                        <div className="text-muted small">{user?.email}</div>
                      </div>
                    </div>
                  </div>
                  
                  <DropdownItem to="/perfil" onClick={() => setIsUserMenuOpen(false)}>
                    <FaUser /> Mi Perfil
                  </DropdownItem>
                  
                  <DropdownItem to="/pedidos" onClick={() => setIsUserMenuOpen(false)}>
                    <FaShoppingCart /> Mis Pedidos
                  </DropdownItem>
                  
                  {isAdmin() && (
                    <DropdownItem to="/admin" onClick={() => setIsUserMenuOpen(false)}>
                      <FaCog /> Panel Admin
                    </DropdownItem>
                  )}
                  
                  <hr className="my-1" />
                  
                  <DropdownItem 
                    to="#" 
                    className="danger"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt /> Cerrar Sesión
                  </DropdownItem>
                </Dropdown>
              </UserMenu>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-outline-light">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="btn btn-light">
                  Registrarse
                </Link>
              </div>
            )}
            
            {/* Toggle móvil */}
            <MobileToggle onClick={toggleMenu}>
              <FaBars />
            </MobileToggle>
          </div>
        </NavContent>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;