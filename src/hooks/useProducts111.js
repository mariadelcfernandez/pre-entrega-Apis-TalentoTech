
// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import axios from 'axios';

// URLs de APIs - la primera es la principal, si falla usa la local
const API_URLS = [
  
  //'http://localhost:5000/api/products', // Nuestro backend MongoDB
  
  'http://localhost:3001/products', // API local de respaldo
  'https://api.escuelajs.co/api/v1/products' // API externa de ejemplo
];

// Datos mockeados como último recurso
const mockProducts = [
  {
    id: 1,
    name: "Laptop Gaming ASUS ROG",
    price: 1599.99,
    category: "laptops",
    description: "Laptop para gaming con RTX 4070, 32GB RAM, 1TB SSD",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=300&fit=crop",
    specs: {
      "Procesador": "Intel i9-13900H",
      "RAM": "32GB DDR5",
      "Almacenamiento": "1TB SSD NVMe",
      "GPU": "RTX 4070 8GB"
    },
    inStock: true,
    brand: "ASUS",
    rating: 4.8
  },
  {
    id: 2,
    name: "MacBook Pro 16\" M2",
    price: 2499.99,
    category: "laptops",
    description: "Laptop profesional Apple con chip M2, 16GB RAM, 512GB SSD",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    specs: {
      "Procesador": "Apple M2",
      "RAM": "16GB Unified",
      "Almacenamiento": "512GB SSD",
      "Pantalla": "16.2\" Retina"
    },
    inStock: true,
    brand: "Apple",
    rating: 4.9
  },
  {
    id: 3,
    name: "Teclado Mecánico Gaming",
    price: 129.99,
    category: "perifericos",
    description: "Teclado mecánico RGB con switches azules",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
    specs: {
      "Tipo": "Mecánico",
      "Switches": "Blue",
      "Retroiluminación": "RGB",
      "Conectividad": "USB"
    },
    inStock: true,
    brand: "Redragon",
    rating: 4.5
  }
];

// Función para adaptar productos de API externa a nuestra estructura
const adaptProduct = (product, source) => {
  if (source === 'local' || source === 'mock') {
    return product; // Ya está en nuestro formato
  }

  // Adaptar producto de API externa
  return {
    id: product.id,
    name: product.title || product.name,
    price: product.price || 0,
    category: product.category?.name || 'electronics',
    description: product.description || 'Producto de tecnología',
    image: product.images?.[0] || product.image || `https://via.placeholder.com/300x200/667eea/ffffff?text=Tech+${product.id}`,
    specs: {
      "Categoría": product.category?.name || 'Electrónica',
      "Disponible": "En stock"
    },
    inStock: true,
    brand: product.category?.name || 'Tech',
    rating: product.rating || 4.0
  };
};

const useProducts = (filters = {}) => {
  const [allProducts, setAllProducts] = useState([]);
    // Productos de la página actual
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('');
  

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let lastError = null;

      for (let i = 0; i < API_URLS.length; i++) {
        try {
          console.log(`🔄 Intentando con API: ${API_URLS[i]}`);
          
          const params = {};
          if (filters.category) params.category = filters.category;
          if (filters.search) params.search = filters.search;
          if (filters.minPrice) params.minPrice = filters.minPrice;
          if (filters.maxPrice) params.maxPrice = filters.maxPrice;
          if (filters.inStock) params.inStock = filters.inStock;

          const response = await axios.get(API_URLS[i], { 
            params,
            timeout: 5000 
          });
          
          let productsData = response.data || [];
          
          // Limitar cantidad si es API externa
          if (i === 1 && productsData.length > 20) {
            productsData = productsData.slice(0, 20);
          }
          
          const source = i === 0 ? 'mongodb' : 'external';
          console.log(`✅ Productos cargados de ${source}:`, productsData.length);
          
          setAllProducts(productsData);
          setDataSource(source);
          setError(null);
          setLoading(false);
          return;

        } catch (err) {
          lastError = err;
          console.warn(`❌ Falló API ${i + 1}:`, err.message);
        }
      }

      console.log('🔄 Todas las APIs fallaron');
      setAllProducts([]);
      setDataSource('none');
      setError('No se pudieron cargar los productos. Intenta más tarde.');
      setLoading(false);
    };

    fetchProducts();
  }, [filters.category, filters.search]); // Solo recargar cuando cambien filtros importantes

      // Aplicar filtros y paginación
  const applyFiltersAndPagination = (products, filters) => {
    let filteredProducts = [...products];
   // Aplicar filtros locales (para APIs externas)
    if (dataSource !== 'mongodb') {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        (p.brand && p.brand.toLowerCase().includes(searchLower))
      );
    }

    if (filters.minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= Number(filters.maxPrice));
    }

    if (filters.inStock) {
      filteredProducts = filteredProducts.filter(p => p.inStock);
    }
  }
    // Ordenar
    if (filters.sortBy === 'price_asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price_desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      filteredProducts.sort((a, b) => b.rating - a.rating);
    }

 //   return filteredProducts;
 //  };

     // Aplicar paginación
    const itemsPerPage = filters.itemsPerPage || 8;
    const currentPage = filters.page || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      pagination: {
        currentPage,
        totalPages: Math.ceil(filteredProducts.length / itemsPerPage),
        totalProducts: filteredProducts.length,
        itemsPerPage
      }
    };
  };


  //const filteredProducts = applyFilters(products, filters);
  const { products, pagination } = applyFiltersAndPagination(allProducts, filters);

  return { 
    products, 
    loading, 
    error: error || (dataSource === 'mock' ? 'Usando datos de demostración' : null),
    dataSource,
    pagination 
  };
};

export default useProducts;