import React, { useState, useContext } from 'react';
import { MessageCircle, Mail, Phone, Send, CheckCircle, Moon, Sun } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Enviar los datos al backend para que envíen el correo
      const response = await fetch('http://localhost:3001/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            plan: '',
            message: ''
          });
        }, 5000);
      } else {
        alert('Hubo un error al enviar tu mensaje. Intenta nuevamente.');
      }
    } catch (error) {
      alert('No se pudo conectar con el servidor. Verifica tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">
            Contáctanos
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
            Estamos listos para crear el sitio web perfecto para tu negocio
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Columna izquierda */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b dark:border-gray-700 pb-4 transition-colors duration-300">
                Información de Contacto
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-center group">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-full mr-5 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/40 transition-colors duration-300">
                    <Phone className="text-blue-600 dark:text-blue-400 w-6 h-6 transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">Teléfono</p>
                    <a href="tel:+573022323472" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-lg font-medium transition-colors duration-300">
                      +57 302 232 3472
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-full mr-5 group-hover:bg-green-100 dark:group-hover:bg-green-800/40 transition-colors duration-300">
                    <MessageCircle className="text-green-600 dark:text-green-400 w-6 h-6 transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">WhatsApp</p>
                    <a 
                      href="https://wa.me/573022323472?text=Hola,%20estoy%20interesado%20en%20hablar%20sobre%20la%20oferta%20de%20sitios%20web"
                      className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-lg font-medium transition-colors duration-300"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      +57 302 232 3472
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-full mr-5 group-hover:bg-yellow-100 dark:group-hover:bg-yellow-800/40 transition-colors duration-300">
                    <Mail className="text-yellow-600 dark:text-yellow-400 w-6 h-6 transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">Correo Electrónico</p>
                    <a 
                      href="mailto:walylosada@gmail.com" 
                      className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 text-lg font-medium break-all transition-colors duration-300"
                    >
                      walylosada@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 rounded-xl shadow-lg p-8 text-white transform transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-xl font-bold mb-6 border-b border-blue-400 dark:border-blue-600 pb-4 transition-colors duration-300">
                ¿Por qué contactarnos ahora?
              </h3>
              <ul className="space-y-5">
                <li className="flex items-start">
                  <div className="bg-blue-500 dark:bg-blue-700 rounded-full p-1 mr-4 mt-1 flex-shrink-0 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-blue-50">Respuesta en menos de 24 horas</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-500 dark:bg-blue-700 rounded-full p-1 mr-4 mt-1 flex-shrink-0 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-blue-50">Presupuesto personalizado sin compromiso</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-500 dark:bg-blue-700 rounded-full p-1 mr-4 mt-1 flex-shrink-0 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-blue-50">Asesoramiento gratuito sobre tu proyecto</span>
                </li>
              </ul>
              
              <a 
                href="https://wa.me/573022323472" 
                className="mt-8 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-bold py-3 px-6 rounded-lg inline-flex items-center justify-center w-full hover:bg-blue-50 dark:hover:bg-gray-700 transition duration-300"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle size={20} className="mr-2" />
                Contactar por WhatsApp
              </a>
            </div>
          </div>
          
          {/* Columna derecha - Formulario */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl h-full">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 h-full">
                  <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-6 rounded-xl mb-8 text-center w-full transition-colors duration-300">
                    <CheckCircle size={50} className="mx-auto mb-4 text-green-500 dark:text-green-400 transition-colors duration-300" />
                    <h3 className="text-2xl font-bold mb-3">¡Gracias por contactarnos!</h3>
                    <p className="text-lg">Un asesor se pondrá en contacto contigo en menos de 24 horas.</p>
                  </div>
                  <a 
                    href="https://wa.me/573022323472" 
                    className="bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg inline-flex items-center transition duration-300 text-lg"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={22} className="mr-3" />
                    Contactar por WhatsApp ahora
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b dark:border-gray-700 pb-4 transition-colors duration-300">
                    Envíanos un mensaje
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 dark:text-gray-200 font-medium mb-2 transition-colors duration-300">
                        Nombre completo *
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                        placeholder="Tu nombre"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 dark:text-gray-200 font-medium mb-2 transition-colors duration-300">
                        Teléfono *
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                        placeholder="Tu número de teléfono"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 font-medium mb-2 transition-colors duration-300">
                      Correo electrónico *
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                      placeholder="tu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="plan" className="block text-gray-700 dark:text-gray-200 font-medium mb-2 transition-colors duration-300">
                      Plan de interés
                    </label>
                    <select 
                      id="plan" 
                      name="plan" 
                      value={formData.plan}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                    >
                      <option value="">Selecciona un plan</option>
                      <option value="basico">Plan Básico</option>
                      <option value="profesional">Plan Profesional</option>
                      <option value="premium">Plan Premium</option>
                      <option value="personalizado">Plan Personalizado</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-700 dark:text-gray-200 font-medium mb-2 transition-colors duration-300">
                      Mensaje
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                      placeholder="Cuéntanos sobre tu proyecto..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center transition duration-300 text-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-3" />
                        Enviar Mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;