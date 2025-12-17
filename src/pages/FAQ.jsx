// src/components/Nosotros.jsx
import { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components
const NosotrosContainer = styled.div`
  padding: 2rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const HeroSection = styled.section`
  text-align: center;
  color: white;
  padding: 4rem 0;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const Section = styled.section`
  background: white;
  border-radius: 15px;
  padding: 3rem;
  margin: 2rem 0;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2.2rem;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0.5rem auto;
    border-radius: 2px;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TeamCard = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.15);
  }
`;

const TeamPhoto = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

const TeamName = styled.h4`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const TeamRole = styled.p`
  color: #667eea;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ValueCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
`;

const ValueIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ValueTitle = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const StatCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.p`
  color: #666;
  font-weight: 600;
`;

const ContactButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 2rem auto;
  display: block;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 4rem;
  color: white;
  font-size: 1.2rem;
`;

// Componente principal
const FAQ = () => {
  const [loading, setLoading] = useState(true);

  // Simular carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Datos del equipo
  const teamMembers = [
    { id: 1, name: 'Ana García', role: 'CEO & Fundadora', initial: 'A' },
    { id: 2, name: 'Carlos Rodríguez', role: 'CTO', initial: 'C' },
    { id: 3, name: 'María López', role: 'Diseñadora UX/UI', initial: 'M' },
    { id: 4, name: 'David Martínez', role: 'Desarrollador Fullstack', initial: 'D' }
  ];

  // Valores de la empresa
  const values = [
    { id: 1, icon: '🚀', title: 'Innovación', description: 'Siempre buscamos nuevas formas de mejorar y crecer.' },
    { id: 2, icon: '🤝', title: 'Confianza', description: 'Construimos relaciones basadas en la honestidad y transparencia.' },
    { id: 3, icon: '🎯', title: 'Excelencia', description: 'Nos esforzamos por la calidad en cada proyecto.' }
  ];

  // Estadísticas
  const stats = [
    { id: 1, number: '5+', label: 'Años de Experiencia' },
    { id: 2, number: '500+', label: 'Clientes Satisfechos' },
    { id: 3, number: '50+', label: 'Proyectos Completados' },
    { id: 4, number: '24/7', label: 'Soporte' }
  ];

  if (loading) {
    return (
      <NosotrosContainer>
        <LoadingSpinner>
          <div>Cargando información...</div>
        </LoadingSpinner>
      </NosotrosContainer>
    );
  }

  return (
    <NosotrosContainer>
      <ContentWrapper>
        {/* Hero Section */}
        <HeroSection>
          <HeroTitle>Conoce Nuestra Historia</HeroTitle>
          <HeroSubtitle>
            Más de 5 años creando soluciones innovadoras y transformando ideas en realidad
          </HeroSubtitle>
        </HeroSection>

        {/* Sobre Nosotros */}
        <Section>
          <SectionTitle>¿Quiénes Somos?</SectionTitle>
          <div className="row">
            <div className="col-md-6">
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#555' }}>
                Somos un equipo apasionado de profesionales dedicados a crear experiencias 
                digitales excepcionales. Fundada en 2019, nuestra empresa ha crecido 
                gracias a nuestro compromiso con la calidad y la satisfacción del cliente.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#555' }}>
                Creemos que la tecnología debe ser accesible, intuitiva y poderosa. 
                Cada línea de código que escribimos, cada diseño que creamos, está 
                impulsado por esta filosofía.
              </p>
            </div>
            <div className="col-md-6">
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#555' }}>
                Nuestra misión es simple pero poderosa: <strong>transformar ideas 
                en soluciones digitales que impacten positivamente en la vida de las personas</strong>.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#555' }}>
                Trabajamos con empresas de todos los tamaños, desde startups hasta 
                corporaciones, ayudándolas a alcanzar sus objetivos digitales.
              </p>
            </div>
          </div>
        </Section>

        {/* Estadísticas */}
        <StatsContainer>
          {stats.map(stat => (
            <StatCard key={stat.id}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsContainer>

        {/* Nuestro Equipo */}
        <Section>
          <SectionTitle>Nuestro Equipo</SectionTitle>
          <TeamGrid>
            {teamMembers.map(member => (
              <TeamCard key={member.id}>
                <TeamPhoto>
                  {member.initial}
                </TeamPhoto>
                <TeamName>{member.name}</TeamName>
                <TeamRole>{member.role}</TeamRole>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                  Profesional comprometido con la excelencia y la innovación.
                </p>
              </TeamCard>
            ))}
          </TeamGrid>
        </Section>

        {/* Nuestros Valores */}
        <Section>
          <SectionTitle>Nuestros Valores</SectionTitle>
          <ValuesGrid>
            {values.map(value => (
              <ValueCard key={value.id}>
                <ValueIcon>{value.icon}</ValueIcon>
                <ValueTitle>{value.title}</ValueTitle>
                <p>{value.description}</p>
              </ValueCard>
            ))}
          </ValuesGrid>
        </Section>

        {/* Llamada a la acción */}
        <Section style={{ textAlign: 'center' }}>
          <SectionTitle>¿Listo para Empezar?</SectionTitle>
          <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>
            Contáctanos y descubre cómo podemos ayudar a hacer realidad tu proyecto
          </p>
          <ContactButton onClick={() => window.location.href = '/contacto'}>
            Contáctanos
          </ContactButton>
        </Section>
      </ContentWrapper>
    </NosotrosContainer>
  );
};

export default FAQ;