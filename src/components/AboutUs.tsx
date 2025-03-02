import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Users, Award, TrendingUp, Code, MessageSquare, Briefcase, Heart } from 'lucide-react';

const AboutUs = ({ darkMode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Timeline data
  const timeline = [
    {
      year: '2013',
      title: 'Fundación',
      description: 'Walter Losada funda la empresa con una visión clara: crear sitios web que realmente generen resultados para los negocios.',
      icon: <Calendar />
    },
    {
      year: '2015',
      title: 'Expansión',
      description: 'Ampliamos nuestro equipo y servicios para incluir marketing digital y optimización de conversión.',
      icon: <TrendingUp />
    },
    {
      year: '2018',
      title: 'Innovación',
      description: 'Implementamos metodologías ágiles y nos especializamos en experiencias de usuario centradas en conversión.',
      icon: <Code />
    },
    {
      year: '2021',
      title: 'Reconocimiento',
      description: 'Obtuvimos múltiples premios por excelencia en diseño web y desarrollo de comercio electrónico.',
      icon: <Award />
    },
    {
      year: '2023',
      title: 'Presente',
      description: 'Seguimos transformando negocios con sitios web de alto rendimiento y experiencias digitales memorables.',
      icon: <Briefcase />
    }
  ];

  // Team members (puedes personalizar esta información)
  const team = [
    {
      name: 'Walter Losada',
      role: 'Fundador & CEO',
      bio: 'Visionario digital con más de 15 años de experiencia. Walter combina estrategia de negocios con diseño centrado en el usuario para crear experiencias web que convierten.',
      image: 'images/walter.jpg'
    },
    {
      name: 'Ana Martínez',
      role: 'Directora de Diseño UX/UI',
      bio: 'Especialista en crear interfaces intuitivas y atractivas que cautivan a los usuarios y los guían naturalmente hacia la conversión.',
      image: 'images/ana.png'
    },
    {
      name: 'Carlos Mendoza',
      role: 'Desarrollador Frontend',
      bio: 'Artesano del código que transforma diseños en experiencias interactivas fluidas, optimizadas para velocidad y conversión.',
      image: 'images/Diseñador.jpg'
    }
  ];

  // Valores
  const values = [
    {
      title: 'Innovación',
      description: 'Exploramos constantemente nuevas tecnologías y enfoques para mantenernos a la vanguardia.',
      icon: <Code size={28} />
    },
    {
      title: 'Resultados',
      description: 'Nos enfocamos en métricas reales y objetivos de negocio medibles para nuestros clientes.',
      icon: <TrendingUp size={28} />
    },
    {
      title: 'Colaboración',
      description: 'Trabajamos en estrecha comunicación con nuestros clientes como verdaderos socios estratégicos.',
      icon: <Users size={28} />
    },
    {
      title: 'Pasión',
      description: 'Amamos lo que hacemos y eso se refleja en cada proyecto que emprendemos.',
      icon: <Heart size={28} />
    },
    {
      title: 'Calidad',
      description: 'No hacemos concesiones cuando se trata de la excelencia técnica y estética de nuestros proyectos.',
      icon: <Award size={28} />
    },
    {
      title: 'Comunicación',
      description: 'Mantenemos transparencia total y canales abiertos durante todo el proceso de desarrollo.',
      icon: <MessageSquare size={28} />
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`} id="sobre-nosotros">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Transformamos Ideas en Experiencias Digitales
          </motion.h1>
          <motion.p 
            className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Desde 2013, ayudamos a empresas a crecer a través de presencias web estratégicas que atraen, convierten y fidelizan clientes.
          </motion.p>
        </motion.div>

        {/* About Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className={`relative rounded-2xl overflow-hidden ${darkMode ? 'shadow-blue-900/20 shadow-lg' : 'shadow-lg'}`}>
              <img 
                src="images/oficina.jpg" 
                alt="Nuestra historia" 
                className="w-full h-auto rounded-2xl"
              />
              <div className={`absolute bottom-0 left-0 right-0 p-6 ${darkMode ? 'bg-gradient-to-t from-gray-900 to-transparent' : 'bg-gradient-to-t from-black/70 to-transparent'}`}>
                <p className="text-white text-lg font-medium">Nuestra oficina central</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col justify-center"
          >
            <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Nuestra Historia</h2>
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Todo comenzó en enero de 2013 cuando Walter Losada, tras años de experiencia en el sector digital, identificó una carencia en el mercado: sitios web que realmente generaran resultados medibles para los negocios.
            </p>
            <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Con esta visión clara, fundó nuestra empresa con un enfoque diferente: combinar diseño atractivo con estrategias de conversión y tecnología de vanguardia para crear experiencias web que no solo lucieran bien, sino que también impulsaran el crecimiento de nuestros clientes.
            </p>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Hoy, más de una década después, hemos ayudado a cientos de empresas a transformar su presencia digital en una herramienta efectiva de crecimiento, manteniendo siempre los valores y la pasión con la que Walter inició este viaje.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <motion.h2 
            className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Nuestro Camino
          </motion.h2>

          <motion.div 
            className="relative"
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Timeline central line */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 ${darkMode ? 'bg-blue-700' : 'bg-blue-500'} rounded-full`}></div>
            
            {/* Timeline items */}
            {timeline.map((item, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'} md:justify-between`}
              >
                {/* Time marker */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full z-10 ${darkMode ? 'bg-blue-700 text-white shadow-lg shadow-blue-700/30' : 'bg-blue-500 text-white shadow-md'}`}>
                  {item.icon}
                </div>
                
                {/* Content */}
                <div 
                  className={`w-full md:w-5/12 p-6 rounded-xl ${
                    darkMode 
                      ? 'bg-gray-800 shadow-lg shadow-blue-900/10' 
                      : 'bg-white shadow-md'
                  } ${index % 2 === 0 ? 'md:mr-auto md:text-right md:pr-16' : 'md:ml-auto md:text-left md:pl-16'}`}
                >
                  <span className={`block text-sm font-semibold mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{item.year}</span>
                  <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <motion.h2 
            className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Nuestro Equipo
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {team.map((member, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className={`rounded-xl overflow-hidden ${
                  darkMode 
                    ? 'bg-gray-800 shadow-lg shadow-blue-900/10' 
                    : 'bg-white shadow-md'
                } transform transition-all duration-300 hover:scale-105 group`}
              >
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-t from-gray-900 to-transparent' : 'bg-gradient-to-t from-black/70 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{member.name}</h3>
                  <p className={`text-sm font-medium mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{member.role}</p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Values */}
        <div>
          <motion.h2 
            className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Nuestros Valores
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 hover:border-blue-700 hover:shadow-blue-900/10' 
                    : 'bg-white border-gray-200 hover:border-blue-500 hover:shadow-blue-100'
                }`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  {value.icon}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value.title}</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Parallax Stats Section */}
      <motion.div 
        className={`relative py-20 overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className={`h-full w-full ${darkMode ? 'bg-[url(/api/placeholder/1200/400)]' : 'bg-[url(/api/placeholder/1200/400)]'} bg-cover bg-fixed bg-center`}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Nuestro Impacto</h2>
            <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Una década de resultados tangibles para nuestros clientes</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <motion.div 
              className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900/70' : 'bg-white/90'} backdrop-blur-sm`}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <p className={`text-4xl font-bold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>300+</p>
              <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>Proyectos Completados</p>
            </motion.div>

            <motion.div 
              className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900/70' : 'bg-white/90'} backdrop-blur-sm`}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <p className={`text-4xl font-bold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>98%</p>
              <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>Clientes Satisfechos</p>
            </motion.div>

            <motion.div 
              className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900/70' : 'bg-white/90'} backdrop-blur-sm`}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <p className={`text-4xl font-bold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>10+</p>
              <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>Años de Experiencia</p>
            </motion.div>

            <motion.div 
              className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900/70' : 'bg-white/90'} backdrop-blur-sm`}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <p className={`text-4xl font-bold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>12</p>
              <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>Premios y Reconocimientos</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Testimonial Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div 
          className={`p-8 rounded-2xl ${
            darkMode 
              ? 'bg-gradient-to-r from-blue-900 to-purple-900 shadow-lg shadow-blue-900/20' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
          }`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-white">
              <img src="images/testimonial-avatar.jpg" alt="Cliente satisfecho" className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <svg className="w-10 h-10 text-white/30 mb-4 mx-auto md:mx-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              <p className="text-white text-xl md:text-2xl italic mb-6">
                "El equipo de Walter transformó nuestra presencia digital por completo. No solo crearon un sitio web visualmente impresionante, sino que realmente entendieron nuestras necesidades comerciales y desarrollaron una estrategia que ha aumentado nuestras conversiones en más de un 60%."
              </p>
              
              <div>
                <p className="text-white font-bold text-lg">María González</p>
                <p className="text-white/80">Directora de Marketing, Empresa Líder</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;