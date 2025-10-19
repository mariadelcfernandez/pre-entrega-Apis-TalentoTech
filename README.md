# React + Vite
Objetivos: construcción de un proyecto final de e-commerce
utilizando conceptos como CRUD y manejo de estados complejos.
• Introducir buenas prácticas de estilización y diseño para crear
aplicaciones web visualmente atractivas y funcionales.
Introducción a React y configuración del proyecto: Instalación
con Vite y Node.js. JSX y creación de componentes funcionales.
Ciclo de vida con useEffect: Realizar peticiones a APIs y manejar
efectos secundarios.
React Router: Configuración de rutas, navegación y
rutas protegidas.
Context API: Crear y consumir contexto para el manejo del
estado global (ej. carrito, autenticación).
CRUD Básico de Productos: Crear, leer, actualizar y eliminar
productos. Formularios con validación y manejo de errores.
Autenticación de Usuarios: Formulario de login, validación y
rutas protegidas.
Estilización: Uso de librerías de UI (Bootstrap,
styled-components).

Resultados de aprendizaje
1. Crear una aplicación ReactJS desde cero utilizando Vite.
2. Implementar la gestión de estado utilizando useState y Context API.
3. Desarrollar rutas dinámicas y protegidas para una navegación fluida y
segura.
4. Construir formularios con validación y manejar la autenticación de
usuarios.
5. Desarrollar un CRUD básico para gestionar productos dentro de
un proyecto de e-commerce.
6. Estilizar una aplicación utilizando librerías como Bootstrap y
styled-components.
7. Desplegar la aplicación final en una plataforma de hosting.
comando
nvm list
 nvm use  23.10.0
  * 20.19.4
npm install vite@latest tecnoya --template react
tecnoyya
 Select a framework:
|  React
|
o  Select a variant:
|  JavaScript
 cd tecnoyaa
  npm install
  npm run dev

Ejecuta el siguiente comando para instalar React Router en tu proyecto:
npm install react-router-dom
# Dependencias adicionales necesarias
npm install react-router-dom styled-components bootstrap
npm install axios # para peticiones HTTP

Estructura inicial del proyecto
src/
├── components/
├── pages/
├── context/
├── hooks/
├── styles/
└── middleware/
└── routes/
└── public/
└── models/


Estructura extendida front
src/
├── components/
│   ├── Navbar.jsx
│   ├── ProductList.jsx
│   ├── AdvancedFilters.jsx
│   └── Pagination.jsx
├── pages/
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   └── Login.jsx
└   └── nosotros.jsx
    └── contact.jsx/
    └── register.jsx/	
    └── services.jsx/
    └── pay.jsx/
    └── protectRoute.jsx/
    └── initSesion.jsx/				

├── context/
│   ├── CartContext.jsx
│   └── AuthContext.jsx
├── hooks/
│   ├── useProducts.js
│   └── useCategories.js
├── App.jsx
├── main.jsx
└── index.css

Mockapi2025+

y como suguerencias
# En la raíz del proyecto frontend
npm install

# En una terminal, ejecutar json-server (backend)
npx json-server --watch db.json --port 3001

# En otra terminal, ejecutar el frontend
npm run dev

// Al inicio de App.jsx, antes del return
console.log('App.jsx está cargando')
console.log('Navbar:', Navbar)
console.log('Home:', Home)
console.log('Products:', Products)

Ahora creao enl Backend
Backend y Base de Datos: Vamos a simular un backend con JSON Server para tener una API REST falsa con operaciones CRUD.

1. Backend con JSON Server
Instalar JSON Server

mkdir backend
cd backend
npm init -y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install -D nodemon



2. Búsqueda Avanzada - Frontend Mejorado
2.1 Componente de Filtros Avanzados
// src/components/AdvancedFilters.jsx

Ejecutar>
# Terminal 1 - API Local (opcional, como respaldo)
npx json-server --watch db.json --port 3001

# Terminal 2 - Frontend
npm run dev