import React, { useState } from 'react';
import { Clock, Globe, TrendingUp, Zap, Shield, Users } from 'lucide-react';

const Benefits = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const benefits = [
    {
      icon: <Clock size={48} />,
      title: 'Entrega Rápida',
      description: 'Tu sitio web listo en tan solo 48 horas, para que puedas empezar a vender de inmediato.',
      color: 'yellow',
      gradient: 'from-yellow-400 to-amber-600',
      darkGradient: 'dark:from-yellow-500 dark:to-amber-700'
    },
    {
      icon: <Globe size={48} />,
      title: 'Presencia Global',
      description: 'Expande tu negocio más allá de las fronteras físicas y llega a clientes de todo el mundo.',
      color: 'blue',
      gradient: 'from-blue-400 to-indigo-600',
      darkGradient: 'dark:from-blue-500 dark:to-indigo-700'
    },
    {
      icon: <TrendingUp size={48} />,
      title: 'Aumento de Ventas',
      description: 'Nuestros clientes reportan un incremento promedio del 30% en sus ventas tras implementar su sitio web.',
      color: 'green',
      gradient: 'from-green-400 to-emerald-600',
      darkGradient: 'dark:from-green-500 dark:to-emerald-700'
    },
    {
      icon: <Zap size={48} />,
      title: 'Optimización SEO',
      description: 'Posicionamiento en buscadores para que tus clientes te encuentren fácilmente.',
      color: 'purple',
      gradient: 'from-purple-400 to-violet-600',
      darkGradient: 'dark:from-purple-500 dark:to-violet-700'
    },
    {
      icon: <Shield size={48} />,
      title: 'Seguridad Garantizada',
      description: 'Protección de datos y certificados SSL para generar confianza en tus clientes.',
      color: 'red',
      gradient: 'from-red-400 to-rose-600',
      darkGradient: 'dark:from-red-500 dark:to-rose-700'
    },
    {
      icon: <Users size={48} />,
      title: 'Soporte Continuo',
      description: 'Asistencia técnica y asesoramiento para mantener tu sitio web siempre actualizado.',
      color: 'cyan',
      gradient: 'from-cyan-400 to-blue-500',
      darkGradient: 'dark:from-cyan-500 dark:to-blue-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 relative transition-colors duration-300">
      <div className="text-center mb-16 relative z-10">
        <span className="inline-block px-4 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 font-medium text-sm mb-4 transition-colors duration-300">
          Potencia tu Negocio
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-500 to-amber-600 dark:from-yellow-400 dark:to-amber-500 bg-clip-text text-transparent transition-colors duration-300">
          Beneficios de tener tu sitio web profesional
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
          Descubre cómo un sitio web bien diseñado puede transformar tu negocio y multiplicar tus ventas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-500"
            style={{
              transform: hoveredIndex === index ? 'translateY(-10px)' : 'translateY(0)',
              boxShadow: hoveredIndex === index ? 
                (document.documentElement.classList.contains('dark') ? 
                  '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : 
                  '0 25px 50px -12px rgba(0, 0, 0, 0.25)') : 
                (document.documentElement.classList.contains('dark') ? 
                  '0 10px 15px -3px rgba(0, 0, 0, 0.3)' : 
                  '0 10px 15px -3px rgba(0, 0, 0, 0.1)')
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Decorative accent line at top */}
            <div className={`h-2 w-full bg-gradient-to-r ${benefit.gradient} ${benefit.darkGradient} transition-colors duration-300`}></div>
            
            <div className="p-8">
              {/* Icon with gradient background */}
              <div 
                className={`mb-6 w-20 h-20 rounded-lg bg-gradient-to-r ${benefit.gradient} ${benefit.darkGradient} flex items-center justify-center text-white p-4 shadow-md transform transition-all duration-500 ${hoveredIndex === index ? 'scale-110' : 'scale-100'}`}
              >
                {React.cloneElement(benefit.icon, { className: 'text-white' })}
              </div>
              
              {/* Title with gradient text */}
              <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${benefit.gradient} ${benefit.darkGradient} bg-clip-text text-transparent transition-colors duration-300`}>
                {benefit.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                {benefit.description}
              </p>
              
              {/* Decorative corner element */}
              <div 
                className={`absolute bottom-0 right-0 w-16 h-16 opacity-10 transform rotate-45 -mb-8 -mr-8 rounded-lg bg-gradient-to-r ${benefit.gradient} ${benefit.darkGradient} transition-colors duration-300`}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Decorative background elements - enhanced for dark mode */}
      <div className="absolute left-0 top-1/4 w-32 h-32 bg-yellow-500 dark:bg-yellow-600 opacity-5 dark:opacity-10 rounded-full blur-3xl transition-colors duration-300"></div>
      <div className="absolute right-0 bottom-1/4 w-40 h-40 bg-blue-500 dark:bg-blue-600 opacity-5 dark:opacity-10 rounded-full blur-3xl transition-colors duration-300"></div>
      
      {/* Additional dark mode decorative elements */}
      <div className="hidden dark:block absolute -top-16 -left-16 w-64 h-64 bg-purple-900 opacity-5 rounded-full blur-3xl"></div>
      <div className="hidden dark:block absolute -bottom-20 -right-20 w-80 h-80 bg-blue-900 opacity-5 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Benefits;