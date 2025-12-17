// src/pages/ProductDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../contexts/ProductsContext';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { 
  FaShoppingCart, 
  FaStar, 
  FaTruck, 
  FaShieldAlt, 
  FaUndo,
  FaShareAlt,
  FaHeart
} from 'react-icons/fa';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Container = styled.div`
  padding: 3rem 0;
`;

const ProductImages = styled.div`
  position: sticky;
  top: 20px;
  
  .main-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 1rem;
    cursor: zoom-in;
  }
  
  .thumbnails {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding: 0.5rem 0;
    
    img {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 5px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: border 0.3s;
      
      &.active {
        border-color: #667eea;
      }
      
      &:hover {
        border-color: #667eea;
      }
    }
  }
`;

const ProductInfo = styled.div`
  padding-left: 3rem;
  
  @media (max-width: 992px) {
    padding-left: 0;
    margin-top: 2rem;
  }
`;

const ProductTitle = styled.h1`
  color: #333;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #ffc107;
`;

const Reviews = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const Stock = styled.div`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  
  &.in-stock {
    background: #d4edda;
    color: #155724;
  }
  
  &.out-of-stock {
    background: #f8d7da;
    color: #721c24;
  }
`;

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 1.5rem;
`;

const OldPrice = styled.span`
  font-size: 1.5rem;
  color: #999;
  text-decoration: line-through;
  margin-right: 1rem;
`;

const Description = styled.div`
  color: #666;
  line-height: 1.8;
  margin-bottom: 2rem;
  white-space: pre-line;
