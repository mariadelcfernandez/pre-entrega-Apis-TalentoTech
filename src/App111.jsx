import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext111';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Nosotros from './pages/Nosotros';
import InitSesion from './pages/InitSesion';
import ProtectRoute from './components/routing/ProtectedRoute';

import Pay from './pages/pay';


function App() {
    // Al inicio de App.jsx, antes del return
console.log('App.jsx está cargando')
console.log('Navbar:', Navbar)
console.log('Home:', Home)
console.log('Products:', Products)
// Fin de la sección de logs
  return (
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
           <Routes>
          <div className="App d-flex flex-column min-vh-100">
            <Navbar/>
             <main className="flex-grow-1">
           
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/product/:category/:id" element={<ProductDetail />} />
                <Route path="/nosotros" element={<Nosotros />} />   
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/initsesion" element={<InitSesion
                   setAutenticated={setAutenticated}
                   setUser={setUser} />} />
               <Route path="/pay" element={<ProtectRoute Autenticated={Autenticated}>
                    <Pay
                    setAutenticated={setAutenticated}
                    setUser={setUser}
                    user={user} 
                    />
                 </ProtectRoute>
                // <route path= "/Dashboar" element={<route component={Dashboard}>

                // </route>
                 }/>
        
              </main>

          </div>
                </Routes>       
         <Footer />          
       </CartProvider>
    </AuthProvider>
  </React.StrictMode>
  );
}
 
export default App;