// src/pages/ProductDetail.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

const ProductDetailContainer = styled.div`
  padding: 2rem 0;
`;

const ProductImage = styled.img`
  max-height: 500px;
  object-fit: contain;
`;
// Función helper para rating seguro
const getSafeRating = (rating) => {
  if (!rating) return { rate: 0, count: 0 };
  if (typeof rating === 'number') return { rate: rating, count: 0 };
  if (typeof rating === 'object') {
    return {
      rate: rating.rate || 0,
      count: rating.count || 0
    };
  }
  return { rate: 0, count: 0 };
};

const ProductDetail = () => {
  const { category,id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
         console.log(`🔄 Cargando producto: ID ${id}, Categoría: ${category}`);
         // Intentar con json-server local
       // const response1 = await axios.get(`http://localhost:3001/products/${id}`);
        const response = await axios.get(`https://68e454e98e116898997b92ab.mockapi.io/api/v1/products/${id}`);
       if (category && response.data.category !== category) {
          console.warn(`⚠️ Advertencia: La categoría en la URL (${category}) no coincide con la categoría del producto (${response.data.category})`);
        }
        setProduct(response.data);
         console.log('✅ Producto cargado:', response.data.name);
      } catch (err) {
        console.error('❌ Error cargando producto:', err);
        setError('Producto no encontrado');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, category]);
    // Función para navegar a productos de la misma categoría
  const navigateToCategory = () => {
    if (product?.category) {
      navigate(`/products?category=${product.category}`);
    } else {
      navigate('/products');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
          <p className="mt-2">Cargando producto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-danger">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe o no está disponible.</p>
        </div>
        <button 
          className="btn btn-primary mt-3"
          onClick={() => navigate(-1)}
        >
          Volver atrás
        </button>
        <button 
          className="btn btn-outline-primary mt-3 ms-2"
          onClick={() => navigate('/products')}
        >
          Ver todos los productos
        </button>
      </div>
     
    );
  }
  const safeRating = getSafeRating(product.rating);
 
  return (
    <div className="container py-4">
      {/* Breadcrumb de navegación */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <button 
              className="btn btn-link text-decoration-none p-0"
              onClick={() => navigate('/')}
            >
              Inicio
            </button>
          </li>
          <li className="breadcrumb-item">
            <button 
              className="btn btn-link text-decoration-none p-0"
              onClick={() => navigate('/products')}
            >
              Productos
            </button>
          </li>
          <li className="breadcrumb-item">
            <button 
              className="btn btn-link text-decoration-none p-0"
              onClick={navigateToCategory}
            >
              {product.category}
            </button>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name || product.title}
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <img 
              src={product.image} 
              className="card-img-top p-4"
              alt={product.name || product.title}
              style={{ height: '400px', objectFit: 'contain' }}
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/500x400/667eea/ffffff?text=${encodeURIComponent(product.name || product.title)}`;
              }}
            />
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card h-100 border-0">
            <div className="card-body">
              <h1 className="card-title display-6">{product.name || product.title}</h1>
              
              <div className="mb-3">
                <span className="badge bg-primary me-2 text-uppercase">
                  {product.category}
                </span>
                <span className="text-warning">
                  {'⭐'.repeat(Math.round(safeRating.rate))}
                  {'☆'.repeat(5 - Math.round(safeRating.rate))}
                </span>
                <span className="text-muted ms-2">
                  ({safeRating.count} reseñas)
                </span>
              </div>
              
              <h2 className="text-primary mb-4">${product.price}</h2>
              
              <p className="card-text lead mb-4">{product.description}</p>
              
              {/* Información de stock */}
              <div className="mb-4">
                {product.inStock ? (
                  <div className="alert alert-success d-flex align-items-center">
                    <i className="fas fa-check-circle me-2"></i>
                    <span>✓ En stock - Disponible para envío inmediato</span>
                  </div>
                ) : (
                  <div className="alert alert-warning d-flex align-items-center">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    <span>⚠️ Producto agotado - No disponible temporalmente</span>
                  </div>
                )}
              </div>

              {/* Especificaciones técnicas */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="mb-4">
                  <h5 className="mb-3">
                    <i className="fas fa-list-alt me-2"></i>
                    Especificaciones Técnicas
                  </h5>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <tbody>
                        {Object.entries(product.specs).map(([key, value]) => (
                          <tr key={key}>
                            <th className="text-nowrap" style={{ width: '40%' }}>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </th>
                            <td>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Botones de acción */}
              <div className="d-grid gap-2 d-md-flex mt-auto">
                <button 
                  className="btn btn-primary btn-lg flex-fill"
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                >
                  <i className="fas fa-shopping-cart me-2"></i>
                  {product.inStock ? 'Agregar al Carrito' : 'No Disponible'}
                </button>
                <button 
                  className="btn btn-outline-primary btn-lg"
                  onClick={() => {
                    if (product.inStock) {
                      addToCart(product);
                      navigate('/cart');
                    }
                  }}
                  disabled={!product.inStock}
                >
                  <i className="fas fa-bolt me-2"></i>
                  Comprar Ahora
                </button>
              </div>

              {/* Información adicional */}
              <div className="mt-4 pt-3 border-top">
                <div className="row text-center">
                  <div className="col-4">
                    <i className="fas fa-shipping-fast text-primary mb-2"></i>
                    <p className="small mb-0">Envío Gratis</p>
                  </div>
                  <div className="col-4">
                    <i className="fas fa-shield-alt text-primary mb-2"></i>
                    <p className="small mb-0">Garantía</p>
                  </div>
                  <div className="col-4">
                    <i className="fas fa-undo-alt text-primary mb-2"></i>
                    <p className="small mb-0">Devoluciones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProductDetail;