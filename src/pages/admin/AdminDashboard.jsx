// src/pages/admin/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts } from '../../contexts/ProductsContext';
import { useCart } from '../../contexts/CartContext';
import styled from 'styled-components';
import {
  FaChartBar,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaStar,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const DashboardContainer = styled.div`
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
`;

const DashboardHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    color: #333;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  font-size: 1.5rem;
  color: white;
  
  &.stat-1 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
  &.stat-2 { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
  &.stat-3 { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
  &.stat-4 { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
`;

const StatInfo = styled.div`
  flex: 1;
`;

const StatValue = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: #333;
`;

const StatLabel = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const Trend = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &.up {
    color: #28a745;
  }
  
  &.down {
    color: #dc3545;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const ChartTitle = styled.h3`
  color: #333;
  margin-bottom: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionButton = styled(Link)`
  background: white;
  border: 2px solid #667eea;
  color: #667eea;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  text-align: center;
  
  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
`;

const RecentActivity = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-top: 2rem;
`;

const ActivityList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-top: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color}20;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.p`
  margin: 0;
  color: #333;
  font-weight: 500;
`;

const ActivityTime = styled.small`
  color: #666;
`;

const AdminDashboard = () => {
  const { user } = useAuth();
  const { products } = useProducts();
  const { cartItems } = useCart();
  
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    averagePrice: 0,
    lowStockProducts: 0,
    totalCategories: 0,
    totalOrders: 0
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Calcular estadísticas
    if (products.length > 0) {
      const totalRevenue = products.reduce((sum, p) => sum + (p.price * 10), 0); // Simular ventas
      const averagePrice = totalRevenue / products.length;
      const lowStockProducts = products.filter(p => p.stock <= 5 && p.stock > 0).length;
      const totalCategories = new Set(products.map(p => p.category)).size;

      setStats({
        totalProducts: products.length,
        totalRevenue,
        averagePrice,
        lowStockProducts,
        totalCategories,
        totalOrders: cartItems.length
      });
    }

    // Actividad reciente simulada
    setRecentActivity([
      {
        id: 1,
        type: 'product_added',
        text: 'Nuevo producto "iPhone 14" agregado',
        time: 'Hace 2 minutos',
        color: '#667eea',
        icon: <FaBox />
      },
      {
        id: 2,
        type: 'order_completed',
        text: 'Pedido #1234 completado',
        time: 'Hace 15 minutos',
        color: '#43e97b',
        icon: <FaShoppingCart />
      },
      {
        id: 3,
        type: 'user_registered',
        text: 'Nuevo usuario registrado',
        time: 'Hace 30 minutos',
        color: '#4facfe',
        icon: <FaUsers />
      },
      {
        id: 4,
        type: 'low_stock',
        text: 'Producto "Samsung TV" bajo en stock',
        time: 'Hace 1 hora',
        color: '#fa709a',
        icon: <FaExclamationTriangle />
      }
    ]);
  }, [products, cartItems]);

  return (
    <>
      <Helmet>
        <title>Dashboard de Administración | Tienda Online</title>
      </Helmet>
      
      <DashboardContainer>
        <DashboardHeader>
          <h1>Panel de Administración</h1>
          <p>
            Bienvenido, <strong>{user?.name}</strong> | Último acceso: Hoy a las{' '}
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </DashboardHeader>

        <StatsGrid>
          <StatCard>
            <StatIcon className="stat-1">
              <FaBox />
            </StatIcon>
            <StatInfo>
              <StatValue>{stats.totalProducts}</StatValue>
              <StatLabel>Productos Totales</StatLabel>
              <Trend className="up">
                <FaArrowUp /> 12%
              </Trend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon className="stat-2">
              <FaDollarSign />
            </StatIcon>
            <StatInfo>
              <StatValue>${stats.totalRevenue.toFixed(2)}</StatValue>
              <StatLabel>Ingresos Totales</StatLabel>
              <Trend className="up">
                <FaArrowUp /> 8%
              </Trend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon className="stat-3">
              <FaShoppingCart />
            </StatIcon>
            <StatInfo>
              <StatValue>{stats.totalOrders}</StatValue>
              <StatLabel>Pedidos Activos</StatLabel>
              <Trend className="down">
                <FaArrowDown /> 3%
              </Trend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon className="stat-4">
              <FaUsers />
            </StatIcon>
            <StatInfo>
              <StatValue>1,234</StatValue>
              <StatLabel>Usuarios Registrados</StatLabel>
              <Trend className="up">
                <FaArrowUp /> 5%
              </Trend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon className="stat-1">
              <FaStar />
            </StatIcon>
            <StatInfo>
              <StatValue>4.8</StatValue>
              <StatLabel>Rating Promedio</StatLabel>
              <Trend className="up">
                <FaArrowUp /> 0.2
              </Trend>
            </StatInfo>
          </StatCard>

          <StatCard>
            <StatIcon className="stat-2">
              <FaExclamationTriangle />
            </StatIcon>
            <StatInfo>
              <StatValue>{stats.lowStockProducts}</StatValue>
              <StatLabel>Stock Bajo</StatLabel>
              {stats.lowStockProducts > 0 && (
                <Trend className="down">
                  <FaArrowDown /> Necesita atención
                </Trend>
              )}
            </StatInfo>
          </StatCard>
        </StatsGrid>

        <ChartsGrid>
          <ChartCard>
            <ChartTitle>
              <FaChartBar /> Resumen de Ventas
            </ChartTitle>
            <div className="text-center py-5">
              <p className="text-muted">Gráfico de ventas (implementar con recharts)</p>
              <div className="bg-light rounded p-3">
                <small>En desarrollo: Integración con Recharts</small>
              </div>
            </div>
          </ChartCard>

          <ChartCard>
            <ChartTitle>
              <FaChartBar /> Productos por Categoría
            </ChartTitle>
            <div className="text-center py-5">
              <p className="text-muted">Gráfico de categorías (implementar con recharts)</p>
              <div className="bg-light rounded p-3">
                <small>En desarrollo: Integración con Recharts</small>
              </div>
            </div>
          </ChartCard>
        </ChartsGrid>

        <QuickActions>
          <ActionButton to="/admin/productos">
            <FaBox size={24} />
            Gestionar Productos
          </ActionButton>
          
          <ActionButton to="/admin/usuarios">
            <FaUsers size={24} />
            Gestionar Usuarios
          </ActionButton>
          
          <ActionButton to="/admin/pedidos">
            <FaShoppingCart size={24} />
            Ver Pedidos
          </ActionButton>
          
          <ActionButton to="/admin/analiticas">
            <FaChartBar size={24} />
            Ver Analíticas
          </ActionButton>
        </QuickActions>

        <RecentActivity>
          <ChartTitle>Actividad Reciente</ChartTitle>
          <ActivityList>
            {recentActivity.map(activity => (
              <ActivityItem key={activity.id}>
                <ActivityIcon color={activity.color}>
                  {activity.icon}
                </ActivityIcon>
                <ActivityContent>
                  <ActivityText>{activity.text}</ActivityText>
                  <ActivityTime>{activity.time}</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            ))}
          </ActivityList>
        </RecentActivity>
      </DashboardContainer>
    </>
  );
};

export default AdminDashboard;