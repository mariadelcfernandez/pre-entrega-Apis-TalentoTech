// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsContext';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import styled from 'styled-components';
import { 
  FaShippingFast, 
  FaShieldAlt, 
  FaHeadset, 
  FaTags,
  FaFire,
  FaStar
} from 'react-icons/fa';

const Hero = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23ffffff" fill-opacity="0.1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,192C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
    background-size: cover;
    background-position: bottom;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const Features = styled.section`
  padding: 5rem 0;
  background: #f8f9fa;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 1rem;
`;

const FeaturedProducts = styled.section`
  padding: 5rem 0;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h2 {
    color: #333;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    font-size: 1.1rem;
  }
`;

const Home = () => {
  const { 
    filteredProducts, 
    setFilters,
    fetchProducts,
     } = useProducts();

  
  const [featuredProducts, setFeaturedProducts] = useState([]);
 

  useEffect(() => {
    // Obtener productos destacados (nuevos y mejor valorados)
    const featured = filteredProducts
      .filter(p => p.isNew || p.rating >= 4)
      .slice(0, 4);
    
    setFeaturedProducts(featured);
  }, [filteredProducts]);

  const handleSearch = (term) => {
    setFilters(prev => ({
      ...prev,
      search: term,
      page: 1
    }));
  };

  return (
    <>
      <Helmet>
        <title>Tienda Tecnoya! | Los mejores productos al mejor precio</title>
        <meta name="description" content="Bienvenido a nuestra tienda online. Encuentra productos de calidad con envío rápido y seguro." />
        <meta name="keywords" content="tienda online, compras, productos, ofertas" />
      </Helmet>

      <Hero>
        <div className="container">
          <HeroContent>
            <HeroTitle>Bienvenido a Tienda Online</HeroTitle>
            <HeroSubtitle>
              Descubre nuestra amplia selección de productos de alta calidad 
              con los mejores precios y envío rápido a todo el país.
            </HeroSubtitle>
            
            <div className="mb-4">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="¿Qué estás buscando hoy?"
                showRecent={true}
              />
            </div>
            
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/productos" className="btn btn-light btn-lg px-4 py-2">
                Ver Todos los Productos
              </Link>
              <Link to="/ofertas" className="btn btn-outline-light btn-lg px-4 py-2">
                <FaFire className="me-2" />
                Ofertas Especiales
              </Link>
            </div>
          </HeroContent>
        </div>
      </Hero>

      <Features>
        <div className="container">
          <SectionHeader>
            <h2>¿Por qué elegirnos?</h2>
            <p>Ofrecemos la mejor experiencia de compra online</p>
          </SectionHeader>
          
          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>
                <FaShippingFast />
              </FeatureIcon>
              <h4>Envío Rápido</h4>
              <p className="text-muted">
                Recibe tus productos en 24-48 horas en toda la ciudad
              </p>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>
                <FaShieldAlt />
              </FeatureIcon>
              <h4>Compra Segura</h4>
              <p className="text-muted">
                Tus datos protegidos con encriptación SSL de 256 bits
              </p>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>
                <FaHeadset />
              </FeatureIcon>
              <h4>Soporte 24/7</h4>
              <p className="text-muted">
                Atención al cliente disponible las 24 horas
              </p>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>
                <FaTags />
              </FeatureIcon>
              <h4>Mejores Precios</h4>
              <p className="text-muted">
                Garantía del mejor precio o te devolvemos la diferencia
              </p>
            </FeatureCard>
          </FeatureGrid>
        </div>
      </Features>

      <FeaturedProducts>
        <div className="container">
          <SectionHeader>
            <h2>Productos Destacados</h2>
            <p>Los productos más populares y mejor valorados</p>
          </SectionHeader>
          
          {featuredProducts.length > 0 ? (
            <div className="row">
              {featuredProducts.map(product => (
                <div key={product.id} className="col-md-3 col-sm-6 mb-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="position-relative">
                      <img 
                        src={product.image || `https://picsum.photos/seed/${product.id}/300/200`}
                        className="card-img-top"
                        alt={product.name}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      {product.isNew && (
                        <span className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 m-2 rounded">
                          NUEVO
                        </span>
                      )}
                      {product.rating >= 4.5 && (
                        <span className="position-absolute top-0 end-0 bg-warning text-dark px-2 py-1 m-2 rounded">
                          <FaStar className="me-1" /> TOP
                        </span>
                      )}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text text-muted small">
                        {product.description.substring(0, 60)}...
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="h5 mb-0 text-primary">
                          ${product.price.toFixed(2)}
                        </span>
                        <Link 
                          to={`/producto/${product.id}`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          Ver Detalles
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">Cargando productos destacados...</p>
            </div>
          )}
          
          <div className="text-center mt-4">
            <Link to="/productos" className="btn btn-primary btn-lg">
              Ver Más Productos
            </Link>
          </div>
        </div>
      </FeaturedProducts>

      <section className="py-5 bg-dark text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>Suscríbete a nuestro newsletter</h2>
              <p className="lead">
                Recibe ofertas exclusivas y novedades directamente en tu correo
              </p>
            </div>
            <div className="col-md-6">
              <form className="d-flex gap-2">
                <input 
                  type="email" 
                  className="form-control form-control-lg" 
                  placeholder="Tu correo electrónico" 
                  required 
                />
                <button type="submit" className="btn btn-primary btn-lg">
                  Suscribirse
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;