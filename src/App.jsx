import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
// src/App.jsx (actualización de rutas)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
//import { AuthProvider } from './contexts/AuthContext';
//import { CartProvider } from './contexts/CartContext';
//import { ProductsProvider } from './contexts/ProductsContext';
import { ProtectedRoute, AdminRoute } from './components/routing/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AdminPanel from './pages/admin/AdminDashboard';
import Nosotros from './pages/Nosotros';
import NotFound from './pages/NotFound';
import GlobalStyles from './styles/GlobalStyles';
//import 'react-toastify/dist/ReactToastify.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <HelmetProvider>
     {/* <AuthProvider> */}
      {/* <ProductsProvider> */}
          {/* <CartProvider> */}
            <Router>
              <GlobalStyles />
              <div className="d-flex flex-column min-vh-100">
                <Navbar />
                <main className="flex-grow-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/productos" element={<Products />} />
                    <Route path="/producto/:id" element={<ProductDetail />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                    {/* Rutas protegidas */}
                    <Route path="/carrito" element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    } />
                    
                    {/* Rutas de administrador */}
                    <Route path="/admin/*" element={
                      <AdminRoute>
                        <AdminPanel />
                      </AdminRoute>
                    } />
                 
                  </Routes>
                </main>
                <Footer />
              </div>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </Router>
         {/* </CartProvider> */}
        {/*</ProductsProvider> */}
     {/* </AuthProvider> */}
    </HelmetProvider>
  );
}

export default App;