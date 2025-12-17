// src/pages/admin/AdminProducts.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useProducts } from '../../contexts/ProductsContext';
import { useAuth } from '../../contexts/AuthContext';
import ProductList from '../../components/ProductList';
import ProductForm from '../../components/forms/ProductForm';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';
import styled from 'styled-components';
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  h1 {
    color: #333;
    font-weight: 700;
    margin: 0;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  width: 300px;
  
  input {
    border: none;
    outline: none;
    padding: 0.5rem;
    width: 100%;
  }
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 1rem;
`;

const AdminProducts = () => {
  const { 
    products, 
    deleteProduct, 
    createProduct, 
    updateProduct,
    filters,
    setFilters
  } = useProducts();
  
  const { isAdmin } = useAuth();
  
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isAdmin()) {
    return (
      <Container>
        <div className="text-center py-5">
          <h2 className="text-danger">Acceso Denegado</h2>
          <p>No tienes permisos para acceder a esta sección.</p>
        </div>
      </Container>
    );
  }

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (productId) => {
    setProductToDelete(productId);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete);
      setShowDeleteDialog(false);
      setProductToDelete(null);
    }
  };

  const handleSubmit = async (productData) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
    } else {
      await createProduct(productData);
    }
    
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilters(prev => ({
      ...prev,
      search: value,
      page: 1
    }));
  };

  const categories = [...new Set(products.map(p => p.category))]
    .map(cat => ({ id: cat, name: cat, displayName: cat }));

  return (
    <>
      <Helmet>
        <title>Gestión de Productos | Admin Panel</title>
      </Helmet>
      
      <Container>
        <Header>
          <h1>Gestión de Productos</h1>
          
          <Controls>
            <SearchBar>
              <FaSearch color="#666" />
              <input 
                type="text" 
                placeholder="Buscar productos..." 
                value={searchTerm}
                onChange={handleSearch}
              />
            </SearchBar>
            
            <AddButton onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}>
              <FaPlus />
              Nuevo Producto
            </AddButton>
          </Controls>
        </Header>
        
        <ProductList showAdminControls={true} />
      </Container>

      {showForm && (
        <ModalOverlay>
          <div style={{ maxWidth: '800px', width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
            <ProductForm
              product={editingProduct}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
              categories={categories}
            />
          </div>
        </ModalOverlay>
      )}

      <ConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Producto"
        message="¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer."
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        type="danger"
      />
    </>
  );
};

export default AdminProducts;