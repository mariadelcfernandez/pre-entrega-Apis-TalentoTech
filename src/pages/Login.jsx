// src/pages/Login.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import LoginForm from '../components/forms/LoginForm';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LoginContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    color: #333;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }
  
  p {
    color: #666;
  }
`;

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Iniciar Sesión | Tienda Online</title>
        <meta name="description" content="Inicia sesión en tu cuenta para continuar con tus compras" />
      </Helmet>
      
      <LoginContainer>
        <LoginCard>
          <LoginHeader>
            <h1>Iniciar Sesión</h1>
            <p>Accede a tu cuenta para continuar</p>
          </LoginHeader>
          
          <LoginForm />
          
          <div className="text-center mt-4">
            <p className="text-muted">
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="text-decoration-none fw-bold text-primary">
                Regístrate aquí
              </Link>
            </p>
            <p className="text-muted">
              <Link to="/forgot-password" className="text-decoration-none">
                ¿Olvidaste tu contraseña?
              </Link>
            </p>
          </div>
        </LoginCard>
      </LoginContainer>
    </>
  );
};

export default Login;