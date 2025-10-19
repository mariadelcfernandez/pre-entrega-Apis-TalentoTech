// src/components/ProductList.jsx
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ProductList = ({ products, loading, error, dataSource }) => {
  const { addToCart } = useCart();

  // Función para obtener producto de fuente
  const getProductOrigin = () => {
    if (!dataSource) return null;
    
    const origin = {
      external: { text: 'API Externa', color: 'bg-info' },
      local: { text: 'API Local', color: 'bg-success' },
      mock: { text: 'Datos Demo', color: 'bg-warning' }
    };
    
    const source = origin[dataSource];
    if (!source) return null;
    
    return (
      <div className="text-center mb-3">
        <span className={`badge ${source.color} text-dark`}>
          Fuente: {source.text}
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2 text-muted">Buscando productos disponibles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-warning text-center" role="alert">
        <h5>⚠️ Aviso</h5>
        <p className="mb-2">{error}</p>
        <small>Los productos pueden ser de demostración</small>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <h5>No se encontraron productos</h5>
        <p className="text-muted">Intenta con otros filtros de búsqueda</p>
      </div>
    );
  }

  return (
    <>
      {getProductOrigin()}
      
      <div className="row g-4">
        {products.map(product => (
          <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
            <div className="card h-100 shadow-sm">
              <img 
                src={product.avatar || product.image} 
                className="card-img-top p-3" 
                alt={product.name}
                style={{ height: '200px', objectFit: 'contain' }}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/300x200/667eea/ffffff?text=${encodeURIComponent(product.name)}`;
                }}
              />
             <div className="card-body d-flex flex-column">
               { /*   <div className="d-flex justify-content-between align-items-start mb-2">
                  <span className="badge bg-secondary">{product.brand}</span>
                  <span className="badge bg-warning text-dark">
                    {product.rating} ⭐
                  </span>
                </div>*/}
                
                <h6 className="card-title">{product.name}</h6>
                <p className="card-text text-muted small flex-grow-1">
                  {product.description}
                </p>
                
                {product.specs && (
                  <div className="mb-3">
                    <ul className="list-unstyled small text-muted">
                      {Object.entries(product.specs).slice(0, 2).map(([key, value]) => (
                        <li key={key}>
                          <strong>{key}:</strong> {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="h5 text-primary mb-0">${product.price}</span>
                    {product.inStock ? (
                      <span className="badge bg-success">En Stock</span>
                    ) : (
                      <span className="badge bg-danger">Sin Stock</span>
                    )}
                  </div>
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-primary flex-grow-1"
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? 'Agregar al Carrito' : 'Sin Stock'}
                    </button>
                    <Link 
                      to={`/product/${product.category}/${product.id}`}
                      className="btn btn-outline-primary"
                    >
                      Ver
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;