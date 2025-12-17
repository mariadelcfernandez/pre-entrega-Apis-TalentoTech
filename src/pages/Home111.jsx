// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts111';
import styled from 'styled-components';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import products from './Products';


const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 100px 0;
  text-align: center;
`;

const FeatureCard = styled.div`
  border: none;
  border-radius: 15px;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection>
        <div className="container">
          <h1 className="display-4 fw-bold mb-4">
            Bienvenido a MiTienda Informática
          </h1>
          <p className="lead mb-4">
            Encuentra los mejores productos tecnológicos al mejor precio
          </p>
          {/* CORRECCIÓN: Agregar Link para navegar a productos */}
          <Link to="/products" className="btn btn-light btn-lg">
            Comprar Ahora
          </Link>
        </div>
      </HeroSection>

      {/* Featured Products */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Productos Destacados</h2>
          <div className="row g-4">
            {featuredProducts.map(product => (
              <div key={product.id} className="col-md-4">
                <FeatureCard className="card h-100">
                  <img 
                    src={product.image} 
                    className="card-img-top p-3" 
                    alt={product.name || product.title}
                    style={{ height: '200px', objectFit: 'contain' }}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300x200/667eea/ffffff?text=${encodeURIComponent(product.name || product.title)}`;
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name || product.title}</h5>
                    <p className="card-text text-muted">
                      {(product.description || '').substring(0, 100)}...
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h5 text-primary mb-0">${product.price}</span>
                      {/* CORRECCIÓN: Link para detalles del producto */}
                      <Link 
                        to={`/product/${product.category}/${product.id}`}
                        className="btn btn-primary w-100"
                      >
                        Ver Detalles
                      </Link>                                            
                    </div>
                  </div>
                </FeatureCard>
              </div>
            ))}
          </div>
          
          {/* Botón adicional para ver todos los productos */}
          <div className="text-center mt-5">
            <Link to="/products" className="btn btn-outline-primary btn-lg">
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de categorías */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Nuestras Categorías</h2>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h3>💻</h3>
                  <h5>Laptops</h5>
                  <p className="text-muted">Encuentra la laptop perfecta</p>
                  <Link to="/products?category=laptops" className="btn btn-outline-primary">
                    Explorar
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h3>🖥️</h3>
                  <h5>Monitores</h5>
                  <p className="text-muted">Mejora tu espacio de trabajo</p>
                  <Link to="/products?category=monitores" className="btn btn-outline-primary">
                    Explorar
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h3>⌨️</h3>
                  <h5>Periféricos</h5>
                  <p className="text-muted">Teclados, mouse y más</p>
                  <Link to="/products?category=perifericos" className="btn btn-outline-primary">
                    Explorar
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h3>🔧</h3>
                  <h5>Componentes</h5>
                  <p className="text-muted">Arma tu PC ideal</p>
                  <Link to="/products?category=componentes" className="btn btn-outline-primary">
                    Explorar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;