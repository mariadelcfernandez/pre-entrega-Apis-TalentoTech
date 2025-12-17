// src/components/ProductList.jsx
import { memo, useState } from 'react';
import { useProducts } from '../contexts/ProductsContext';
import { useAuth } from '../contexts/AuthContext';
import ProductCard from '../components/ProductCard'; 
import LoadingSpinner from './ui/LoadingSpinner';
import Pagination from './Pagination';
import styled from 'styled-components';
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  color: #333;
  font-weight: 700;
  margin: 0;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ViewButton = styled.button`
  padding: 0.5rem;
  border: 1px solid #ddd;
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: #667eea;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  &.list-view {
    grid-template-columns: 1fr;
    
    & > div {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }
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

const ProductList = memo(() => {
  const { 
    filteredProducts, 
    loading, 
    error, 
    totalItems,
    pagination,
    setFilters,
    filters
  } = useProducts();
  
  const { isAdmin } = useAuth();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'

  const handleSortChange = (e) => {
    setFilters(prev => ({
      ...prev,
      sortBy: e.target.value,
      page: 1 // Resetear a primera página
    }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({
      ...prev,
      page
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && !filteredProducts.length) {
    return (
      <Container>
        <LoadingSpinner message="Cargando productos..." />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
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
      </Container>
    );
  }

  if (!filteredProducts.length) {
    return (
      <Container>
        <EmptyState>
          <h3>No hay productos disponibles</h3>
          <p>No encontramos productos que coincidan con tu búsqueda</p>
          <button 
            className="btn btn-light"
            onClick={() => {
              setFilters(prev => ({
                ...prev,
                search: '',
                category: '',
                minPrice: '',
                maxPrice: ''
              }));
            }}
          >
            Limpiar filtros
          </button>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>
          Productos 
          <span className="badge bg-primary ms-2">{totalItems}</span>
        </Title>
        
        <Controls>
          <div className="d-flex align-items-center gap-2">
            <FaFilter />
            <SortSelect value={filters.sortBy} onChange={handleSortChange}>
              <option value="newest">Más recientes</option>
              <option value="price_asc">
                <FaSortAmountDown /> Precio: Menor a Mayor
              </option>
              <option value="price_desc">
                <FaSortAmountUp /> Precio: Mayor a Menor
              </option>
              <option value="rating">Mejor valorados</option>
            </SortSelect>
          </div>
          
          <ViewToggle>
            <ViewButton 
              active={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
              title="Vista de cuadrícula"
            >
              ▦
            </ViewButton>
            <ViewButton 
              active={viewMode === 'list'}
              onClick={() => setViewMode('list')}
              title="Vista de lista"
            >
              ≡
            </ViewButton>
          </ViewToggle>
        </Controls>
      </Header>
      
      <Grid className={viewMode === 'list' ? 'list-view' : ''}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode={viewMode}
            showAdminControls={isAdmin()}
          />
        ))}
      </Grid>
      
      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          totalItems={totalItems}
          itemsPerPage={pagination.limit}
        />
      )}
    </Container>
  );
});

ProductList.displayName = 'ProductList';
export { ProductList };

export default ProductList;