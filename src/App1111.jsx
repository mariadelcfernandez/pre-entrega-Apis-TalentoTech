// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ProductsProvider } from './contexts/ProductsContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ToastNotification from './components/ui/ToastNotification';

// Routing
import { 
  PublicRoute, 
  ProtectedRoute, 
  AdminRoute,
  AuthMiddleware 
} from './components/routing/ProtectedRoute';

// Lazy loading de páginas
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Profile = lazy(() => import('./pages/Profile'));
const Orders = lazy(() => import('./pages/Orders'));
const Nosotros = lazy(() => import('./pages/Nosotros'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'));
const AdminCategories = lazy(() => import('./pages/admin/AdminCategories'));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

// Styles
import GlobalStyles from './styles/GlobalStyles';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container text-center py-5">
          <h1 className="text-danger">¡Algo salió mal!</h1>
          <p className="lead">Ha ocurrido un error inesperado en la aplicación.</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => window.location.reload()}
          >
            Recargar Página
          </button>
          <div className="mt-4 text-muted">
            <small>
              Si el problema persiste, por favor contacta al soporte técnico.
            </small>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <NotificationProvider>
          <AuthProvider>
            <ProductsProvider>
              <CartProvider>
                <ThemeProvider>
                  <Router>
                    <GlobalStyles />
                    <ToastNotification />
                    
                    <div className="d-flex flex-column min-vh-100">
                      <Navbar />
                      
                      <main className="flex-grow-1 py-4">
                        <Suspense fallback={<LoadingSpinner fullscreen />}>
                          <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={
                              <PublicRoute>
                                <Home />
                              </PublicRoute>
                            } />
                            
                            <Route path="/productos" element={
                              <PublicRoute>
                                <Products />
                              </PublicRoute>
                            } />
                            
                            <Route path="/producto/:id" element={
                              <PublicRoute>
                                <ProductDetail />
                              </PublicRoute>
                            } />
                            
                            <Route path="/nosotros" element={
                              <PublicRoute>
                                <Nosotros />
                              </PublicRoute>
                            } />
                            
                            <Route path="/contacto" element={
                              <PublicRoute>
                                <Contact />
                              </PublicRoute>
                            } />
                            
                            <Route path="/faq" element={
                              <PublicRoute>
                                <FAQ />
                              </PublicRoute>
                            } />
                            
                            <Route path="/terminos" element={
                              <PublicRoute>
                                <Terms />
                              </PublicRoute>
                            } />
                            
                            {/* Auth Routes */}
                            <Route path="/login" element={
                              <PublicRoute>
                                <Login />
                              </PublicRoute>
                            } />
                            
                            <Route path="/register" element={
                              <PublicRoute>
                                <Register />
                              </PublicRoute>
                            } />
                            
                            {/* Private Routes */}
                            <Route path="/carrito" element={
                              <ProtectedRoute>
                                <Cart />
                              </ProtectedRoute>
                            } />
                            
                            <Route path="/checkout" element={
                              <ProtectedRoute>
                                <Checkout />
                              </ProtectedRoute>
                            } />
                            
                            <Route path="/perfil" element={
                              <ProtectedRoute>
                                <Profile />
                              </ProtectedRoute>
                            } />
                            
                            <Route path="/pedidos" element={
                              <ProtectedRoute>
                                <Orders />
                              </ProtectedRoute>
                            } />
                            
                            {/* Admin Routes */}
                            <Route path="/admin" element={
                              <AdminRoute>
                                <AdminDashboard />
                              </AdminRoute>
                            } />
                            
                            <Route path="/admin/productos" element={
                              <AdminRoute>
                                <AdminProducts />
                              </AdminRoute>
                            } />
                            
                            <Route path="/admin/usuarios" element={
                              <AdminRoute>
                                <AdminUsers />
                              </AdminRoute>
                            } />
                            
                            <Route path="/admin/pedidos" element={
                              <AdminRoute>
                                <AdminOrders />
                              </AdminRoute>
                            } />
                            
                            <Route path="/admin/categorias" element={
                              <AdminRoute>
                                <AdminCategories />
                              </AdminRoute>
                            } />
                            
                            <Route path="/admin/analiticas" element={
                              <AdminRoute>
                                <AdminAnalytics />
                              </AdminRoute>
                            } />
                            
                            <Route path="/admin/configuracion" element={
                              <AdminRoute>
                                <AdminSettings />
                              </AdminRoute>
                            } />
                            
                            {/* 404 Route */}
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </Suspense>
                      </main>
                      
                      <Footer />
                    </div>
                  </Router>
                </ThemeProvider>
              </CartProvider>
            </ProductsProvider>
          </AuthProvider>
        </NotificationProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;