// src/components/forms/LoginForm.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
//import { useAuth } from '../contexts/AuthContext';
import {toast } from 'react-toastify';
import styled from 'styled-components';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  border: 1px solid ${props => props.error ? '#dc3545' : '#ddd'};
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#dc3545' : '#667eea'};
    box-shadow: ${props => props.error ? '0 0 0 0.25rem rgba(220,53,69,.25)' : '0 0 0 0.25rem rgba(102,126,234,.25)'};
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    
    &:hover:not(:disabled) {
      opacity: 0.9;
      transform: translateY(-2px);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const TogglePassword = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
`;

const SocialButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  background: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &.google {
    color: #DB4437;
  }
  
  &.facebook {
    color: #4267B2;
  }
`;

const Divider = styled.div`
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 45%;
    height: 1px;
    background: #ddd;
  }
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 45%;
    height: 1px;
    background: #ddd;
  }
`;

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Email inválido')
    .required('El email es requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida')
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError('');

      try {
        const success = await login(values.email, values.password);
        
        if (success) {
          toast.success('¡Inicio de sesión exitoso!');
          navigate(from, { replace: true });
        } else {
          setError('Credenciales incorrectas');
        }
      } catch (err) {
        setError(err.message || 'Error al iniciar sesión');
        toast.error('Error al iniciar sesión');
      } finally {
        setIsLoading(false);
      }
    }
  });

  const handleDemoLogin = (type) => {
    if (type === 'admin') {
      formik.setValues({
        email: 'admin@example.com',
        password: 'admin123'
      });
    } else {
      formik.setValues({
        email: 'user@example.com',
        password: 'user123'
      });
    }
  };

  return (
    <FormContainer>
      <FormTitle>Iniciar Sesión</FormTitle>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <SocialButtons>
        <SocialButton 
          className="google"
          onClick={() => handleDemoLogin('user')}
          type="button"
        >
          <FaGoogle /> Demo Usuario
        </SocialButton>
        <SocialButton 
          className="facebook"
          onClick={() => handleDemoLogin('admin')}
          type="button"
        >
          <FaFacebook /> Demo Admin
        </SocialButton>
      </SocialButtons>
      
      <Divider>
        <span className="text-muted">O ingresa con tu cuenta</span>
      </Divider>
      
      <form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <InputWrapper>
            <InputIcon>
              <FaUser />
            </InputIcon>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && formik.errors.email}
              placeholder="tu@email.com"
            />
          </InputWrapper>
          {formik.touched.email && formik.errors.email && (
            <ErrorMessage>{formik.errors.email}</ErrorMessage>
          )}
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Contraseña</Label>
          <InputWrapper>
            <InputIcon>
              <FaLock />
            </InputIcon>
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password}
              placeholder="••••••••"
            />
            <TogglePassword
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </TogglePassword>
          </InputWrapper>
          {formik.touched.password && formik.errors.password && (
            <ErrorMessage>{formik.errors.password}</ErrorMessage>
          )}
        </FormGroup>
        
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="remember"
            />
            <label className="form-check-label" htmlFor="remember">
              Recordarme
            </label>
          </div>
          
          <Link to="/forgot-password" className="text-decoration-none">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        
        <Button 
          type="submit" 
          className="btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Iniciando sesión...
            </>
          ) : (
            'Iniciar Sesión'
          )}
        </Button>
      </form>
      
      <div className="text-center mt-4">
        <p className="text-muted">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-decoration-none fw-bold">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </FormContainer>
  );
};

export default LoginForm;