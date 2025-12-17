// src/pages/Products.jsx
import React from 'react';
//import { Helmet } from 'react-helmet-async';
import AdvancedFilters from '../components/AdvancedFilters';
//import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { useProducts } from '../contexts/ProductsContext';
import styled from 'styled-components';

const ProductsContainer = styled.div`
  padding: 2rem 0;
`;

const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ProductsTitle = styled.h1`
  color: #333;
  margin: 0;
`;

const Products = () => {
  const {
    filteredProducts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    currentPage,
    totalPages,
    paginate,
    totalItems
  } = useProducts();

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Helmet>
        <title>Productos | Tienda Online</title>
        <meta name="description" content="Explora nuestro catálogo de productos. Encuentra lo que necesitas al mejor precio." />
      </Helmet>
      
      <ProductsContainer>
        <div className="container">
          <ProductsHeader>
            <ProductsTitle>Nuestros Productos</ProductsTitle>
            <div style={{ width: '100%', maxWidth: '400px' }}>
              <SearchBar
                onSearch={handleSearch}
                placeholder="Buscar productos..."
                value={searchTerm}
              />
            </div>
          </ProductsHeader>
          
          <AdvancedFilters
            filters={filters}
            onFiltersChange={handleFilterChange}
          />
          
          <ProductList
            products={filteredProducts}
            loading={loading}
            error={error}
          />
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={paginate}
              totalItems={totalItems}
            />
          )}
        </div>
      </ProductsContainer>
    </>
  );
};

export default Products;