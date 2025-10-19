// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const { user, logout } = useAuth();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" onClick={() => setIsOpen(false)}>
          🛍️ Tecnoya tu tienda  Informática
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/" 
                onClick={() => setIsOpen(false)}
              >
                <i className="fas fa-home me-1"></i>
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/products" 
                onClick={() => setIsOpen(false)}
              >
                <i className="fas fa-laptop me-1"></i>
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/services" 
                onClick={() => setIsOpen(false)}
              >
                <i className="fas fa-tools me-1"></i>
                Servicios
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className="nav-link" 
                to="/contact" 
                onClick={() => setIsOpen(false)}
              >
                <i className="fas fa-envelope me-1"></i>
                Contacto
              </Link>
            </li>
          </ul>
          
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item dropdown">
                  <a 
                    className="nav-link dropdown-toggle" 
                    href="#" 
                    id="userDropdown" 
                    role="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    <i className="fas fa-user me-1"></i>
                    {user.name}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="userDropdown">
                    <li>
                      <Link 
                        className="dropdown-item" 
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                      >
                        <i className="fas fa-user-circle me-2"></i>
                        Mi Perfil
                      </Link>
                    </li>
                    {user.role === 'admin' && (
                      <li>
                        <Link 
                          className="dropdown-item" 
                          to="/admin"
                          onClick={() => setIsOpen(false)}
                        >
                          <i className="fas fa-cog me-2"></i>
                          Administración
                        </Link>
                      </li>
                    )}
               <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button 
                        className="dropdown-item" 
                        onClick={handleLogout}
                      >
                        <i className="fas fa-sign-out-alt me-2"></i>
                         Cerrar Sesión
                     </button>
                   </li>
              </ul>
             </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link 
                    className="nav-link" 
                    to="/login" 
                    onClick={() => setIsOpen(false)}
                  >
                    <i className="fas fa-sign-in-alt me-1"></i>
                    Iniciar Sesión
                  </Link>
                </li>
            <li className="nav-item">
                  <Link 
                    className="nav-link" 
                    to="/register" 
                    onClick={() => setIsOpen(false)}
                  >
                    <i className="fas fa-user-plus me-1"></i>
                    Registrarse
                  </Link>
                </li>
              </>
            )}
            
            <li className="nav-item">
               <Link 
                className="nav-link position-relative" 
                to="/cart" 
                onClick={() => setIsOpen(false)}
              >
                <i className="fas fa-shopping-cart me-1"></i>
                🛒 Carrito
                {getCartItemsCount() > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {getCartItemsCount()}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
};


export default Navbar;