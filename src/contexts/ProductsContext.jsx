// src/contexts/ProductsContext.jsx
import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { productService } from '../services/productService';
import { useAuth } from '../contexts/AuthContext';

const ProductsContext = createContext({});

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductsProvider');
  }
  return context;
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'newest'
  });
  
  const { isAuthenticated, isAdmin } = useAuth();

  // Cargar productos al inicio
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtrar productos cuando cambia searchTerm o filters
  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productService.getProducts({
        ...filters,
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm
      });
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (err) {
      setError('Error al cargar productos');
      toast.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let result = [...products];

    // Filtrar por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      );
    }

    // Filtrar por categoría
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    // Filtrar por precio mínimo
    if (filters.minPrice) {
      result = result.filter(product => product.price >= parseFloat(filters.minPrice));
    }

    // Filtrar por precio máximo
    if (filters.maxPrice) {
      result = result.filter(product => product.price <= parseFloat(filters.maxPrice));
    }

    // Ordenar
    switch (filters.sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Resetear a primera página al filtrar
  };

  // CRUD Operations
  const createProduct = async (productData) => {
    if (!isAuthenticated || !isAdmin()) {
      toast.error('No tienes permisos para crear productos');
      return null;
    }

    try {
      setLoading(true);
      const newProduct = await productService.createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      toast.success('Producto creado exitosamente');
      return newProduct;
    } catch (err) {
      toast.error('Error al crear producto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, productData) => {
    if (!isAuthenticated || !isAdmin()) {
      toast.error('No tienes permisos para actualizar productos');
      return null;
    }

    try {
      setLoading(true);
      const updatedProduct = await productService.updateProduct(id, productData);
      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      toast.success('Producto actualizado exitosamente');
      return updatedProduct;
    } catch (err) {
      toast.error('Error al actualizar producto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!isAuthenticated || !isAdmin()) {
      toast.error('No tienes permisos para eliminar productos');
      return false;
    }

    try {
      setLoading(true);
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Producto eliminado exitosamente');
      return true;
    } catch (err) {
      toast.error('Error al eliminar producto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const value = {
    // Estado
    products,
    filteredProducts: currentItems,
    loading,
    error,
    currentPage,
    totalPages,
    itemsPerPage,
    searchTerm,
    filters,
    
    // Acciones
    setSearchTerm,
    setFilters,
    createProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
    paginate,
    nextPage,
    prevPage,
    
    // Utilidades
    totalItems: filteredProducts.length
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};