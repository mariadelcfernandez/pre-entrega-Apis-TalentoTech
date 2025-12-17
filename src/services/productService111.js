// src/services/productService.js
import api from './api/axiosConfig';

// Configuración para diferentes backends
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';
// Servicio para desarrollo (Mock API)
const mockService = {
  async getProducts(filters = {}) {
    // Datos mock para desarrollo
    const mockProducts = Array.from({ length: 50 }, (_, i) => ({
      id: `prod_${i + 1}`,
      name: `Producto ${i + 1}`,
      description: `Descripción del producto ${i + 1}. Un producto increíble con características únicas.`,
      price: Math.random() * 1000 + 10,
      category: ['Electrónica', 'Ropa', 'Hogar', 'Deportes'][Math.floor(Math.random() * 4)],
      stock: Math.floor(Math.random() * 100),
      rating: Math.random() * 5,
      image: `https://picsum.photos/seed/${i}/400/300`,
      isNew: Math.random() > 0.7,
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
    }));
    
    // Aplicar filtros
    let filtered = [...mockProducts];
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= parseFloat(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseFloat(filters.maxPrice));
    }
    
    // Ordenamiento
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
      }
    }
    
    // Paginación
    const page = filters.page || 1;
    const limit = filters.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginated = filtered.slice(startIndex, endIndex);
    
    return {
      data: paginated,
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit)
    };
  },
  
  async getProduct(id) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      id,
      name: 'Producto Ejemplo',
      description: 'Descripción detallada del producto',
      price: 299.99,
      category: 'Electrónica',
      stock: 50,
      rating: 4.5,
      image: 'https://picsum.photos/seed/product/400/300',
      isNew: true,
      features: ['Característica 1', 'Característica 2', 'Característica 3'],
      specifications: {
        peso: '1.5kg',
        dimensiones: '20x30x10cm',
        color: 'Negro'
      }
    };
  },
  
  async createProduct(productData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      id: `prod_${Date.now()}`,
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  },
  
  async updateProduct(id, productData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      id,
      ...productData,
      updatedAt: new Date().toISOString()
    };
  },
  
  async deleteProduct(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, id };
  },
  
  async uploadImage(file) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simular URL de imagen subida
    return {
      url: `https://picsum.photos/seed/${Date.now()}/400/300`
    };
  },
  
  async getCategories() {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [
      { id: 'cat_1', name: 'Electrónica', displayName: 'Electrónica', productCount: 25 },
      { id: 'cat_2', name: 'Ropa', displayName: 'Ropa y Accesorios', productCount: 18 },
      { id: 'cat_3', name: 'Hogar', displayName: 'Hogar y Jardín', productCount: 32 },
      { id: 'cat_4', name: 'Deportes', displayName: 'Deportes y Aire Libre', productCount: 15 },
      { id: 'cat_5', name: 'Libros', displayName: 'Libros y Música', productCount: 42 }
    ];
  }
};
// Seleccionar servicio según configuración
const getService = () => {
  const backend = process.env.REACT_APP_BACKEND || 'mock';
  
  switch (backend) {
    case 'mongodb':
      return mongoDBService;
    case 'firebase':
      return firebaseService;
    case 'mock':
    default:
      return mockService;
  }
};

export const productService = getService();
export default productService;