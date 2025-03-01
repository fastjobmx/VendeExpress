import React, { useState, useEffect, useContext } from 'react';
import { ArrowRight, CheckCircle, ExternalLink, X, Moon, Sun, Play, ShoppingCart } from 'lucide-react';

// Contexto para el tema oscuro
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Asumimos que este contexto existe en tu aplicación
const ThemeContext = React.createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

// Datos de ejemplo para el portafolio
const portfolioData = [
  {
    id: 1,
    title: "Restaurante El Fogón",
    image: "/images/portfolio/restaurant.jpg",
    description: "Sitio web para restaurante de cocina mediterránea",
    type: "Sitio web"
  },
  {
    id: 2,
    title: "TechStore",
    image: "/images/portfolio/ecommerce1.jpg",
    description: "E-commerce de productos tecnológicos",
    type: "E-commerce"
  },
  {
    id: 3,
    title: "Consultorio Dental Sonrisa",
    image: "/images/portfolio/dental.jpg",
    description: "Web para clínica dental con sistema de citas",
    type: "Sitio web"
  },
  {
    id: 4,
    title: "ModaFusion",
    image: "/images/portfolio/ecommerce2.jpg",
    description: "Tienda online de ropa y accesorios",
    type: "E-commerce"
  },
  {
    id: 5,
    title: "Gimnasio PowerFit",
    image: "/images/portfolio/gym.jpg",
    description: "Web para gimnasio con planes de entrenamiento",
    type: "Sitio web"
  },
  {
    id: 6,
    title: "DecorHogar",
    image: "/images/portfolio/ecommerce3.jpg",
    description: "E-commerce de artículos para el hogar",
    type: "E-commerce"
  }
];

