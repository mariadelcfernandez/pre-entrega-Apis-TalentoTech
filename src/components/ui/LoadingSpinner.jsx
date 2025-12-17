// src/components/ui/LoadingSpinner.jsx
import React from 'react';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${props => props.fullscreen ? '100vh' : '200px'};
  flex-direction: column;
  padding: ${props => props.fullscreen ? '0' : '2rem'};
`;

const Spinner = styled.div`
  width: ${props => props.size || '50px'};
  height: ${props => props.size || '50px'};
  border: 3px solid rgba(102, 126, 234, 0.2);
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Message = styled.p`
  margin-top: 1rem;
  color: #666;
  font-size: 0.9rem;
  text-align: center;
  max-width: 300px;
`;

const LoadingSpinner = ({ 
  message = 'Cargando...', 
  size = '50px', 
  fullscreen = false,
  className = '' 
}) => {
  return (
    <SpinnerContainer 
      fullscreen={fullscreen} 
      className={className}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Spinner 
        size={size} 
        aria-hidden="true"
      />
      {message && (
        <Message>
          {message}
        </Message>
      )}
      <span className="visually-hidden">Cargando contenido...</span>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;