`;

const Features = styled.div`
  margin-bottom: 2rem;
  
  .feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    color: #555;
    
    svg {
      color: #667eea;
    }
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  
  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    button {
      width: 40px;
      height: 40px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      
      &:hover {
        border-color: #667eea;
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    
    input {
      width: 60px;
      height: 40px;
      text-align: center;
      border: 1px solid #ddd;
      border-radius: 5px;
      
      &:focus {
        outline: none;
        border-color: #667eea;
      }
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  button {
    flex: 1;
    min-width: 200px;
    padding: 1rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s;
    
    &.btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      
      &:hover {
        opacity: 0.9;
        transform: translateY(-2px);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
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
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simular carga de producto
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const productData = getProductById(id) || {
          id,
          name: 'Producto Ejemplo',
          description: 'Este es un producto de ejemplo con descripción detallada. Incluye todas las características principales y especificaciones técnicas.\n\nCaracterísticas:\n• Alta calidad\n• Durabilidad garantizada\n• Diseño moderno\n• Fácil de usar',
          price: 299.99,
          oldPrice: 399.99,
          category: 'Electrónica',
          stock: 50,
          rating: 4.5,
          reviews: 128,
          images: [
            'https://picsum.photos/seed/product1/600/400',
            'https://picsum.photos/seed/product2/600/400',
            'https://picsum.photos/seed/product3/600/400',
            'https://picsum.photos/seed/product4/600/400'
          ],
          features: [
            'Garantía de 2 años',
            'Envío gratis',
            'Devolución en 30 días',
            'Soporte 24/7'
          ],
          specifications: {
            'Peso': '1.5 kg',
            'Dimensiones': '20 x 30 x 10 cm',
            'Color': 'Negro',
            'Material': 'Plástico ABS'
          }
        };
        
        setProduct(productData);
      } catch (err) {
        setError('Error al cargar el producto');
        toast.error('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, getProductById]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para agregar al carrito');
      navigate('/login', { state: { from: `/producto/${id}` } });
      return;
    }

    if (product.stock <= 0) {
      toast.error('Producto agotado');
      return;
    }

    addToCart(product, quantity);
    toast.success(`${product.name} agregado al carrito`);
    setQuantity(1);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para comprar');
      navigate('/login', { state: { from: `/checkout` } });
      return;
    }

    if (product.stock <= 0) {
      toast.error('Producto agotado');
      return;
    }

    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > product.stock) {
      toast.warning(`Solo hay ${product.stock} unidades disponibles`);
      return;
    }
    setQuantity(newQuantity);
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner message="Cargando producto..." />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container>
        <div className="container text-center py-5">
          <h2 className="text-danger">Producto no encontrado</h2>
          <p className="lead">El producto que buscas no existe o ha sido eliminado.</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate('/productos')}
          >
            Volver al catálogo
          </button>
        </div>
      </Container>
    );
  }

  const images = product.images || [`https://picsum.photos/seed/${product.id}/600/400`];

  return (
    <>
      <Helmet>
        <title>{product.name} | Tienda Online</title>
        <meta name="description" content={product.description.substring(0, 160)} />
      </Helmet>

      <Container>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <ProductImages>
                <img 
                  src={images[selectedImage]} 
                  alt={product.name}
                  className="main-image"
                  onClick={() => window.open(images[selectedImage], '_blank')}
                />
                
                {images.length > 1 && (
                  <div className="thumbnails">
                    {images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${product.name} - Vista ${index + 1}`}
                        className={index === selectedImage ? 'active' : ''}
                        onClick={() => setSelectedImage(index)}
                      />
                    ))}
                  </div>
                )}
              </ProductImages>
            </div>
            
            <div className="col-lg-6">
              <ProductInfo>
                <ProductTitle>{product.name}</ProductTitle>
                
                <ProductMeta>
                  <Rating>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <span className="ms-1">{product.rating.toFixed(1)}</span>
                  </Rating>
                  
                  <Reviews>({product.reviews} reseñas)</Reviews>
                  
                  <Stock className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                    {product.stock > 0 ? `✅ ${product.stock} en stock` : '❌ Agotado'}
                  </Stock>
                  
                  <span className="text-muted">SKU: {product.id}</span>
                </ProductMeta>
                
                <Price>
                  {product.oldPrice && (
                    <OldPrice>${product.oldPrice.toFixed(2)}</OldPrice>
                  )}
                  ${product.price.toFixed(2)}
                </Price>
                
                <Description>{product.description}</Description>
                
                <Features>
                  <h5 className="mb-3">Características:</h5>
                  {product.features?.map((feature, index) => (
                    <div key={index} className="feature">
                      <FaStar size={14} />
                      {feature}
                    </div>
                  ))}
                </Features>
                
                {product.specifications && (
                  <div className="mb-4">
                    <h5 className="mb-3">Especificaciones:</h5>
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <tbody>
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <tr key={key}>
                              <th style={{ width: '40%' }}>{key}</th>
                              <td>{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {product.stock > 0 && (
                  <>
                    <QuantitySelector>
                      <label className="fw-semibold">Cantidad:</label>
                      <div className="quantity-controls">
                        <button 
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          value={quantity}
                          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                          min="1"
                          max={product.stock}
                        />
                        <button 
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={quantity >= product.stock}
                        >
                          +
                        </button>
                      </div>
                      <span className="text-muted">
                        Máximo: {product.stock} unidades
                      </span>
                    </QuantitySelector>
                    
                    <ActionButtons>
                      <button 
                        className="btn-primary"
                        onClick={handleAddToCart}
                      >
                        <FaShoppingCart />
                        Agregar al Carrito
                      </button>
                      
                      <button 
                        className="btn-secondary"
                        onClick={handleBuyNow}
                      >
                        Comprar Ahora
                      </button>
                    </ActionButtons>
                  </>
                )}
                
                <div className="mt-4 d-flex gap-2">
                  <button className="btn btn-outline-secondary">
                    <FaHeart className="me-2" />
                    Agregar a Favoritos
                  </button>
                  <button className="btn btn-outline-secondary">
                    <FaShareAlt className="me-2" />
                    Compartir
                  </button>
                </div>
                
                <div className="mt-4 pt-4 border-top">
                  <div className="row">
                    <div className="col-md-4 text-center">
                      <FaTruck size={24} className="text-primary mb-2" />
                      <div className="small">
                        <strong>Envío gratis</strong>
                        <p className="text-muted mb-0">En compras +$100</p>
                      </div>
                    </div>
                    <div className="col-md-4 text-center">
                      <FaShieldAlt size={24} className="text-primary mb-2" />
                      <div className="small">
                        <strong>Garantía</strong>
                        <p className="text-muted mb-0">2 años incluidos</p>
                      </div>
                    </div>
                    <div className="col-md-4 text-center">
                      <FaUndo size={24} className="text-primary mb-2" />
                      <div className="small">
                        <strong>Devoluciones</strong>
                        <p className="text-muted mb-0">30 días sin costo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ProductInfo>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductDetail;