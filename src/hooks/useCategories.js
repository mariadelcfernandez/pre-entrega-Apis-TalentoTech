// src/hooks/useCategories.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://68e454e98e116898997b92ab.mockapi.io/api/v1/products'; // Cambia la URL si es necesario/API_BASE_URL = 'https://68e454e98e116898997b92ab.mockapi.io/api/v1/categories';
// Categorías por defecto para productos informáticos
const category = [
  { id: 1, name: 'laptops', displayName: 'Laptops y Notebooks' },
  { id: 2, name: 'perifericos', displayName: 'Periféricos' },
  { id: 3, name: 'monitores', displayName: 'Monitores' },
  { id: 4, name: 'componentes', displayName: 'Componentes PC' },
  { id: 5, name: 'almacenamiento', displayName: 'Almacenamiento' },
  { id: 6, name: 'redes', displayName: 'Redes y Conectividad' },
  { id: 7, name: 'software', displayName: 'Software' },
  { id: 8, name: 'accesorios', displayName: 'Accesorios' }
];

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
          setError(null);
        console.log('🔄 Intentando cargar categorías desde:', `${API_BASE_URL}/categories`);
        const response = await axios.get(`${API_BASE_URL}/categories`, {
          timeout: 3000 // 3 segundos de timeout
        });
        
        console.log('✅ Categorías cargadas:', response.data);
        
        if (response.data && response.data.length > 0) {
          setCategories(response.data);
        } else {
          console.log('📝 No hay categorías en la API, usando categorías por defecto');
          setCategories(category);
        }       
     } catch (err) {
        console.error('❌ Error cargando categorías:', err.message);
        
        // Verificar el tipo de error
        if (err.code === 'ECONNREFUSED') {
          setError('No se puede conectar al servidor. Asegúrate de que json-server esté ejecutándose en el puerto 3001.');
        } else if (err.response && err.response.status === 404) {
          setError('No se encontró el endpoint de categorías. Usando categorías por defecto.');
        } else {
          setError(`Error: ${err.message}. Usando categorías por defecto.`);
        }
        
        console.log('🔄 Usando categorías por defecto...');
        setCategories(category);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;
