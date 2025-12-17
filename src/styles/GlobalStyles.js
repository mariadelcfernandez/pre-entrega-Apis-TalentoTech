// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Reset y estilos base */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    color: #333;
    background-color: #f8f9fa;
    min-height: 100vh;
  }

  /* Tipografía */
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    font-weight: 600;
    line-height: 1.3;
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }
  h5 { font-size: 1.25rem; }
  h6 { font-size: 1rem; }

  @media (max-width: 768px) {
    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    h3 { font-size: 1.5rem; }
    h4 { font-size: 1.25rem; }
  }

  /* Enlaces */
  a {
    color: #667eea;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #5a6fd8;
      text-decoration: underline;
    }
  }

  /* Listas */
  ul, ol {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }

  /* Imágenes */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Formularios */
  input,
  textarea,
  select,
  button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button {
    cursor: pointer;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  /* Tablas */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
    
    th, td {
      padding: 0.75rem;
      border: 1px solid #dee2e6;
      text-align: left;
    }
    
    th {
      background-color: #f8f9fa;
      font-weight: 600;
    }
  }

  /* Utilidades */
  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }
  .text-muted { color: #6c757d; }
  .text-primary { color: #667eea; }
  .text-success { color: #28a745; }
  .text-danger { color: #dc3545; }
  .text-warning { color: #ffc107; }
  .text-info { color: #17a2b8; }

  .bg-primary { background-color: #667eea; }
  .bg-success { background-color: #28a745; }
  .bg-danger { background-color: #dc3545; }
  .bg-warning { background-color: #ffc107; }
  .bg-info { background-color: #17a2b8; }
  .bg-light { background-color: #f8f9fa; }
  .bg-dark { background-color: #343a40; }

  .rounded { border-radius: 0.25rem; }
  .rounded-circle { border-radius: 50%; }

  .shadow { box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15); }
  .shadow-sm { box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075); }
  .shadow-lg { box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175); }

  /* Scrollbar personalizada */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 5px;
    
    &:hover {
      background: #a8a8a8;
    }
  }

  /* Selección de texto */
  ::selection {
    background-color: rgba(102, 126, 234, 0.3);
    color: inherit;
  }

  /* Focus visible para accesibilidad */
  :focus-visible {
    outline: 2px solid #667eea;
    outline-offset: 2px;
  }

  /* Estilos para modales */
  .modal-backdrop {
    background-color: rgba(0, 0, 0, 0.5) !important;
  }

  .modal-content {
    border: none;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  /* Estilos para toasts */
  .Toastify__toast {
    border-radius: 8px;
    font-family: inherit;
  }

  .Toastify__toast--success {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  }

  .Toastify__toast--error {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }

  .Toastify__toast--warning {
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  }

  .Toastify__toast--info {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }

  /* Animaciones */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .fade-in {
    animation: fadeIn 0.5s ease-out;
  }

  .slide-in {
    animation: slideIn 0.3s ease-out;
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  /* Responsive utilities */
  @media (max-width: 576px) {
    .container {
      padding-left: 15px;
      padding-right: 15px;
    }
    
    .hidden-xs {
      display: none !important;
    }
  }

  @media (max-width: 768px) {
    .hidden-sm {
      display: none !important;
    }
  }

  @media (max-width: 992px) {
    .hidden-md {
      display: none !important;
    }
  }

  @media (max-width: 1200px) {
    .hidden-lg {
      display: none !important;
    }
  }

  /* Clases de utilidad para accesibilidad */
  .visually-hidden {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }

  .sr-only {
    @extend .visually-hidden;
  }

  /* Estilos para estados de carga */
  .loading {
    position: relative;
    pointer-events: none;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: inherit;
      z-index: 10;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 30px;
      height: 30px;
      margin: -15px 0 0 -15px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      z-index: 11;
    }
  }

  /* Estilos para mensajes de error */
  .error-message {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    
    &::before {
      content: '⚠️';
    }
  }

  /* Estilos para alertas */
  .alert {
    padding: 1rem 1.5rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    
    &-success {
      color: #155724;
      background-color: #d4edda;
      border-color: #c3e6cb;
    }
    
    &-danger {
      color: #721c24;
      background-color: #f8d7da;
      border-color: #f5c6cb;
    }
    
    &-warning {
      color: #856404;
      background-color: #fff3cd;
      border-color: #ffeaa7;
    }
    
    &-info {
      color: #0c5460;
      background-color: #d1ecf1;
      border-color: #bee5eb;
    }
  }
`;

export default GlobalStyles;