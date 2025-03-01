import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Tag, ExternalLink, ArrowRight, Star, Filter, Moon, Sun } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const App = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    // Obtener preferencia guardada o usar preferencia del sistema
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  // Aplicar modo oscuro al documento
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'corporativo', name: 'Corporativo' },
    { id: 'landing', name: 'Landing Pages' },
    { id: 'reservas', name: 'Reservas' }
  ];

  // Enhanced project data with category and better image placeholders
  const recentProjects = [
    {
      image: '/images/primera.png',
      title: 'Tienda de Ropa Online',
      description: 'Sitio web con catálogo y carrito de compras que aumentó las ventas en un 45%',
      tags: ['E-commerce', 'Diseño moderno', 'Optimización SEO'],
      url: 'https://www.ejemplo.com/tienda-ropa-online',
      category: 'ecommerce',
      stats: { visits: '15K+', conversion: '8.5%', growth: '45%' }
    },
    {
      image: '/images/pexels-pixabay-270637.jpg',
      title: 'Restaurante Gourmet',
      description: 'Página web con sistema de reservas que mejoró la ocupación en un 60%',
      tags: ['Reservas online', 'Diseño responsive', 'Integración WhatsApp'],
      url: 'https://www.ejemplo.com/restaurante-gourmet',
      category: 'reservas',
      stats: { visits: '8K+', conversion: '12%', growth: '60%' }
    },
    {
      image: '/images/pexels-beyzaa-yurtkuran-279977530-16245254.jpg',
      title: 'Consultora Financiera',
      description: 'Sitio profesional que generó un 35% más de clientes potenciales',
      tags: ['Landing page', 'SEO avanzado', 'Formulario de contacto'],
      url: 'https://www.ejemplo.com/consultora-financiera',
      category: 'corporativo',
      stats: { visits: '10K+', conversion: '7.2%', growth: '35%' }
    },
    {
      image: '/images/pexels-n-voitkevich-7172830.jpg',
      title: 'Gimnasio CrossFit',
      description: 'Plataforma con clases virtuales y membresías en línea',
      tags: ['Streaming', 'Suscripciones', 'Interfaz intuitiva'],
      url: 'https://www.ejemplo.com/gimnasio-crossfit',
      category: 'landing',
      stats: { visits: '12K+', conversion: '9%', growth: '50%' }
    },
    {
      image: '/images/pexels-karolina-grabowska-4736047.jpg',
      title: 'Agencia de Viajes',
      description: 'Sitio web con paquetes turísticos y pagos seguros',
      tags: ['Pagos en línea', 'Catálogo dinámico', 'Diseño visual'],
      url: 'https://www.ejemplo.com/agencia-viajes',
      category: 'ecommerce',
      stats: { visits: '20K+', conversion: '7.8%', growth: '42%' }
    },
    {
      image: '/images/pexels-cottonbro-7350906.jpg',
      title: 'Salón de Belleza',
      description: 'Página web con agenda en línea y gestión de citas',
      tags: ['Agenda digital', 'Diseño elegante', 'WhatsApp integrado'],
      url: 'https://www.ejemplo.com/salon-belleza',
      category: 'reservas',
      stats: { visits: '6K+', conversion: '15%', growth: '38%' }
    },
    {
      image: '/images/pexels-fotios-photos-16368540.jpg',
      title: 'Tienda de Electrónica',
      description: 'E-commerce con catálogo de productos y seguimiento de pedidos',
      tags: ['E-commerce', 'Panel admin', 'Soporte técnico'],
      url: 'https://www.ejemplo.com/tienda-electronica',
      category: 'ecommerce',
      stats: { visits: '25K+', conversion: '6.5%', growth: '47%' }
    },
    {
      image: '/images/pexels-cottonbro-3584967.jpg',
      title: 'Startup Tecnológica',
      description: 'Landing page con integración de blog y chat en vivo',
      tags: ['Blog', 'Chat en vivo', 'Diseño futurista'],
      url: 'https://www.ejemplo.com/startup-tecnologica',
      category: 'landing',
      stats: { visits: '18K+', conversion: '8.2%', growth: '55%' }
    },
    {
      image: '/images/pexels-cottonbro-5082577.jpg',
      title: 'Desarrolladora Inmobiliaria',
      description: 'Sitio web con galería de propiedades y formulario de contacto',
      tags: ['Inmobiliaria', 'Galería interactiva', 'SEO local'],
      url: 'https://www.ejemplo.com/desarrolladora-inmobiliaria',
      category: 'corporativo',
      stats: { visits: '14K+', conversion: '5.8%', growth: '32%' }
    }
  ];

  // Filter projects based on category and search term
  const filteredProjects = recentProjects.filter(project => {
    const matchesCategory = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const projectVariants = {
    hidden: { y: 50, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 100
      }
    }
  };

  // Intersection observer for scroll animations
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className={`container mx-auto px-4 py-16 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header with parallax effect */}
      <motion.div
        className="relative mb-16 overflow-hidden rounded-xl"
        style={{ height: "300px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-600 to-purple-600'} opacity-90 transition-colors duration-500`}></div>
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="h-full w-full bg-[url('/api/placeholder/1200/400')] bg-cover bg-center opacity-30"></div>
        </motion.div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-6">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Proyectos Destacados
          </motion.h2>
          <motion.p 
            className="text-xl text-center max-w-2xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Transformando negocios con diseño web de alto impacto y conversión
          </motion.p>
        </div>
      </motion.div>

      {/* Search and filter controls */}
      <motion.div 
        className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Buscar proyectos..."
            className={`pl-10 pr-4 py-2 w-full rounded-lg border transition-colors duration-300 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-400 focus:border-blue-400' 
                : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500 focus:border-blue-500'
            } focus:outline-none focus:ring-2`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className={`absolute left-3 top-2.5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} size={18} />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
          <Filter size={18} className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} transition-colors duration-300`} />
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filter === category.id 
                  ? darkMode 
                    ? 'bg-blue-700 text-white shadow-lg shadow-blue-700/30' 
                    : 'bg-blue-600 text-white shadow-md'
                  : darkMode
                    ? 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700' 
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'
              } transform ${filter === category.id ? 'scale-105' : 'scale-100'}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects grid with animations */}
      <motion.div 
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
      >
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={projectVariants}
              layout
              className={`group rounded-xl overflow-hidden transition-all duration-500 flex flex-col ${
                darkMode 
                  ? 'bg-gray-800 shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-blue-900/20' 
                  : 'bg-white shadow-md hover:shadow-xl'
              }`}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 }
              }}
              onMouseEnter={() => setHoveredProject(project.title)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project image with overlay */}
              <div className="relative overflow-hidden h-56">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
                >
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 transition-colors ${
                        darkMode
                          ? 'bg-gray-900 text-blue-400 hover:bg-blue-700 hover:text-white'
                          : 'bg-white text-blue-600 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      <span>Ver proyecto</span>
                      <ExternalLink size={14} />
                    </a>
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Project info */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h3 className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}>{project.title}</h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
                
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 transition-colors duration-300`}>{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 transition-colors duration-300 ${
                        darkMode
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Stats row */}
                <div className={`mt-auto pt-4 border-t grid grid-cols-3 gap-2 text-center transition-colors duration-300 ${
                  darkMode ? 'border-gray-700' : 'border-gray-100'
                }`}>
                  <div>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>Visitantes</p>
                    <p className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-300`}>{project.stats.visits}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>Conversión</p>
                    <p className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'} transition-colors duration-300`}>{project.stats.conversion}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>Crecimiento</p>
                    <p className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-600'} transition-colors duration-300`}>{project.stats.growth}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {/* CTA section */}
      <motion.div
        className={`mt-16 rounded-xl p-8 text-white text-center transition-colors duration-500 ${
          darkMode 
            ? 'bg-gradient-to-r from-blue-900 to-purple-900 shadow-lg shadow-blue-900/20' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600'
        }`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-4">¿Listo para transformar tu negocio?</h3>
        <p className="text-lg max-w-2xl mx-auto mb-6">Nuestro equipo está listo para ayudarte a crear una presencia web que convierta visitantes en clientes</p>
        <motion.a
          href="#contacto"
          className={`${
            darkMode 
              ? 'bg-gray-900 text-blue-400 hover:bg-blue-800 hover:text-white' 
              : 'bg-white text-blue-600 hover:bg-blue-50'
          } px-6 py-3 rounded-full font-bold flex items-center gap-2 mx-auto transition-colors`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Solicitar propuesta</span>
          <ArrowRight size={18} />
        </motion.a>
      </motion.div>
    </div>
  );
};

export default App;