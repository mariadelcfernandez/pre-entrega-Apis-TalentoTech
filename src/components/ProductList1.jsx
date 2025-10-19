// src/components/ProductList.jsx
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

const ProductCard = styled.div`
  transition: transform 0.2s, box-shadow 0.2s;
  border: none;
  border-radius: 15px;
  overflow: hidden;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
`;

const ProductImage = styled.img`
  height: 200px;
  object-fit: contain;
  padding: 1rem;
  background: #f8f9fa;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.05);
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  }
`;

const SpecsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;

  li {
    margin-bottom: 0.25rem;
  }
`;

const ProductList = ({ products, loading, error }) => {
  const { addToCart } = useCart();

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-warning text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="row g-4">
      {products.map(product => (
        <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
          <ProductCard className="card h-100">
            <ProductImage 
              src={product.image} 
              className="card-img-top" 
              alt={product.name}
            />
            <div className="card-body d-flex flex-column">
              <h6 className="card-title">{product.name}</h6>
              <p className="card-text text-muted small flex-grow-1">
                {product.description}
              </p>
              
              {/* Especificaciones técnicas */}
              {product.specs && (
                <div className="mb-2">
                  <SpecsList>
                    {Object.entries(product.specs).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                  </SpecsList>
                </div>
              )}
              
              <div className="mt-auto">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="h5 text-primary mb-0">${product.price}</span>
                  <div>
                    {product.inStock ? (
                      <span className="badge bg-success">En Stock</span>
                    ) : (
                      <span className="badge bg-danger">Sin Stock</span>
                    )}
                  {/*  <span className="badge bg-warning ms-1">
                      {product.rating} ⭐
                    </span>*/}
                  </div>
                </div>
                <AddButton 
                  className="btn btn-primary w-100"
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Agregar al Carrito' : 'Sin Stock'}
                </AddButton>
              </div>
            </div>
          </ProductCard>
        </div>
      ))}
    </div>
  );
};

export default ProductList;