// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';



const API_BASE_URL = 'https://68e454e98e116898997b92ab.mockapi.io/api/v1/products'; // Cambia la URL si es necesario/68e454e98e116898997b92ab.mockapi.io/api/v1/products'; // Cambia el puerto si es necesario

// Datos mockeados como respaldo en caso de que json-server no esté funcionando
const mokeadosproducts = [
  {
    id: 1,
    name: 'Laptop Gamer',
    price: 1200,
    category: 'laptops',
    description: 'Laptop para gaming con tarjeta gráfica dedicada',
    Avatar: 'https://via.placeholder.com/300x300/007ACC/FFFFFF?text=Laptop+Gamer',
    specs: {
      processor: 'Intel i7',
      ram: '16GB DDR4',
      storage: '512GB SSD'
    },
    inStock: true,
    rating:{
        "rate": 4.5,
        "count": 150
    }
  },
 
  {
    id: 2,
    name: 'Teclado Mecánico',
    price: 80,
    category: 'peripherals',
    description: 'Teclado mecánico con switches azules',
    image: 'https://via.placeholder.com/300x300/34A853/FFFFFF?text=Teclado+Mecánico',
    specs: {
      type: 'Mecánico',
      connectivity: 'USB-C',
       backlight: 'RGB'
    },
    inStock: true,
    rating: { 
        "rate": 4.2,
        "count": 120
    }
  },
    {
      id: 3,
      name: 'Monitor Gamer',
      price: 600,
      category: 'monitors',
      description: 'Monitor para gaming con pantalla de 144Hz',
      image: 'https://via.placeholder.com/300x300/FF6F00/FFFFFF?text=Monitor+Gamer',
      specs: {
        resolution: '1920x1080',
        refreshRate: '144Hz',
        size: '27 pulgadas'
      },
      inStock: false,
      rating:  {
        "rate": 4.7,
        "count": 150
      }
    }
];

const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
    totalPages: 0,
    currentPage: 1,
    total: 0
  }); // Inicializar con valores por defecto

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Intenta con json-server primero
        // Intenta con json-server local primero
        //Parametros de filtro
        const params = {};
        if (filters.category) params.category = filters.category;
        if (filters.search) params.q = filters.search;
       //Parametros para mockear
        if (filters.minPrice) params.price_gte = Number(filters.minPrice);
        if (filters.maxPrice) params.price_lte = Number(filters.maxPrice);
        if (filters.inStock) params.inStock = true;
        if (filters.sortBy) params.sortBy = filters.sortBy;
        if (filters.page) params.page = filters.page;
        if (filters.limit) params.limit = filters.limit;
  
        const response = await axios.get(`${API_BASE_URL}/products`, { 
          params,
          timeout: 5000
        });
        
        let productsData = response.data || [];
         // Si la API devuelve productos, los mapeamos para asegurar la estructura
        productsData = productsData.map(product => ({
          ...product,
          // Aseguramos que el rating sea un objeto con rate y count
         /* rating: product.rating ? { rate: product.rating.rate, count: product.rating.count } : { rate: 0, count: 0 }*/
        }));
       
              
        setProducts(productsData);
        setPagination({
          totalPages: Math.ceil(productsData.length / (filters.limit || 12)),
          currentPage: filters.page || 1,
          total: productsData.length
        });
     
      } catch (Error) {
        console.error('❌ Error con json-server:', Error);
        console.log('🔄 Usando datos mockeados...');
        
        // Filtrado de productos usando datos mockeados
        
        const filteredProducts = [...mokeadosproducts]; // Tu lógica de filtrado aquí
        
          // Filtrar por categoría
        if (filters.category) {
          filteredProducts = filteredProducts.filter(p => p.category === filters.category); 
        }
         // Filtrar por búsqueda en nombre y descripción
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower)
          );
        }
        
        // Filtrar por precio
         
        // Filtrar por precio mínimo
        if (filters.minPrice) {
          filteredProducts = filteredProducts.filter(product => 
            product.price >= Number(filters.minPrice)
          );
        }
        // Filtrar por precio máximo
        if (filters.maxPrice) {
          filteredProducts = filteredProducts.filter(product => 
            product.price <= Number(filters.maxPrice)
          );
        }
        // Filtrar por stock
        if (filters.inStock) {
          filteredProducts = filteredProducts.filter(product => product.inStock);
        }

           // Ordenar (solo por precio y nombre para los mockeados)
        if (filters.sortBy) {
          switch (filters.sortBy) {
            case 'price_asc':
              filteredProducts.sort((a, b) => a.price - b.price);
              break;
            case 'price_desc':
              filteredProducts.sort((a, b) => b.price - a.price);
              break;
            case 'name_asc':
              filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
              break;
            {/*  case 'rating':
              filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
              break;*/}
            default:
              // Por defecto, más recientes (no hay fecha, dejamos como están)
              break;
          }
        }
        
        setProducts(filteredProducts);
        setPagination({
          totalPages: Math.ceil(filteredProducts.length / (filters.limit || 12)),
          currentPage: filters.page || 1,
          total: filteredProducts.length
        });
        setError('Usando datos de demostración - Servidor local no disponible');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]); // Nota: Depende de filters si quiere refetch cuando cambien

  return { products, loading, error, pagination };
};

export default useProducts;