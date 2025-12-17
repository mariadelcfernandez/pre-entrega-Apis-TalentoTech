// src/components/ProductCard.jsx
import { useState } from 'react';
import {  useAuth } from '../contexts/AuthContext';
import { useCart} from '../contexts/CartContext';
//import { toast } from 'react-toastify';
import { FaShoppingCart, FaEye, FaEdit, FaTrash, FaStar } from 'react-icons/fa';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
  import { toast } from 'react-toastify';

const Card = styled.div`
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${props => props.type === 'new' ? '#28a745' : '#dc3545'};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: bold;
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h5`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 1rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #ffc107;
`;

const StockInfo = styled.div`
  font-size: 0.875rem;
  color: ${props => props.inStock ? '#28a745' : '#dc3545'};
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover {
      opacity: 0.9;
    }
  }
  
  &.btn-secondary {
    background: #f8f9fa;
    color: #333;
    border: 1px solid #dee2e6;
    
    &:hover {
      background: #e9ecef;
    }
  }
  
  &.btn-danger {
    background: #dc3545;
    color: white;
    
    &:hover {
      background: #c82333;
    }
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ProductCard = ({ product, onEdit, onDelete }) => {
  const { addToCart, getItemQuantity } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para agregar al carrito');
      return;
    }
    
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  const cartQuantity = getItemQuantity(product.id);

  return (
    <Card className="col-md-4 mb-4">
      <div className="card h-100">
        <ImageContainer>
          <ProductImage 
            src={product.image || `https://picsum.photos/seed/${product.id}/400/300`} 
            alt={product.name}
            onError={(e) => {
              e.target.src = `https://picsum.photos/seed/${product.id}/400/300`;
            }}
          />
          {product.isNew && <Badge type="new">NUEVO</Badge>}
          {product.stock <= 5 && product.stock > 0 && (
            <Badge type="stock">ÚLTIMAS {product.stock} UNIDADES</Badge>
          )}
        </ImageContainer>
        
        <CardBody>
          <ProductTitle>{product.name}</ProductTitle>
          
          <ProductDescription>{product.description}</ProductDescription>
          
          <Rating>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color={i < (product.rating || 4) ? '#ffc107' : '#e4e5e9'} />
            ))}
            <span className="ms-2">({product.reviews || 0})</span>
          </Rating>
          
          <Price>${product.price.toFixed(2)}</Price>
          
          <StockInfo inStock={product.stock > 0}>
            {product.stock > 0 ? `✅ ${product.stock} en stock` : '❌ Agotado'}
          </StockInfo>
          
          <ButtonGroup>
            <Link to={`/producto/${product.id}`} className="btn btn-outline-primary flex-grow-1">
              <FaEye /> Ver
            </Link>
            
            <Button 
              className="btn-primary"
              onClick={handleAddToCart}
              disabled={product.stock <= 0 || isAdding}
            >
              <FaShoppingCart /> 
              {cartQuantity > 0 ? `(${cartQuantity}) ` : ''}
              {isAdding ? 'Agregando...' : 'Agregar'}
            </Button>
            
            {isAdmin() && (
              <>
                <Button 
                  className="btn-secondary"
                  onClick={() => onEdit(product)}
                >
                  <FaEdit /> Editar
                </Button>
                
                <Button 
                  className="btn-danger"
                  onClick={() => onDelete(product.id)}
                >
                  <FaTrash /> Eliminar
                </Button>
              </>
            )}
          </ButtonGroup>
        </CardBody>
      </div>
    </Card>
  );
};

export default ProductCard;