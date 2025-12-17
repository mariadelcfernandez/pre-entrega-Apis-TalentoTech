// src/pages/NotFound.jsx (con Bootstrap)
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Container, 
  Row, 
  Col, 
  Button 
} from 'react-bootstrap';
import { FaHome, FaSearch, FaExclamationTriangle } from 'react-icons/fa';

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Página no encontrada | Tu Tienda Tecnoya!</title>
      </Helmet>
      
      <Container className="py-5">
        <Row className="justify-content-center align-items-center min-vh-50">
          <Col md={8} lg={6} className="text-center">
            <div className="mb-4">
              <FaExclamationTriangle 
                size={80} 
                className="text-warning mb-3"
                style={{ animation: 'bounce 2s infinite' }}
              />
              
              <h1 className="display-1 fw-bold text-gradient-primary mb-3">
                404
              </h1>
              
              <h2 className="h1 mb-3">¡Ups! Página no encontrada</h2>
              
              <p className="lead text-muted mb-4">
                Lo sentimos, la página que estás buscando no existe 
                o ha sido movida. Puedes volver al inicio o usar el 
                buscador para encontrar lo que necesitas.
              </p>
              
              <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
                <Button 
                  as={Link} 
                  to="/" 
                  variant="primary" 
                  size="lg"
                  className="px-4"
                >
                  <FaHome className="me-2" />
                  Volver al Inicio
                </Button>
                
                <Button 
                  as={Link} 
                  to="/productos" 
                  variant="outline-primary" 
                  size="lg"
                  className="px-4"
                >
                  <FaSearch className="me-2" />
                  Ver Productos
                </Button>
              </div>
              
              <div className="bg-light p-4 rounded-3 mb-4">
                <h3 className="h5 mb-3">
                  <FaSearch className="me-2 text-primary" />
                  ¿Qué estás buscando?
                </h3>
                
                <form className="d-flex max-w-400 mx-auto">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Buscar productos..."
                    style={{ borderRight: 'none' }}
                  />
                  <Button type="submit" variant="primary" size="lg">
                    Buscar
                  </Button>
                </form>
              </div>
              
              <div className="text-muted">
                <p className="mb-0">
                  ¿Necesitas ayuda?{' '}
                  <Link to="/contacto" className="text-decoration-none fw-semibold">
                    Contáctanos
                  </Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      
      <style>
        {`
          .text-gradient-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .min-vh-50 {
            min-height: 50vh;
          }
          
          .max-w-400 {
            max-width: 400px;
          }
          
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
    </>
  );
};

export default NotFound;