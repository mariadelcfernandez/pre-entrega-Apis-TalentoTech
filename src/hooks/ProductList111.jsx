// src/components/ProductList.jsx
import React, { memo } from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from './ui/LoadingSpinner';
import styled from 'styled-components';
import { useProducts } from '../contexts/ProductsContext';

const ProductListContainer = styled.div`
  padding: 2rem 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  color: white;
  
  h3 {
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  p {
    opacity: 0.9;
    margin-bottom: 2rem;
  }
`;

const ProductList = memo(({ 
  products, 
  loading, 
  error,
  onEdit,
  onDelete,
  showAdminControls = false 
}) => {
  const { addToCart } = useProducts();

  if (loading) {
    return (
      <ProductListContainer>
        <LoadingSpinner message="Cargando productos..." />
      </ProductListContainer>
    );
  }

  if (error) {
    return (
      <ProductListContainer>
        <EmptyState>
          <h3>¡Ups! Algo salió mal</h3>
          <p>{error}</p>
          <button 
            className="btn btn-light"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </EmptyState>
      </ProductListContainer>
    );
  }

  if (!products || products.length === 0) {
    return (
      <ProductListContainer>
        <EmptyState>
          <h3>No hay productos disponibles</h3>
          <p>No encontramos productos que coincidan con tu búsqueda</p>
          <button 
            className="btn btn-light"
            onClick={() => window.location.href = '/productos'}
          >
            Ver todos los productos
          </button>
        </EmptyState>
      </ProductListContainer>
    );
  }

  return (
    <ProductListContainer>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4">
          Productos <span className="badge bg-primary">{products.length}</span>
        </h2>
        <small className="text-muted">
          Mostrando {products.length} productos
        </small>
      </div>
      
      <Grid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddToCart={addToCart}
            showAdminControls={showAdminControls}
          />
        ))}
      </Grid>
    </ProductListContainer>
  );
});

ProductList.displayName = 'ProductList';

export default ProductList;