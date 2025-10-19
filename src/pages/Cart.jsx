// src/pages/Cart.jsx
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CartItem = styled.div`
  border-radius: 10px;
  transition: all 0.3s;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const QuantityButton = styled.button`
  width: 35px;
  height: 35px;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background: #e9ecef;
  }
`;

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Simular proceso de checkout
    alert('¡Compra realizada con éxito!');
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="container text-center py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2>Tu carrito está vacío</h2>
            <p className="text-muted mb-4">
              Explora nuestros productos y agrega algunos items a tu carrito.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/products')}
            >
              Ver Productos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Tu Carrito de Compras</h2>
      
      <div className="row">
        <div className="col-lg-8">
          {cartItems.map(item => (
            <CartItem key={item.id} className="card mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="img-fluid rounded"
                      style={{ height: '80px', objectFit: 'contain' }}
                    />
                  </div>
                  <div className="col-md-4">
                    <h6 className="mb-0">{item.title}</h6>
                  </div>
                  <div className="col-md-2">
                    <span className="h6 text-primary">${item.price}</span>
                  </div>
                  <div className="col-md-2">
                    <div className="d-flex align-items-center">
                      <QuantityButton
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </QuantityButton>
                      <span className="mx-3">{item.quantity}</span>
                      <QuantityButton
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </QuantityButton>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </CartItem>
          ))}
        </div>
        
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Resumen del Pedido</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Envío:</span>
                <span>Gratis</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong>${getCartTotal().toFixed(2)}</strong>
              </div>
              
              <button 
                className="btn btn-primary w-100 mb-2"
                onClick={handleCheckout}
              >
                {user ? 'Proceder al Pago' : 'Iniciar Sesión para Comprar'}
              </button>
              
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={clearCart}
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;