import React, { useState, useEffect } from 'react';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MessageCircle, 
  ArrowUp, 
  MapPin, 
  Clock,
  Heart,
  Send,
  ChevronRight
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [animatedElements, setAnimatedElements] = useState([]);
  
  // Controlar la visibilidad del botón de scroll según la posición de la página
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
      
      // Animación al hacer scroll
      const elements = document.querySelectorAll('.footer-animate');
      const newAnimatedElements = [];
      
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8 && !animatedElements.includes(el.id)) {
          newAnimatedElements.push(el.id);
          el.classList.add('footer-animated');
        }
      });
      
      if (newAnimatedElements.length > 0) {
        setAnimatedElements(prev => [...prev, ...newAnimatedElements]);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animatedElements]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      // Lógica para procesar la suscripción
      setSubscribed(true);
      setEmail('');
      
      // Mostrar confirmación con animación y luego resetear
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  // Lista de servicios con iconos
  const services = [
    { name: 'Diseño Web Profesional', icon: '🎨' },
    { name: 'Optimización SEO', icon: '🔍' },
    { name: 'Tiendas Online', icon: '🛒' },
    { name: 'Mantenimiento Web', icon: '🔧' },
    { name: 'Marketing Digital', icon: '📱' },
    { name: 'Hosting Premium', icon: '☁️' },
    { name: 'Dominios Personalizados', icon: '🌐' }
  ];

  // Lista de enlaces rápidos
  const quickLinks = [
    { name: 'Inicio', url: '#inicio' },
    { name: 'Beneficios', url: '#beneficios' },
    { name: 'Proceso', url: '#proceso' },
    { name: 'Planes', url: '#planes' },
    { name: 'Testimonios', url: '#testimonios' },
    { name: 'FAQ', url: '#faq' },
    { name: 'Contacto', url: '#contacto' }
  ];
  
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8 overflow-hidden">
      {/* Efecto de partículas/estrellas (decorativo) */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-yellow-500 rounded-full opacity-20"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `twinkle ${Math.random() * 5 + 5}s infinite`
            }}
          />
        ))}
      </div>
      
      {/* Decorative wave shape on top - Mejorado con gradiente */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 transform -translate-y-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-16 w-full">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1F2937" />
              <stop offset="50%" stopColor="#111827" />
              <stop offset="100%" stopColor="#1F2937" />
            </linearGradient>
          </defs>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="url(#waveGradient)"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Scroll to top button - Mejorado con animación */}
        <button 
          onClick={scrollToTop}
          className={`fixed right-8 bottom-8 bg-yellow-500 text-gray-900 p-3 rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-500 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-300 z-50 ${showScrollButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
          aria-label="Volver arriba"
        >
          <ArrowUp size={24} />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Logo and company info - takes 4 columns */}
          <div className="md:col-span-4 footer-animate" id="footer-company">
            <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-700/50 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-yellow-500/30">
              <div className="flex items-center mb-4">
                <div className="mr-3 bg-yellow-500 text-gray-900 p-2 rounded-lg">
                  <Heart size={24} />
                </div>
                <h3 className="text-2xl font-bold">VENDE<span className="text-yellow-500">EXPRESS</span></h3>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Creamos sitios web profesionales que convierten visitantes en clientes. Tu negocio merece una presencia online de calidad diseñada con pasión y expertise.
              </p>
              
              {/* Social media with better hover effects */}
              <div className="flex space-x-4 mb-8">
                <a href="https://www.facebook.com/VendeExpres" target="_blank" rel="noopener noreferrer" 
                   className="bg-gradient-to-br from-blue-600 to-blue-800 p-3 rounded-full text-white hover:from-blue-500 hover:to-blue-700 transform transition duration-300 hover:scale-110 hover:rotate-6 hover:shadow-lg" 
                   aria-label="Facebook">
                  <Facebook size={18} />
                </a>
                <a href="#" 
                   className="bg-gradient-to-br from-pink-600 to-purple-600 p-3 rounded-full text-white hover:from-pink-500 hover:to-purple-500 transform transition duration-300 hover:scale-110 hover:rotate-6 hover:shadow-lg" 
                   aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="#" 
                   className="bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-full text-white hover:from-blue-300 hover:to-blue-500 transform transition duration-300 hover:scale-110 hover:rotate-6 hover:shadow-lg" 
                   aria-label="Twitter">
                  <Twitter size={18} />
                </a>
              </div>
              
              {/* Newsletter signup - Mejorado */}
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <Send size={16} className="mr-2 text-yellow-500" />
                  Suscríbete a nuestro boletín
                </h4>
                {subscribed ? (
                  <div className="bg-green-600/80 backdrop-blur-sm text-white p-3 rounded-lg text-center transform transition-all duration-500 animate-pulse">
                    <div className="flex items-center justify-center">
                      <Heart size={18} className="mr-2 animate-bounce" />
                      <span>¡Gracias por suscribirte! Pronto recibirás novedades.</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Tu correo electrónico"
                      className="w-full p-3 bg-gray-700/80 text-white rounded-l-lg outline-none border border-gray-600 focus:border-yellow-500 transition duration-300 placeholder-gray-400"
                      required
                    />
                    <button 
                      type="submit" 
                      className="relative overflow-hidden bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-medium py-3 px-4 rounded-r-lg transition duration-300 group"
                    >
                      <span className="relative z-10">Enviar</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                    </button>
                  </form>
                )}
                <p className="mt-2 text-xs text-gray-400">Recibe consejos, ofertas especiales y novedades.</p>
              </div>
            </div>
          </div>
          
          {/* Quick links - Mejorado */}
          <div className="md:col-span-2 footer-animate" id="footer-links">
            <h3 className="text-lg font-bold mb-4 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">Enlaces Rápidos</span>
              <span className="block h-1 w-16 bg-gradient-to-r from-yellow-400 to-yellow-600 mt-1 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.name} className="transform transition-all duration-300 hover:translate-x-2"
                    style={{transitionDelay: `${index * 50}ms`}}>
                  <a href={link.url} className="text-gray-300 hover:text-yellow-400 transition duration-300 flex items-center group">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-800 group-hover:bg-yellow-500 mr-2 transition-colors duration-300">
                      <ChevronRight size={14} className="text-yellow-500 group-hover:text-gray-900 transition-colors duration-300" />
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services - Mejorado */}
          <div className="md:col-span-2 footer-animate" id="footer-services">
            <h3 className="text-lg font-bold mb-4 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">Servicios</span>
              <span className="block h-1 w-16 bg-gradient-to-r from-yellow-400 to-yellow-600 mt-1 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={service.name} 
                    className="text-gray-300 transform transition-all duration-300 hover:text-yellow-400 hover:translate-x-2 flex items-center group"
                    style={{transitionDelay: `${index * 50}ms`}}>
                  <span className="w-6 h-6 flex items-center justify-center mr-2 text-lg">{service.icon}</span>
                  {service.name}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact info - Mejorado */}
          <div className="md:col-span-4 footer-animate" id="footer-contact">
            <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-700/50 transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-yellow-500/30">
              <h3 className="text-lg font-bold mb-6 relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">Contacto</span>
                <span className="block h-1 w-16 bg-gradient-to-r from-yellow-400 to-yellow-600 mt-1 rounded-full"></span>
              </h3>
              
              <ul className="space-y-5">
                <li className="flex items-start group">
                  <div className="bg-gray-700/80 p-3 rounded-lg mr-4 group-hover:bg-yellow-500 transition duration-300 shadow-md">
                    <Phone size={18} className="text-gray-300 group-hover:text-gray-900 transition duration-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Teléfono:</p>
                    <a href="tel:+573022323472" className="text-gray-300 hover:text-yellow-400 transition duration-300 text-lg">
                      +57 302 232 3472
                    </a>
                  </div>
                </li>
                
                <li className="flex items-start group">
                  <div className="bg-gray-700/80 p-3 rounded-lg mr-4 group-hover:bg-yellow-500 transition duration-300 shadow-md">
                    <MessageCircle size={18} className="text-gray-300 group-hover:text-gray-900 transition duration-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">WhatsApp:</p>
                    <a 
                      href="https://wa.me/573022323472" 
                      className="text-gray-300 hover:text-yellow-400 transition duration-300 flex items-center"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <span className="mr-2">Chatea con nosotros</span>
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    </a>
                    <p className="text-xs text-gray-500 mt-1">Respuesta rápida 24/7</p>
                  </div>
                </li>
                
                <li className="flex items-start group">
                  <div className="bg-gray-700/80 p-3 rounded-lg mr-4 group-hover:bg-yellow-500 transition duration-300 shadow-md">
                    <Mail size={18} className="text-gray-300 group-hover:text-gray-900 transition duration-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Email:</p>
                    <a 
                      href="mailto:walylosada@gmail.com" 
                      className="text-gray-300 hover:text-yellow-400 transition duration-300 break-all"
                    >
                      walylosada@gmail.com
                    </a>
                  </div>
                </li>
                
                <li className="flex items-start group">
                  <div className="bg-gray-700/80 p-3 rounded-lg mr-4 group-hover:bg-yellow-500 transition duration-300 shadow-md">
                    <MapPin size={18} className="text-gray-300 group-hover:text-gray-900 transition duration-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Ubicación:</p>
                    <p className="text-gray-300">Colombia</p>
                  </div>
                </li>
                
                <li className="flex items-start group">
                  <div className="bg-gray-700/80 p-3 rounded-lg mr-4 group-hover:bg-yellow-500 transition duration-300 shadow-md">
                    <Clock size={18} className="text-gray-300 group-hover:text-gray-900 transition duration-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Horario de atención:</p>
                    <p className="text-gray-300">Lun - Vie: 9:00 - 18:00</p>
                    <div className="mt-1 flex space-x-1">
                      {['Lun', 'Mar', 'Mie', 'Jue', 'Vie'].map(day => (
                        <span key={day} className="inline-block px-1 py-0.5 bg-gray-700 text-xs rounded">{day}</span>
                      ))}
                      {['Sab', 'Dom'].map(day => (
                        <span key={day} className="inline-block px-1 py-0.5 bg-gray-800 text-gray-500 text-xs rounded">{day}</span>
                      ))}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Footer bottom - Mejorado */}
        <div className="pt-8 mt-8 border-t border-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm flex flex-col md:flex-row items-center md:items-start">
                <span className="inline-block mr-1">&copy; {currentYear}</span>
                <span className="flex items-center">
                  VENDE<span className="text-yellow-500">EXPRESS</span>
                  <span className="mx-2">•</span>
                  <span>Todos los derechos reservados</span>
                </span>
              </p>
              <p className="text-gray-500 text-xs mt-2">Diseñado con <Heart size={10} className="inline text-red-500 mx-1" /> para impulsar tu negocio</p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition duration-300 flex items-center">
                <span className="mr-1 text-xs">•</span>Términos y Condiciones
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition duration-300 flex items-center">
                <span className="mr-1 text-xs">•</span>Política de Privacidad
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition duration-300 flex items-center">
                <span className="mr-1 text-xs">•</span>Cookies
              </a>
            </div>
          </div>
          
          {/* Pequeño easter egg animado */}
          <div className="mt-8 text-center">
            <div className="inline-block text-xs text-gray-500 hover:text-gray-300 transition-colors duration-300 cursor-default group">
              <span>Hecho con</span>
              <Heart size={10} className="inline mx-1 text-red-500 group-hover:animate-ping" />
              <span>por desarrolladores apasionados</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add keyframe animation for the twinkling effect */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.7; }
        }
        
        .footer-animate {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .footer-animated {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </footer>
  );
};

export default Footer;