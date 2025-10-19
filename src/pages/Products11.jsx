// src/pages/Products.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import ProductList from '../components/ProductList';
import AdvancedFilters from '../components/AdvancedFilters';
import Pagination from '../components/Pagination';
import styled from 'styled-components';

const PageHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
  margin-bottom: 2rem;
`;

const ResultsInfo = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
`;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'newest',
    inStock: searchParams.get('inStock') === 'true',
    page: parseInt(searchParams.get('page')) || 1,
    limit: 12
  });

  const { products, loading, error, pagination } = useProducts(filters);
   // Manejo seguro de pagination - valores por defecto
  const safePagination = pagination || {
    totalPages: 0,
    currentPage: 1,
    total: 0
  };

  // Actualizar URL cuando cambien los filtros
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '' && value !== false) {
        params.set(key, value.toString());
      }
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFiltersChange = (newFilters) => {
    setFilters({ ...newFilters, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <PageHeader>
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Nuestros Productos</h1>
          <p className="lead">Tecnología de última generación</p>
        </div>
      </PageHeader>

      <div className="container">
        <AdvancedFilters 
          filters={filters} 
          onFiltersChange={handleFiltersChange} 
        />

        {/* Información de resultados */}
        {!loading && (
          <ResultsInfo className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <strong>{safePagination.total || 0}</strong> productos encontrados
              {filters.search && (
                <span className="ms-2">
                  para "<em>{filters.search}</em>"
                </span>
              )}
              {filters.category && (
                <span className="ms-2">
                  en <strong>{filters.category}</strong>
                </span>
              )}
            </div>
            <div className="text-muted">
              Página {safePagination.currentPage || 1} de {safePagination.totalPages || 0} 
            </div>
          </ResultsInfo>
        )}

        {/* Lista de productos */}
        <ProductList 
          products={products} 
          loading={loading} 
          error={error} 
        />

        {/* Paginación */}
         {!loading && (safePagination.totalPages || 0) > 1 && (
          <Pagination
            ccurrentPage={safePagination.currentPage || 1}
            totalPages={safePagination.totalPages || 0}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Products;