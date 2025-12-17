// src/pages/Cart.jsx
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { 
  FaShoppingCart, 
  FaTrash, 
  FaPlus, 
  FaMinus, 
  FaArrowRight,
  FaCreditCard,
  FaTruck
} from 'react-icons/fa';
import ConfirmationDialog from '../components/ui/ConfirmationDialog';

const Container = styled.div`
  padding: 2rem 0;
  min-height: 60vh;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  transition: background 0.3s;
  
  &:hover {
    background: #f8f9fa;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ItemImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 1.5rem;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  
  h5 {
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
`;

const Price = styled.div`
  font-weight: 600;
  color: #667eea;
  font-size: 1.2rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const QuantityButton = styled.button`
  width: 35px;
  height: 35px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    border-color: #667eea;
    background: #f8f9fa;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 5px;
  transition: background 0.3s;
  
  &:hover {
    background: rgba(220, 53, 69, 0.1);
  }
`;

const Summary = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  height: fit-content;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #dee2e6;
  
  &.total {
    font-size: 1.2rem;
    font-weight: 600;
    border-bottom: none;
    margin-bottom: 1.5rem;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  
  h3 {
    color: #333;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    margin-bottom: 2rem;
  }
`;

const Cart = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showClearDialog, setShowClearDialog] = useState(false);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para proceder al pago');
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Tu carrito está vacío');
      return;
    }

    navigate('/checkout');
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearDialog(false);
    toast.success('Carrito vaciado');
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Carrito de Compras | Tienda Online</title>
        </Helmet>
        
        <Container>
          <div className="container">
            <EmptyCart>
              <FaShoppingCart size={80} color="#667eea" className="mb-3" />
              <h3>Tu carrito está vacío</h3>
              <p>Parece que no has agregado ningún producto a tu carrito</p>
              <div className="d-flex gap-3 justify-content-center">
                <Link to="/productos" className="btn btn-primary">
                  <FaArrowRight className="me-2" />
                  Explorar Productos
                </Link>
                <Link to="/ofertas" className="btn btn-outline-primary">
                  Ver Ofertas
                </Link>
              </div>
            </EmptyCart>
          </div>
        </Container>
      </>
    );
  }

  const subtotal = cartTotal;
  const shipping = cartTotal > 100 ? 0 : 9.99;
  const tax = cartTotal * 0.16; // 16% de IVA
  const total = subtotal + shipping + tax;

  return (
    <>
      <Helmet>
        <title>Carrito de Compras | Tienda Online</title>
      </Helmet>

      <Container>
        <div className="container">
          <h1 className="mb-4">
            <FaShoppingCart className="me-2" />
            Carrito de Compras
            <span className="badge bg-primary ms-2">{cartItems.length}</span>
          </h1>
          
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body p-0">
                  {cartItems.map(item => (
                    <CartItem key={item.id}>
                      <ItemImage 
                        src={item.image || `https://picsum.photos/seed/${item.id}/300/200`} 
                        alt={item.name} 
                      />
                      
                      <ItemInfo>
                        <h5>{item.name}</h5>
                        <p className="text-muted">
                          {item.description?.substring(0, 100)}...
                        </p>
                        
                        <div className="d-flex justify-content-between align-items-center">
                          <Price>${item.price.toFixed(2)}</Price>
                          
                          <QuantityControls>
                            <QuantityButton 
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <FaMinus />
                            </QuantityButton>
                            
                            <span className="mx-2" style={{ minWidth: '30px', textAlign: 'center' }}>
                              {item.quantity}
                            </span>
                            
                            <QuantityButton 
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              disabled={item.quantity >= 10}
                            >
                              <FaPlus />
                            </QuantityButton>
                          </QuantityControls>
                          
                          <div className="text-end">
                            <div className="fw-bold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <RemoveButton 
                              onClick={() => removeFromCart(item.id)}
                              title="Eliminar del carrito"
                            >
                              <FaTrash />
                            </RemoveButton>
                          </div>
                        </div>
                      </ItemInfo>
                    </CartItem>
                  ))}
                </div>
                
                <div className="card-footer d-flex justify-content-between">
                  <button 
                    className="btn btn-outline-danger"
                    onClick={() => setShowClearDialog(true)}
                  >
                    <FaTrash className="me-2" />
                    Vaciar Carrito
                  </button>
                  
                  <Link to="/productos" className="btn btn-outline-primary">
                    Seguir Comprando
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4 mt-4 mt-lg-0">
              <Summary>
                <h4 className="mb-4">Resumen del Pedido</h4>
                
                <SummaryRow>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </SummaryRow>
                
                <SummaryRow>
                  <span>Envío</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-success">Gratis</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </SummaryRow>
                
                <SummaryRow>
                  <span>Impuestos (16%)</span>
                  <span>${tax.toFixed(2)}</span>
                </SummaryRow>
                
                <SummaryRow className="total">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </SummaryRow>
                
                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-primary btn-lg"
                    onClick={handleCheckout}
                  >
                    <FaCreditCard className="me-2" />
                    Proceder al Pago
                  </button>
                  
                  <div className="alert alert-success mt-3" role="alert">
                    <FaTruck className="me-2" />
                    <strong>¡Envío gratis!</strong> en compras mayores a $100
                  </div>
                </div>
              </Summary>
              
              <div className="mt-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <h6 className="card-title">Código de descuento</h6>
                    <div className="input-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Ingresa código" 
                      />
                      <button className="btn btn-outline-secondary" type="button">
                        Aplicar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <ConfirmationDialog
        isOpen={showClearDialog}
        onClose={() => setShowClearDialog(false)}
        onConfirm={handleClearCart}
        title="Vaciar carrito"
        message="¿Estás seguro de que deseas vaciar todo el carrito? Esta acción no se puede deshacer."
        confirmText="Sí, vaciar carrito"
        cancelText="Cancelar"
        type="danger"
      />
    </>
  );
};

export default Cart;