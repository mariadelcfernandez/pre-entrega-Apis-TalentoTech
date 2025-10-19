// src/pages/Services.jsx
const Services = () => {
  const services = [
    {
      id: 1,
      title: "Reparación de Laptops",
      description: "Reparamos todo tipo de laptops: cambio de pantallas, teclados, limpieza interna y más.",
      icon: "💻",
      features: ["Cambio de pantallas", "Reparación de teclados", "Limpieza interna", "Actualización de hardware"]
    },
    {
      id: 2,
      title: "Reparación de Computadoras",
      description: "Servicio técnico especializado para PCs de escritorio y workstations.",
      icon: "🖥️",
      features: ["Mantenimiento preventivo", "Instalación de componentes", "Optimización del sistema", "Eliminación de virus"]
    },
    {
      id: 3,
      title: "Recuperación de Datos",
      description: "Recuperamos tus datos de discos duros, SSDs y otros dispositivos de almacenamiento.",
      icon: "💾",
      features: ["Discos duros dañados", "SSD corruptos", "Memorias USB", "Tarjetas SD"]
    },
    {
      id: 4,
      title: "Instalación de Software",
      description: "Instalación y configuración de sistemas operativos y software especializado.",
      icon: "🔧",
      features: ["Windows, macOS, Linux", "Software de oficina", "Programas de diseño", "Antivirus y seguridad"]
    },
    {
      id: 5,
      title: "Redes y Conectividad",
      description: "Configuración y solución de problemas de redes domésticas y empresariales.",
      icon: "📡",
      features: ["Configuración de routers", "Redes WiFi", "Cableado estructurado", "Seguridad de red"]
    },
    {
      id: 6,
      title: "Asesoría Técnica",
      description: "Asesoramiento profesional para la compra y configuración de equipos tecnológicos.",
      icon: "🎯",
      features: ["Recomendaciones de compra", "Configuración optimizada", "Presupuestos personalizados", "Soporte remoto"]
    }
  ];

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">Nuestros Servicios</h1>
        <p className="lead">Soluciones técnicas profesionales para todos tus equipos informáticos</p>
      </div>

      <div className="row g-4">
        {services.map(service => (
          <div key={service.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center p-4">
                <div className="service-icon mb-3">
                  <span style={{ fontSize: '3rem' }}>{service.icon}</span>
                </div>
                <h5 className="card-title fw-bold">{service.title}</h5>
                <p className="card-text text-muted">{service.description}</p>
                
                <ul className="list-unstyled mt-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="mb-2">
                      <i className="fas fa-check text-success me-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-footer bg-transparent border-0 text-center pb-4">
                <button className="btn btn-outline-primary">Solicitar Servicio</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de contacto rápido */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card bg-primary text-white">
            <div className="card-body text-center py-5">
              <h3 className="card-title">¿Necesitas ayuda con tu equipo?</h3>
              <p className="card-text lead mb-4">
                Contáctanos para una evaluación gratuita y presupuesto sin compromiso
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <button className="btn btn-light btn-lg">
                  <i className="fas fa-phone me-2"></i>
                  Llamar ahora
                </button>
                <button className="btn btn-outline-light btn-lg">
                  <i className="fas fa-whatsapp me-2"></i>
                  WhatsApp
                </button>
                <button className="btn btn-outline-light btn-lg">
                  <i className="fas fa-envelope me-2"></i>
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;