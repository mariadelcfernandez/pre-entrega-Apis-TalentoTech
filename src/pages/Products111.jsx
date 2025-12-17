// src/pages/Products.jsx
import { useState } from 'react';
import useProducts from '../hooks/useProducts111';
import ProductList from '../components/ProductList';
import AdvancedFilters from '../components/AdvancedFilters';

const Products = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'newest',
    inStock: false
  });

  const { products, loading, error, dataSource } = useProducts(filters);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h1>Productos de Tecnología</h1>
        <p className="lead">Encuentra los mejores productos informáticos</p>
      </div>

      <AdvancedFilters 
        filters={filters} 
        onFiltersChange={handleFiltersChange} 
      />

      <ProductList 
        products={products} 
        loading={loading} 
        error={error}
        dataSource={dataSource}
      />
    </div>
  );
};

export default Products;