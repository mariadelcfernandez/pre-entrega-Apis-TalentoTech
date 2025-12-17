// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Nosotros from '../pages/Nosotros';


const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: auto;
`;

const FooterSection = styled.div`
  h5 {s
    color: #3498db;
    margin-bottom: 1rem;
    font-weight: 600;
  }
`;

const FooterLink = styled(Link)`
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s;
  display: block;
  margin-bottom: 0.5rem;

  &:hover {
    color: #3498db;
  }
`;

const ExternalLink = styled.a`
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s;
  display: block;
  margin-bottom: 0.5rem;

  &:hover {
    color: #3498db;
  }
`;

const SocialIcon = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s;
  margin-right: 0.5rem;

  &:hover {
    background: #3498db;
    transform: translateY(-3px);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  
  i {
    margin-right: 10px;
    color: #3498db;
    width: 20px;
  }
#description {
  color: #b5b9bcff;
  transition: color 0.3s;
}`;

const NewsletterForm = styled.form`
  display: flex;
  margin-top: 1rem;

  input {
    flex: 1;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px 0 0 4px;
  }

  button {
    background: #3498db;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #2980b9;
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;
  margin-top: 2rem;
`;

const PaymentMethods = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 1rem;
  
  span {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    alert(`¡Gracias por suscribirte con el email: ${email}!`);
    e.target.reset();
  };

  return (
    <FooterContainer>
      <div className="container">
        <div className="row">
          {/* Columna 1: Información de la empresa */}
          <div className="col-lg-4 col-md-6 mb-4">
            <FooterSection>
              <h5>🛍️ Tecnoya. Tecnologia e Informática</h5>
              <p className="description">
                Tu tienda de confianza para productos tecnológicos. Ofrecemos los mejores precios y calidad en laptops, componentes y periféricos.
              </p>
              <div className="d-flex mt-3">
                <SocialIcon href="#" title="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </SocialIcon>
                <SocialIcon href="#" title="Twitter">
                  <i className="fab fa-twitter"></i>
                </SocialIcon>
                <SocialIcon href="#" title="Instagram">
                  <i className="fab fa-instagram"></i>
                </SocialIcon>
                <SocialIcon href="#" title="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </SocialIcon>
              </div>
            </FooterSection>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="col-lg-2 col-md-6 mb-4">
            <FooterSection>
              <h5>Enlaces Rápidos</h5>
              <FooterLink to="/">Inicio</FooterLink>
              <FooterLink to="/products">Productos</FooterLink>
              <FooterLink to="../pages/Nosotros">Nosotros</FooterLink>
              <FooterLink to="/contact">Contacto</FooterLink>
              <FooterLink to="/support">Servicios</FooterLink>
            </FooterSection>
          </div>

          {/* Columna 3: Categorías */}
          <div className="col-lg-2 col-md-6 mb-4">
            <FooterSection>
              <h5>Categorías</h5>
              <FooterLink to="/products?category=laptops">Laptops</FooterLink>
              <FooterLink to="/products?category=monitores">Monitores</FooterLink>
              <FooterLink to="/products?category=perifericos">Periféricos</FooterLink>
              <FooterLink to="/products?category=componentes">Componentes</FooterLink>
              <FooterLink to="/products?category=almacenamiento">Almacenamiento</FooterLink>
            </FooterSection>
          </div>

          {/* Columna 4: Contacto y Newsletter */}
          <div className="col-lg-4 col-md-6 mb-4">
            <FooterSection>
              <h5>Contacto</h5>
              <ContactInfo>
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <div>9 de Julio 1400</div>
                  <div>Ciudad Corrientes, CP 3400</div>
                </div>
              </ContactInfo>
              
              <ContactInfo>
                <i className="fas fa-phone"></i>
                <div>+54 (379) 425-1308</div>
              </ContactInfo>
              
              <ContactInfo>
                <i className="fas fa-envelope"></i>
                <div>info@tecoya.com</div>
              </ContactInfo>

              <div className="mt-4">
                <h6>Newsletter</h6>
                <p className="description small">
                  Suscríbete para recibir ofertas y novedades
                </p>
                <NewsletterForm onSubmit={handleNewsletterSubmit}>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Tu email" 
                    required 
                  />
                  <button type="submit">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </NewsletterForm>
              </div>
            </FooterSection>
          </div>
        </div>

        <FooterBottom>
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="text-muted mb-0">
                &copy; {currentYear} Tecnoya- Maria Fernandez. Todos los derechos reservados-2025.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="text-muted small">
                Métodos de pago aceptados:
                <PaymentMethods>
                  <span>💳 Visa</span>
                  <span>💳 MasterCard</span>
                  <span>💳 PayPal</span>
                  <span>💳 Mercado Pago</span>
                </PaymentMethods>
              </div>
            </div>
          </div>
        </FooterBottom>
      </div>
    </FooterContainer>
  );
};

export default Footer;