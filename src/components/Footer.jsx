// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/Logo.jpeg';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaHeadset,
  
} from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #2c3e50 0%, #1a2530 100%);
  color: white;
  padding: 4rem 0 2rem;
  margin-top: auto;
`;

const FooterSection = styled.div`
  margin-bottom: 2rem;
`;

const FooterTitle = styled.h5`
  color: #ffd700;
  margin-bottom: 1.5rem;
  font-weight: 600;
  position: relative;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background: #ffd700;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.75rem;
`;

const FooterLinkItem = styled(Link)`
  color: #bdc3c7;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: white;
    padding-left: 5px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.color || '#667eea'};
    transform: translateY(-3px);
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const PaymentMethods = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const PaymentIcon = styled.div`
  background: white;
  width: 40px;
  height: 25px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 1.5rem;
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #95a5a6;
  font-size: 0.9rem;
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 0.5rem;
  
  input {
    flex: 1;
    padding: 0.75rem;
    border: none;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    
    &::placeholder {
      color: #bdc3c7;
    }
    
    &:focus {
      outline: none;
      background: rgba(255, 255, 255, 0.2);
    }
  }
  
  button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 0 1.5rem;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      opacity: 0.9;
    }
  }
`;

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Lógica para suscripción
    alert('¡Gracias por suscribirte!');
  };

  return (
    <FooterContainer>
      <div className="container">
        <div className="row">
          {/* Información de la empresa */}
          <div className="col-lg-4 col-md-6 mb-4">
            <FooterSection>
              {<img src={Logo} alt="Mi Logo" style={{ width: '50px' }} />}
              
            
              <p style={{ color: '#bdc3c7', lineHeight: '1.6' }}>
                Tu tienda online de confianza. Ofrecemos los mejores productos 
                con calidad garantizada y envío a todo el país.
              </p>
              
              <SocialLinks>
                <SocialLink href="#" color="#3b5998">
                  <FaFacebook />
                </SocialLink>
                <SocialLink href="#" color="#1da1f2">
                  <FaTwitter />
                </SocialLink>
                <SocialLink href="#" color="#e1306c">
                  <FaInstagram />
                </SocialLink>
                <SocialLink href="#" color="#0077b5">
                  <FaLinkedin />
                </SocialLink>
                <SocialLink href="#" color="#ff0000">
                  <FaYoutube />
                </SocialLink>
              </SocialLinks>
            </FooterSection>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-lg-2 col-md-6 mb-4">
            <FooterSection>
              <FooterTitle>Enlaces Rápidos</FooterTitle>
              <FooterLinks>
                <FooterLink>
                  <FooterLinkItem to="/">
                    Inicio
                  </FooterLinkItem>
                </FooterLink>
                <FooterLink>
                  <FooterLinkItem to="/productos">
                    Productos
                  </FooterLinkItem>
                </FooterLink>
                <FooterLink>
                  <FooterLinkItem to="/ofertas">
                    Ofertas
                  </FooterLinkItem>
                </FooterLink>
                <FooterLink>
                  <FooterLinkItem to="/nosotros">
                    Sobre Nosotros
                  </FooterLinkItem>
                </FooterLink>
                <FooterLink>
                  <FooterLinkItem to="/contacto">
                    Contacto
                  </FooterLinkItem>
                </FooterLink>
              </FooterLinks>
            </FooterSection>
          </div>

          {/* Categorías */}
          <div className="col-lg-2 col-md-6 mb-4">
            <FooterSection>
              <FooterTitle>Categorías</FooterTitle>
              <FooterLinks>
                <FooterLink>
                  <FooterLinkItem to="/productos?categoria=electronica">
                    Electrónica
                  </FooterLinkItem>
                </FooterLink>
                <FooterLink>
                  <FooterLinkItem to="/productos?categoria=ropa">
                    Ropa
                  </FooterLinkItem>
                </FooterLink>
                <FooterLink>
                  <FooterLinkItem to="/productos?categoria=hogar">
                    Hogar
                  </FooterLinkItem>
                </FooterLink>
                <FooterLink>
                  <FooterLinkItem to="/productos?categoria=deportes">
                    Deportes
                  </FooterLinkItem>
                </FooterLink>
                <FooterLink>
                  <FooterLinkItem to="/productos?categoria=libros">
                    Libros
                  </FooterLinkItem>
                </FooterLink>
              </FooterLinks>
            </FooterSection>
          </div>

          {/* Características */}
          <div className="col-lg-4 col-md-6 mb-4">
            <FooterSection>
              <FooterTitle>Por qué elegirnos</FooterTitle>
              
              <FeatureItem>
                <FeatureIcon>
                  <FaShieldAlt />
                </FeatureIcon>
                <div>
                  <h6 style={{ color: 'white', marginBottom: '0.25rem' }}>Compra Segura</h6>
                  <p style={{ color: '#bdc3c7', fontSize: '0.875rem', margin: 0 }}>
                    Tus datos están protegidos con encriptación SSL
                  </p>
                </div>
              </FeatureItem>
              
              <FeatureItem>
                <FeatureIcon>
                  <FaTruck />
                </FeatureIcon>
                <div>
                  <h6 style={{ color: 'white', marginBottom: '0.25rem' }}>Envío Rápido</h6>
                  <p style={{ color: '#bdc3c7', fontSize: '0.875rem', margin: 0 }}>
                    Entrega en 24-48 horas en toda la ciudad
                  </p>
                </div>
              </FeatureItem>
              
              <FeatureItem>
                <FeatureIcon>
                  <FaUndo />
                </FeatureIcon>
                <div>
                  <h6 style={{ color: 'white', marginBottom: '0.25rem' }}>Devoluciones</h6>
                  <p style={{ color: '#bdc3c7', fontSize: '0.875sterem', margin: 0 }}>
                    30 días para devoluciones sin complicaciones
                  </p>
                </div>
              </FeatureItem>
              
              <FeatureItem>
                <FeatureIcon>
                  <FaHeadset />
                </FeatureIcon>
                <div>
                  <h6 style={{ color: 'white', marginBottom: '0.25rem' }}>Soporte 24/7</h6>
                  <p style={{ color: '#bdc3c7', fontSize: '0.875rem', margin: 0 }}>
                    Atención al cliente disponible todo el día
                  </p>
                </div>
              </FeatureItem>
            </FooterSection>
          </div>
        </div>

        <div className="row mt-4">
          {/* Newsletter */}
          <div className="col-lg-6 mb-4">
            <FooterSection>
              <FooterTitle>Newsletter</FooterTitle>
              <p style={{ color: '#bdc3c7', marginBottom: '1rem' }}>
                Suscríbete para recibir ofertas exclusivas y novedades
              </p>
              <NewsletterForm onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  required 
                />
                <button type="submit">Suscribirse</button>
              </NewsletterForm>
            </FooterSection>
          </div>

          {/* Métodos de pago */}
          <div className="col-lg-6 mb-4">
            <FooterSection>
              <FooterTitle>Métodos de Pago</FooterTitle>
              <PaymentMethods>
                <PaymentIcon>
                  <FaCcVisa />
                </PaymentIcon>
                <PaymentIcon>
                  <FaCcMastercard />
                </PaymentIcon>
                <PaymentIcon>
                  <FaCcPaypal />
                </PaymentIcon>
                <PaymentIcon>
                  <FaCcApplePay />
                </PaymentIcon>
              </PaymentMethods>
            </FooterSection>
          </div>
        </div>

        {/* Copyright */}
        <Copyright>
          <div className="row">
            <div className="col-md-6 text-md-start mb-2 mb-md-0">
              © {new Date().getFullYear()} ShopOnline. Todos los derechos reservados.
            </div>
            <div className="col-md-6 text-md-end">
              <Link to="/terminos" style={{ color: '#95a5a6', textDecoration: 'none', marginRight: '1rem' }}>
                Términos y condiciones
              </Link>
              <Link to="/privacidad" style={{ color: '#95a5a6', textDecoration: 'none' }}>
                Política de privacidad
              </Link>
            </div>
          </div>
        </Copyright>
      </div>
    </FooterContainer>
  );
};

export default Footer;