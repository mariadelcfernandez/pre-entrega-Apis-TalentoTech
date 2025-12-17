// src/hooks/useProducts.js
import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

export const useProducts = (initialFilters = {}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1
  });
  
  const { isAuthenticated, isAdmin } = useAuth();

  // Cargar productos
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productService.getProducts(filters);
      
      setProducts(response.data);
      setFilteredProducts(response.data);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        totalPages: response.totalPages
      });
    } catch (err) {
      setError(err.message);
      toast.error('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Cargar productos al inicio y cuando cambian los filtros
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filtrar productos localmente
  const applyFilters = useCallback((productList, filterOptions) => {
    let filtered = [...productList];

    // Filtro por búsqueda
    if (filterOptions.search) {
      const searchTerm = filterOptions.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }

    // Filtro por categoría
    if (filterOptions.category) {
      filtered = filtered.filter(product => 
        product.category === filterOptions.category
      );
    }

    // Filtro por precio mínimo
    if (filterOptions.minPrice) {
      filtered = filtered.filter(product => 
        product.price >= parseFloat(filterOptions.minPrice)
      );
    }

    // Filtro por precio máximo
    if (filterOptions.maxPrice) {
      filtered = filtered.filter(product => 
        product.price <= parseFloat(filterOptions.maxPrice)
      );
    }

    // Filtro por stock
    if (filterOptions.inStock !== undefined) {
      filtered = filtered.filter(product => 
        filterOptions.inStock ? product.stock > 0 : true
      );
    }

    // Ordenamiento
    if (filterOptions.sortBy) {
      switch (filterOptions.sortBy) {
        case 'price_asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'rating':
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        default:
          break;
      }
    }

    return filtered;
  }, []);

  // Actualizar filtros
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1 // Resetear a página 1 al cambiar filtros
    }));
  }, []);

  // Resetear filtros
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // CRUD Operations
  const createProduct = async (productData) => {
    if (!isAuthenticated || !isAdmin()) {
      toast.error('No tienes permisos para crear productos');
      return null;
    }

    try {
      setLoading(true);
      const newProduct = await productService.createProduct(productData);
      
      setProducts(prev => [newProduct, ...prev]);
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
      
      setProducts(prev => 
        prev.map(product => product.id === id ? updatedProduct : product)
      );
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
      
      setProducts(prev => prev.filter(product => product.id !== id));
      toast.success('Producto eliminado exitosamente');
      return true;
    } catch (err) {
      toast.error('Error al eliminar producto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Agregar al carrito
  const addToCart = useCallback((product, quantity = 1) => {
    // Esta función se integrará con CartContext
    toast.success(`${product.name} agregado al carrito`);
  }, []);

  // Obtener producto por ID
  const getProductById = useCallback((id) => {
    return products.find(product => product.id === id);
  }, [products]);

  // Obtener productos por categoría
  const getProductsByCategory = useCallback((category) => {
    return products.filter(product => product.category === category);
  }, [products]);

  // Cambiar página
  const changePage = useCallback((page) => {
    setFilters(prev => ({ ...prev, page }));
  }, []);

  return {
    // Estado
    products,
    filteredProducts,
    loading,
    error,
    filters,
    pagination,
    
    // Acciones
    fetchProducts,
    updateFilters,
    resetFilters,
    createProduct,
    updateProduct,
    deleteProduct,
    addToCart,
    getProductById,
    getProductsByCategory,
    changePage,
    
    // Utilidades
    hasProducts: products.length > 0,
    totalProducts: products.length,
    totalFilteredProducts: filteredProducts.length
  };
};

export default useProducts;