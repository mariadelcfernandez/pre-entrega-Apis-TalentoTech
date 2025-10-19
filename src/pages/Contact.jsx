// src/pages/Contact.jsx
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceType: 'general'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario al backend
    console.log('Datos del formulario:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        serviceType: 'general'
      });
    }, 3000);
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1 className="display-4 fw-bold text-primary">Contáctanos</h1>
          <p className="lead">Estamos aquí para ayudarte con todos tus problemas tecnológicos</p>
        </div>
      </div>

      <div className="row">
        {/* Información de contacto */}
        <div className="col-lg-4 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-primary mb-4">
                <i className="fas fa-info-circle me-2"></i>
                Información de Contacto
              </h5>
              
              <div className="contact-info">
                <div className="d-flex align-items-start mb-4">
                  <i className="fas fa-map-marker-alt text-primary mt-1 me-3"></i>
                  <div>
                    <h6 className="fw-bold mb-1">Dirección</h6>
                    <p className="text-muted mb-0">
                      Av. Tecnología 123<br />
                      Ciudad Digital, CP 3400
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-4">
                  <i className="fas fa-phone text-primary mt-1 me-3"></i>
                  <div>
                    <h6 className="fw-bold mb-1">Teléfonos</h6>
                    <p className="text-muted mb-0">
                      +1 (555) 123-4567<br />
                      +1 (555) 987-6543
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-4">
                  <i className="fas fa-envelope text-primary mt-1 me-3"></i>
                  <div>
                    <h6 className="fw-bold mb-1">Email</h6>
                    <p className="text-muted mb-0">
                      info@tecnoya.com<br />
                      soporte@tecnoya.com
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <i className="fas fa-clock text-primary mt-1 me-3"></i>
                  <div>
                    <h6 className="fw-bold mb-1">Horario de Atención</h6>
                    <p className="text-muted mb-0">
                      Lunes a Viernes: 8:00 - 18:00<br />
                      Sábados: 9:00 - 14:00<br />
                      Domingos: Cerrado
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h6 className="fw-bold mb-3">Síguenos en redes sociales</h6>
                <div className="d-flex gap-3">
                  <a href="#" className="text-primary">
                    <i className="fab fa-facebook fa-2x"></i>
                  </a>
                  <a href="#" className="text-primary">
                    <i className="fab fa-twitter fa-2x"></i>
                  </a>
                  <a href="#" className="text-primary">
                    <i className="fab fa-instagram fa-2x"></i>
                  </a>
                  <a href="#" className="text-primary">
                    <i className="fab fa-linkedin fa-2x"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="card-title text-primary mb-4">
                <i className="fas fa-paper-plane me-2"></i>
                Envíanos un mensaje
              </h5>

              {submitted && (
                <div className="alert alert-success" role="alert">
                  <i className="fas fa-check-circle me-2"></i>
                  ¡Mensaje enviado correctamente! Te contactaremos pronto.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Nombre completo *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Teléfono</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="serviceType" className="form-label">Tipo de servicio</label>
                      <select
                        className="form-select"
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                      >
                        <option value="general">Consulta general</option>
                        <option value="repair-laptop">Reparación de laptop</option>
                        <option value="repair-pc">Reparación de PC</option>
                        <option value="data-recovery">Recuperación de datos</option>
                        <option value="software">Instalación de software</option>
                        <option value="network">Redes y conectividad</option>
                        <option value="advice">Asesoría técnica</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Asunto *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="form-label">Mensaje *</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-lg">
                  <i className="fas fa-paper-plane me-2"></i>
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;