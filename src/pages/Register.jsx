// src/pages/Register.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
//import RegisterForm from '../components/forms/RegisterForm';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const RegisterContainer = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const RegisterCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
`;

const RegisterHeader = styled.div`
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

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Registro | Tienda Online</title>
        <meta name="description" content="Crea una cuenta nueva en nuestra tienda online" />
      </Helmet>
      
      <RegisterContainer>
        <RegisterCard>
          <RegisterHeader>
            <h1>Crear Cuenta</h1>
            <p>Regístrate para comenzar a comprar</p>
          </RegisterHeader>
          
          <RegisterForm />
          
          <div className="text-center mt-4">
            <p className="text-muted">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-decoration-none fw-bold text-primary">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </RegisterCard>
      </RegisterContainer>
    </>
  );
};

export default Register;