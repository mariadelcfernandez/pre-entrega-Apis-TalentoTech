// src/hooks/useCategories.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const CATEGORY_URLS = [
  'http://localhost:3001/categories', // Local primero
  'https://api.escuelajs.co/api/v1/categories' // Externa de respaldo
];

// Categorías por defecto para productos informáticos
const defaultCategories = [
  { id: 1, name: 'laptops', displayName: 'Laptops' },
  { id: 2, name: 'perifericos', displayName: 'Periféricos' },
  { id: 3, name: 'monitores', displayName: 'Monitores' },
  { id: 4, name: 'componentes', displayName: 'Componentes' },
  { id: 5, name: 'almacenamiento', displayName: 'Almacenamiento' },
  { id: 6, name: 'redes', displayName: 'Redes' }
];

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        
        // Aquí tu lógica para obtener categorías
        // Ejemplo con fetch:
        // const response = await fetch('/api/categories');
        // const data = await response.json();
        // setCategories(data);
        
        // Por ahora usamos datos mock
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
        const mockCategories = category.map((category) => ({
          id: category.id,
          name: category.name,
          displayName: category.displayName
        }));
        
        setCategories(mockCategories);
        setError(null);
      } catch (err) {
        setError('Error al cargar categorías');
        console.error('Error in useCategories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;


 /* useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      let lastError = null;

      // Intentar con cada fuente en orden
      for (let i = 0; i < CATEGORY_URLS.length; i++) {
        try {
          console.log(`🔄 Cargando categorías desde: ${CATEGORY_URLS[i]}`);
          
          const response = await axios.get(CATEGORY_URLS[i], { timeout: 3000 });
          let categories = response.data || [];
          
          // Adaptar categorías si vienen de API externa
          if (i === 1) { // API externa
            categoriesData = categories.map((category, index) => (
              
               <option key={category.id || `category-${index}`} value={category.name}>
                 {category.displayName || category.name}
               </option>
            ));
          } else {
            categoriesData = categories;
          }
        
         
          if (categoriesData.length > 0) {
            console.log(`✅ Categorías cargadas: ${categoriesData.length}`);
            setCategories(categoriesData);
            setError(null);
            setLoading(false);
            return;
          }
          
        } catch (err) {
          lastError = err;
          console.warn(`❌ Falló fuente de categorías ${i + 1}:`, err.message);
        }
      }

      // Si todas fallan, usar categorías por defecto
      console.log('🔄 Usando categorías por defecto...');
      setCategories(defaultCategories);
      setError('Usando categorías predefinidas');
      setLoading(false);
    };*/
