// src/components/AdvancedFilters.jsx
import { useState, useEffect } from 'react';
import useCategories from '../hooks/useCategories';

import styled from 'styled-components';

const FilterSection = styled.div`
  margin-bottom: 1rem;
`;

const FilterTitle = styled.h5`
  color: #3498db;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #bdc3c7;
`;

const FilterInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 0.5rem;
`;

const FilterButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #2980b9;
  }
`;
const AdvancedFilters = ({ filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const { categories, loading: categoriesLoading } = useCategories();

  const sortOptions = [
    { value: 'newest', label: 'Más recientes' },
    { value: 'price_asc', label: 'Precio: Menor a Mayor' },
    { value: 'price_desc', label: 'Precio: Mayor a Menor' },
    {/*{ value: 'rating', label: 'Mejor valorados' } */}
  ];

  // Sincronizar cuando cambien los filters desde fuera
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value, page: 1 };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '', category: '', minPrice: '', maxPrice: '', 
      sortBy: 'newest', inStock: false, page: 1
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">🔍 Filtros Avanzados</h5>
          <button className="btn btn-outline-danger btn-sm" onClick={clearFilters}>
            Limpiar Filtros
          </button>
        </div>

        <div className="row g-3">
          {/* Búsqueda */}
          <div className="col-md-4">
            <label className="form-label fw-semibold">Buscar productos</label>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre, descripción..."
              value={localFilters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          {/* Categoría */}
         <div className="col-md-3">
  <FilterSection>
    <label className="form-label fw-semibold">Categoría</label>
    <select
      className="form-select"
      value={localFilters.category || ''}
      onChange={(e) => handleFilterChange('category', e.target.value)}
      disabled={categoriesLoading}
    >
      <option value="" disabled>Todas las categorías</option>
      {categories.map(category => (
        <option  key={category.id} value={category.name}>
          {category.displayName || category.name}
        </option>
      ))}
    </select>
    {categoriesLoading && (
      <small className="text-muted">Cargando categorías...</small>
    )}
    {categories.Error && (
                <small className="text-warning">
                  <i className="fas fa-exclamation-triangle me-1"></i>
                  {categories.Error}
      </small>
    )}
  </FilterSection>
</div>
        

          {/* Precio Mínimo */}
          <div className="col-md-2">
            <label className="form-label fw-semibold">Precio Mín</label>
            <input
              type="number"
              className="form-control"
              placeholder="Mín"
              value={localFilters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
          </div>

          {/* Precio Máximo */}
          <div className="col-md-2">
            <label className="form-label fw-semibold">Precio Máx</label>
            <input
              type="number"
              className="form-control"
              placeholder="Máx"
              value={localFilters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>

          {/* Ordenar */}
          <div className="col-md-3">
            <label className="form-label fw-semibold">Ordenar por</label>
            <select
              className="form-select"
              value={localFilters.sortBy || 'newest'}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Checkbox Stock */}
          <div className="col-md-3">
            <div className="form-check mt-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="inStock"
                checked={localFilters.inStock || false}
                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
              />
              <label className="form-check-label" htmlFor="inStock">
                📦 Solo productos en stock
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;