interface HeroProps {
  openPortfolioModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ openPortfolioModal }) => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [timeLeft, setTimeLeft] = useState({
    hours: 48,
    minutes: 0,
    seconds: 0
  });

  const [isVisible, setIsVisible] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTab, setSelectedTab] = useState('todos');

  useEffect(() => {
    setIsVisible(true);
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const newSeconds = prevTime.seconds - 1;

        if (newSeconds < 0) {
          const newMinutes = prevTime.minutes - 1;

          if (newMinutes < 0) {
            const newHours = prevTime.hours - 1;

            if (newHours < 0) {
              clearInterval(timer);
              return { hours: 0, minutes: 0, seconds: 0 };
            }

            return { hours: newHours, minutes: 59, seconds: 59 };
          }

          return { ...prevTime, minutes: newMinutes, seconds: 59 };
        }

        return { ...prevTime, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  const handleOpenPortfolio = () => {
    setShowPortfolioModal(true);
  };

  const handleClosePortfolio = () => {
    setShowPortfolioModal(false);
    setIsPlaying(false);
  };

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const filteredPortfolio = selectedTab === 'todos' 
    ? portfolioData 
    : portfolioData.filter(item => item.type.toLowerCase() === selectedTab);

  return (
    <div className={`relative min-h-screen flex items-center overflow-hidden ${darkMode ? 'dark' : ''}`}>
      {/* Modo oscuro toggle */}
      

      {/* Overlay de partículas - adaptado para modo oscuro */}
      <div className="absolute inset-0 z-10">
        <div className="absolute w-32 h-32 bg-yellow-500 dark:bg-purple-500 rounded-full opacity-10 -top-10 -left-10 animate-pulse"></div>
        <div className="absolute w-64 h-64 bg-blue-500 dark:bg-indigo-600 rounded-full opacity-10 top-1/4 -right-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-48 h-48 bg-blue-300 dark:bg-blue-700 rounded-full opacity-10 bottom-1/4 -left-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Background imagen con gradiente - con versión para modo oscuro */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-700"
        style={{
          backgroundImage: darkMode ? "url('/images/dark-bg.png')" : "url('/images/primera.png')",
        }}
      >
        <div className={`absolute inset-0 ${
          darkMode 
            ? 'bg-gradient-to-r from-gray-900/95 to-indigo-950/90' 
            : 'bg-gradient-to-r from-blue-900/90 to-indigo-900/80'
        } transition-colors duration-700`}></div>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-16 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Columna izquierda - Texto y CTA */}
            <div className={`text-left transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-blue-600/30 dark:bg-indigo-600/40 text-white rounded-full px-4 py-2 inline-flex items-center mb-6 backdrop-blur-sm border border-blue-400/20 dark:border-indigo-400/30 transition-colors duration-500">
                <span className="bg-yellow-500 dark:bg-purple-500 text-xs font-bold uppercase tracking-wider rounded-full w-6 h-6 flex items-center justify-center mr-2 transition-colors duration-500">
                  ¡
                </span>
                <span className="text-sm font-medium">Oferta por tiempo limitado</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Crea tu sitio web profesional en <span className="text-yellow-400 dark:text-purple-400 transition-colors duration-500">48 horas</span>
              </h1>

              <p className="text-xl text-blue-100 dark:text-indigo-100 mb-8 transition-colors duration-500">
                Impulsa tu negocio con un sitio web optimizado para ventas desde <span className="font-bold text-yellow-400 dark:text-purple-400 transition-colors duration-500">$350.000</span>
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-white">
                  <CheckCircle size={20} className="text-green-400 dark:text-green-500 mr-3 transition-colors duration-500" />
                  <span>Diseño profesional y responsivo</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle size={20} className="text-green-400 dark:text-green-500 mr-3 transition-colors duration-500" />
                  <span>Optimizado para SEO</span>
                </div>
                <div className="flex items-center text-white">
                  <CheckCircle size={20} className="text-green-400 dark:text-green-500 mr-3 transition-colors duration-500" />
                  <span>Formularios de contacto funcionales</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#planes"
                  className={`${
                    darkMode 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50' 
                      : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50'
                  } text-white font-bold py-4 px-8 rounded-xl inline-flex items-center justify-center transition duration-300 text-lg`}
                >
                  Quiero mi sitio web
                  <ArrowRight size={20} className="ml-2" />
                </a>

                <button
                  onClick={handleOpenPortfolio}
                  className="bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/15 text-white backdrop-blur-sm border border-white/30 font-bold py-4 px-8 rounded-xl inline-flex items-center justify-center transition duration-300 text-lg"
                >
                  Ver portafolio
                  <ExternalLink size={18} className="ml-2" />
                </button>
              </div>
            </div>

            {/* Columna derecha - Contador */}
            <div className={`transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl transition-all duration-500">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">¡Oferta especial!</h3>
                  <p className="text-blue-100 dark:text-indigo-100 transition-colors duration-500">
                    Obtén un <span className="text-yellow-400 dark:text-purple-400 font-bold transition-colors duration-500">20% de descuento</span> y soporte premium por 6 meses
                  </p>
                </div>
                
                <div className="mb-6">
                  <p className="text-white text-center mb-4">Esta oferta expira en:</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-900/80 dark:bg-indigo-900/80 rounded-xl p-4 text-center border border-blue-400/20 dark:border-indigo-400/20 transition-colors duration-500">
                      <div className="text-3xl font-bold text-white mb-1">{formatTime(timeLeft.hours)}</div>
                      <div className="text-xs text-blue-200 dark:text-indigo-200 uppercase tracking-wider transition-colors duration-500">Horas</div>
                    </div>
                    <div className="bg-blue-900/80 dark:bg-indigo-900/80 rounded-xl p-4 text-center border border-blue-400/20 dark:border-indigo-400/20 transition-colors duration-500">
                      <div className="text-3xl font-bold text-white mb-1">{formatTime(timeLeft.minutes)}</div>
                      <div className="text-xs text-blue-200 dark:text-indigo-200 uppercase tracking-wider transition-colors duration-500">Minutos</div>
                    </div>
                    <div className="bg-blue-900/80 dark:bg-indigo-900/80 rounded-xl p-4 text-center border border-blue-400/20 dark:border-indigo-400/20 transition-colors duration-500">
                      <div className="text-3xl font-bold text-white mb-1">{formatTime(timeLeft.seconds)}</div>
                      <div className="text-xs text-blue-200 dark:text-indigo-200 uppercase tracking-wider transition-colors duration-500">Segundos</div>
                    </div>
                  </div>
                </div>
                
                <a
                  href="#contacto"
                  className={`${
                    darkMode 
                      ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50' 
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/30 hover:shadow-green-500/50'
                  } text-white font-bold py-4 px-8 rounded-xl inline-flex items-center justify-center transition duration-300 text-lg w-full`}
                >
                  Solicitar descuento ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path 
            fill={darkMode ? "#111827" : "#f9fafb"} 
            fillOpacity="1" 
            d="M0,96L80,90.7C160,85,320,75,480,74.7C640,75,800,85,960,90.7C1120,96,1280,96,1360,96L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            className="transition-colors duration-500"
          ></path>
        </svg>
      </div>

      {/* Modal de Portafolio */}
      {showPortfolioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClosePortfolio}
          ></div>
          
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl transition-colors duration-500">
            {/* Header del modal */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center transition-colors duration-500">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-500">
                Nuestro Portafolio de Proyectos
              </h3>
              <button 
                onClick={handleClosePortfolio}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition duration-300"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Contenido del modal con scroll */}
            <div className="overflow-y-auto p-6 flex-grow">
              {/* Sección de video destacado */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 transition-colors duration-500">
                  Presentación de nuestros trabajos recientes
                </h4>
                
                <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden transition-colors duration-500">
                  {!isPlaying ? (
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <div className="relative w-full h-full">
                        <img 
                          src="/images/portfolio/video-cover.jpg" 
                          alt="Vista previa del portafolio" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <button 
                            onClick={handlePlayVideo}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-5 rounded-full transition duration-300 transform hover:scale-110"
                          >
                            <Play size={36} fill="white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                      title="Nuestro portafolio de sitios web" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="absolute inset-0"
                    ></iframe>
                  )}
                </div>
              </div>
              
              {/* Tabs para filtrar */}
              <div className="border-b border-gray-200 dark:border-gray-800 mb-6 transition-colors duration-500">
                <div className="flex space-x-6">
                  <button 
                    onClick={() => setSelectedTab('todos')}
                    className={`py-3 border-b-2 transition-colors ${
                      selectedTab === 'todos' 
                        ? (darkMode ? 'border-purple-500 text-purple-500' : 'border-blue-500 text-blue-600') 
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    Todos los proyectos
                  </button>
                  <button 
                    onClick={() => setSelectedTab('sitio web')}
                    className={`py-3 border-b-2 transition-colors ${
                      selectedTab === 'sitio web' 
                        ? (darkMode ? 'border-purple-500 text-purple-500' : 'border-blue-500 text-blue-600') 
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    Sitios web
                  </button>
                  <button 
                    onClick={() => setSelectedTab('e-commerce')}
                    className={`py-3 border-b-2 transition-colors flex items-center ${
                      selectedTab === 'e-commerce' 
                        ? (darkMode ? 'border-purple-500 text-purple-500' : 'border-blue-500 text-blue-600') 
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <ShoppingCart size={16} className="mr-1" />
                    E-commerce
                  </button>
                </div>
              </div>
              
              {/* Grid de proyectos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPortfolio.map(project => (
                  <div key={project.id} className="group">
                    <div className="rounded-xl overflow-hidden shadow-md bg-gray-50 dark:bg-gray-800 transition-colors duration-500 hover:shadow-lg">
                      <div className="relative aspect-video">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-4 w-full">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              project.type === 'E-commerce' 
                                ? 'bg-purple-500/90 text-white' 
                                : 'bg-blue-500/90 text-white'
                            }`}>
                              {project.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h5 className="font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-500">
                          {project.title}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-500">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Sección de testimonio */}
              <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 transition-colors duration-500">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="rounded-full w-16 h-16 overflow-hidden flex-shrink-0">
                    <img 
                      src="/images/testimonial-avatar.jpg" 
                      alt="Cliente satisfecho" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <blockquote className="text-gray-700 dark:text-gray-300 italic mb-2 transition-colors duration-500">
                      "Increíble trabajo. Mi sitio web se entregó antes de lo esperado y la calidad superó mis expectativas. Las ventas de mi negocio aumentaron un 35% en solo dos meses."
                    </blockquote>
                    <cite className="text-gray-900 dark:text-white font-medium not-italic transition-colors duration-500">
                      — María Rodríguez, CEO de ModaFusion
                    </cite>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer del modal */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-gray-600 dark:text-gray-400 transition-colors duration-500">
                  ¿Te gusta lo que ves? Hablemos de tu proyecto.
                </p>
                <a
                  href="#contacto"
                  onClick={handleClosePortfolio}
                  className={`${
                    darkMode 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800' 
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                  } text-white font-bold py-3 px-6 rounded-xl inline-flex items-center justify-center transition duration-300`}
                >
                  Solicitar cotización
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;