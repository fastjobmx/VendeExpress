import React, { useState, useContext } from 'react';
import { MessageSquare, Code, CheckCircle, Rocket, ArrowRight, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const WorkProcess = () => {
  const [hoveredStep, setHoveredStep] = useState(null);
  
  // Los pasos del proceso con colores adaptados para modo oscuro/claro
  const steps = [
    {
      number: 1,
      title: 'Consulta inicial',
      description: 'Entendemos tus necesidades y objetivos específicos para crear tu sitio web ideal.',
      icon: <MessageSquare size={48} />,
      lightGradient: 'from-blue-400 to-indigo-600',
      darkGradient: 'from-blue-500 to-indigo-700',
      lightBg: 'bg-white',
      darkBg: 'bg-gray-800'
    },
    {
      number: 2,
      title: 'Diseño y desarrollo',
      description: 'Transformamos tus ideas en un sitio web profesional en tan solo 48 horas.',
      icon: <Code size={48} />,
      lightGradient: 'from-purple-400 to-purple-600',
      darkGradient: 'from-purple-500 to-purple-700',
      lightBg: 'bg-white',
      darkBg: 'bg-gray-800'
    },
    {
      number: 3,
      title: 'Revisión y ajustes',
      description: 'Evaluamos juntos el resultado y realizamos los ajustes necesarios según tus comentarios.',
      icon: <CheckCircle size={48} />,
      lightGradient: 'from-green-400 to-emerald-600',
      darkGradient: 'from-green-500 to-emerald-700',
      lightBg: 'bg-white',
      darkBg: 'bg-gray-800'
    },
    {
      number: 4,
      title: 'Lanzamiento',
      description: 'Publicamos tu sitio web y te capacitamos para que puedas administrarlo con facilidad.',
      icon: <Rocket size={48} />,
      lightGradient: 'from-yellow-400 to-amber-600',
      darkGradient: 'from-yellow-500 to-amber-700',
      lightBg: 'bg-white',
      darkBg: 'bg-gray-800'
    }
  ];

  // Variantes para la animación del conector entre pasos
  const connectorVariants = {
    hidden: { width: 0 },
    visible: { width: '100%', transition: { duration: 1.5 } }
  };

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-medium text-sm mb-4 transition-colors duration-300">
          Proceso Simplificado
        </span>
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          ¿Cómo trabajamos?
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Nuestro proceso está diseñado para ser simple y eficiente, permitiéndote tener tu sitio web profesional en tiempo récord.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 relative">
        {/* Líneas de conexión entre pasos (solo visible en escritorio) */}
        <div className="hidden lg:block absolute top-1/3 left-0 w-full h-1 z-0">
          <motion.div 
            className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-yellow-500 dark:from-blue-600 dark:via-purple-700 dark:to-yellow-600 transition-colors duration-300"
            variants={connectorVariants}
            initial="hidden"
            animate="visible"
            style={{ width: '76%', marginLeft: '12%' }}
          />
        </div>

        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="relative z-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3, duration: 0.7 }}
            onMouseEnter={() => setHoveredStep(index)}
            onMouseLeave={() => setHoveredStep(null)}
          >
            <div 
              className={`${step.lightBg} dark:${step.darkBg} rounded-xl shadow-lg dark:shadow-xl dark:shadow-gray-900/30 p-8 transition-all duration-500 h-full backdrop-blur-sm dark:backdrop-blur-md
                dark:border dark:border-gray-800 dark:bg-opacity-30 relative overflow-hidden
                ${hoveredStep === index ? 'transform -translate-y-4 shadow-2xl dark:shadow-2xl dark:shadow-blue-900/20' : ''} transition-colors duration-300`}
            >
              {/* Efecto de brillo en modo oscuro */}
              <div className="absolute -inset-1 opacity-0 dark:opacity-40 bg-gradient-to-r from-blue-600 to-purple-600 blur-xl group-hover:opacity-100 transition duration-1000 rounded-xl"></div>
              
              {/* Marca numerada con gradiente */}
              <div className={`absolute -top-5 -left-2 w-14 h-14 rounded-full bg-gradient-to-r ${step.lightGradient} dark:${step.darkGradient} 
                flex items-center justify-center text-white font-bold text-xl shadow-lg
                transition-transform duration-300 ${hoveredStep === index ? 'scale-110' : ''}`}>
                {step.number}
              </div>
              
              {/* Icono con fondo degradado */}
              <div className={`mb-6 mt-6 flex justify-center transition-all duration-300 
                ${hoveredStep === index ? 'transform scale-110' : ''}`}>
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.lightGradient} dark:${step.darkGradient} 
                  flex items-center justify-center text-white p-4 shadow-md z-10 relative`}>
                  {React.cloneElement(step.icon, { className: 'text-white' })}
                </div>
              </div>
              
              <h3 className={`text-2xl font-bold mb-3 text-center bg-gradient-to-r ${step.lightGradient} dark:${step.darkGradient} bg-clip-text text-transparent z-10 relative`}>
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center z-10 relative">{step.description}</p>
              
              {/* Flecha de dirección (solo visible en escritorio) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/3 -right-4 transform z-10">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight size={30} className="text-blue-500 dark:text-blue-400 transition-colors duration-300" />
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <motion.a 
          href="#contacto" 
          className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 dark:from-yellow-600 dark:to-amber-700 dark:hover:from-yellow-500 dark:hover:to-amber-600 text-white font-bold py-4 px-10 rounded-full inline-flex items-center transition-all duration-300 text-lg shadow-lg dark:shadow-amber-900/30"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <span>Comenzar ahora</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="ml-2"
          >
            <ArrowRight size={20} />
          </motion.div>
        </motion.a>
        
        {/* Indicador de experiencia en modo oscuro */}
        <p className="mt-8 text-gray-500 dark:text-gray-400 text-sm">
          Experiencia adaptada a tus preferencias visuales • Modo claro u oscuro
        </p>
      </div>
    </div>
  );
};

export default WorkProcess;