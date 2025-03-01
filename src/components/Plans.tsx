import React, { useState, useEffect } from 'react';
import { Check, Star, ArrowRight, Gift, Award, Shield, Zap } from 'lucide-react';

const Plans = () => {
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState('');
  
  useEffect(() => {
    // Trigger animation after component mount
    setTimeout(() => {
      setIsAnimated(true);
    }, 100);
  }, []);
  
  const handlePlanSelect = (planName) => {
    setSelectedPlanName(planName);
    setShowContactModal(true);
  };
  
  const plans = [
    {
      name: 'Landing Page',
      price: '350.000',
      popular: false,
      features: [
        'Sitio web de 3 páginas',
        'Diseño responsive',
        'Dominio por 1 año',
        'Hosting por 1 año',
        'Formulario de contacto',
        'SEO básico',
        'Integración con redes sociales'
      ],
      cta: 'Seleccionar Plan Landing Page',
      lightGradient: 'from-blue-400 to-cyan-500',
      darkGradient: 'from-blue-500 to-cyan-600',
      icon: <Shield size={24} />,
      lightBgColor: 'bg-blue-50',
      darkBgColor: 'bg-blue-900/10',
      lightAccent: 'text-blue-500',
      darkAccent: 'text-blue-400'
    },
    {
      name: 'eCommerce Básico',
      price: '550.000',
      popular: true,
      features: [
        'Tienda online básica para hasta 10 productos',
        'Diseño responsive premium',
        'Dominio por 1 año',
        'Hosting por 1 año',
        'Formulario de contacto avanzado',
        'SEO optimizado',
        'Integración con redes sociales',
        'Galería de imágenes',
        'Pasarela de pagos integrada para ventas rápidas',
        'Soporte por 3 meses'
      ],
      cta: 'Seleccionar Plan eCommerce Básico',
      lightGradient: 'from-yellow-400 to-amber-600',
      darkGradient: 'from-yellow-500 to-amber-700',
      icon: <Star size={24} />,
      lightBgColor: 'bg-amber-50',
      darkBgColor: 'bg-amber-900/10',
      lightAccent: 'text-amber-500',
      darkAccent: 'text-amber-400'
    },
    {
      name: 'eCommerce Pro',
      price: '850.000',
      popular: false,
      features: [
        'Tienda online avanzada para hasta 25 productos',
        'Diseño responsive exclusivo',
        'Dominio por 1 año',
        'Hosting por 1 año',
        'Formulario de contacto avanzado',
        'SEO profesional',
        'Integración con redes sociales',
        'Galería de imágenes interactiva',
        'Pasarelas de pago múltiples para mayor comodidad',
        'Tienda online básica',
        'Soporte por 6 meses',
        'Logo gratis'
      ],
      cta: 'Seleccionar Plan eCommerce Pro',
      lightGradient: 'from-purple-500 to-indigo-600',
      darkGradient: 'from-purple-600 to-indigo-700',
      icon: <Award size={24} />,
      lightBgColor: 'bg-purple-50',
      darkBgColor: 'bg-purple-900/10',
      lightAccent: 'text-purple-500',
      darkAccent: 'text-purple-400'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden transition-colors duration-300">
      <div className={`text-center mb-16 transition-all duration-700 transform ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="relative inline-block">
          <span className="inline-block px-6 py-2 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 font-medium text-sm mb-4 relative z-10 transition-colors duration-300">
            Planes Personalizados
          </span>
          <div className="absolute inset-0 bg-blue-200 dark:bg-blue-800 rounded-full transform rotate-3 z-0 transition-colors duration-300"></div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent transition-colors duration-300">
          Nuestros Planes
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
          Elige el plan que mejor se adapte a las necesidades de tu negocio
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mx-auto mt-8 transition-colors duration-300"></div>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-8 items-stretch">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transition-all duration-500 flex-1 max-w-md mx-auto md:mx-0 flex flex-col transform 
            dark:border-gray-700 backdrop-blur-sm dark:backdrop-blur-md
            ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} 
            ${plan.popular 
              ? 'border-4 border-yellow-400 dark:border-yellow-500 shadow-xl dark:shadow-yellow-900/20 md:scale-105 z-10' 
              : 'border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-gray-900/30'}`}
            style={{
              transitionDelay: `${index * 150}ms`,
              transform: isAnimated && hoveredPlan === index ? 'translateY(-10px) scale(1.02)' : 
                       isAnimated && plan.popular ? 'translateY(0) scale(1.05)' : 
                       isAnimated ? 'translateY(0) scale(1)' : 'translateY(20px) scale(1)',
              boxShadow: hoveredPlan === index ? '0 20px 30px -12px rgba(0, 0, 0, 0.2)' : ''
            }}
            onMouseEnter={() => setHoveredPlan(index)}
            onMouseLeave={() => setHoveredPlan(null)}
          >
            {/* Ribbon for popular plan */}
            {plan.popular && (
              <div className="bg-gradient-to-r from-yellow-500 to-amber-600 dark:from-yellow-600 dark:to-amber-700 text-white py-2 px-6 absolute top-4 right-0 rounded-l-xl flex items-center shadow-md transition-colors duration-300">
                <Star size={18} className="mr-1" fill="white" />
                <span className="font-bold text-sm">Más Popular</span>
              </div>
            )}
            
            {/* Plan header with gradient background */}
            <div className={`p-6 bg-gradient-to-r ${plan.lightGradient} dark:${plan.darkGradient} text-white relative overflow-hidden transition-colors duration-300`}>
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-white bg-opacity-20 dark:bg-opacity-30 rounded-lg mr-3 transition-colors duration-300">
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                </div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="ml-1 text-white opacity-80"> COP</span>
                </div>
              </div>
              
              {/* Decorative circles in background */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white opacity-10"></div>
              <div className="absolute -right-6 -top-10 w-20 h-20 rounded-full bg-white opacity-10"></div>
            </div>
            
            <div className={`p-6 flex-1 flex flex-col ${plan.lightBgColor} dark:${plan.darkBgColor} dark:bg-opacity-30 bg-opacity-30 transition-colors duration-300`}>
              <ul className="mb-8 space-y-3 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start group">
                    <div className={`p-1 rounded-full ${
                      plan.popular 
                        ? 'bg-amber-100 dark:bg-amber-900/30' 
                        : `bg-${plan.lightAccent.split('-')[1]}-100 dark:bg-${plan.darkAccent.split('-')[1]}-900/30`
                    } mr-2 flex-shrink-0 mt-0.5 transition-all group-hover:scale-110 transition-colors duration-300`}>
                      <Check 
                        size={16} 
                        className={`${
                          plan.popular 
                            ? 'text-amber-500 dark:text-amber-400' 
                            : `${plan.lightAccent} dark:${plan.darkAccent}`
                        } transition-colors duration-300`} 
                      />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handlePlanSelect(plan.name)}
                className={`w-full flex justify-center items-center py-4 px-6 rounded-xl font-bold transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 dark:from-yellow-600 dark:to-amber-700 dark:hover:from-yellow-700 dark:hover:to-amber-800 text-white' 
                    : `bg-gradient-to-r ${plan.lightGradient} dark:${plan.darkGradient} hover:opacity-90 text-white`
                } transition-colors duration-300`}
                style={{
                  transform: hoveredPlan === index ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                <span>{plan.cta}</span>
                <ArrowRight className={`ml-2 transform transition-transform duration-300 ${hoveredPlan === index ? 'translate-x-1' : ''}`} size={18} />
              </button>
              
              {plan.name === 'eCommerce Pro' && (
                <div className="mt-4 text-center p-3 bg-green-100 dark:bg-green-900/20 rounded-xl shadow-inner dark:shadow-green-900/10 transition-colors duration-300">
                  <p className="text-green-700 dark:text-green-400 font-semibold flex items-center justify-center transition-colors duration-300">
                    <Gift className="mr-2 text-green-600 dark:text-green-500 transition-colors duration-300" size={18} />
                    ¡Logo gratis incluido!
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Benefits section */}
      <div className={`mt-20 transition-all duration-700 delay-500 transform ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h3 className="text-2xl font-bold text-center mb-10 text-gray-800 dark:text-gray-200 transition-colors duration-300">Beneficios para todos los planes</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 dark:shadow-gray-900/20 dark:border dark:border-gray-700 dark:hover:border-blue-800 transition-colors duration-300">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4 transition-colors duration-300">
                <Zap size={24} className="text-blue-600 dark:text-blue-400 transition-colors duration-300" />
              </div>
              <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200 transition-colors duration-300">Entregas rápidas</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Implementamos y entregamos tu proyecto en tiempo récord.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 dark:shadow-gray-900/20 dark:border dark:border-gray-700 dark:hover:border-purple-800 transition-colors duration-300">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-4 transition-colors duration-300">
                <Shield size={24} className="text-purple-600 dark:text-purple-400 transition-colors duration-300" />
              </div>
              <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200 transition-colors duration-300">Soporte garantizado</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Te acompañamos durante todo el proceso y después de la entrega.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 dark:shadow-gray-900/20 dark:border dark:border-gray-700 dark:hover:border-amber-800 transition-colors duration-300">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full mr-4 transition-colors duration-300">
                <Award size={24} className="text-amber-600 dark:text-amber-400 transition-colors duration-300" />
              </div>
              <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200 transition-colors duration-300">Calidad profesional</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Diseños modernos y funcionales que destacan tu marca.</p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className={`mt-20 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-2xl p-8 text-white max-w-5xl mx-auto transition-all duration-700 delay-700 transform ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-colors duration-300`}>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">¿Necesitas una solución personalizada?</h3>
            <p className="text-white text-opacity-90">Contáctanos para un presupuesto a medida</p>
          </div>
          <button 
            onClick={() => handlePlanSelect('Personalizado')}
            className="px-8 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-xl font-bold hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg transform hover:scale-105 dark:shadow-blue-900/10 transition-colors duration-300"
          >
            Solicitar información
          </button>
        </div>
      </div>
      
      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowContactModal(false)}>
          <div 
            className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full transform transition-all duration-300 animate-modalIn"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">¡Excelente elección!</h3>
              <p className="text-gray-600 mt-2">Has seleccionado el plan <span className="font-semibold">{selectedPlanName}</span></p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-blue-800 text-sm">Te contactaremos a la brevedad para brindarte más información y comenzar con tu proyecto.</p>
            </div>
            
            <div className="flex justify-between gap-4">
              <a 
                href={`https://wa.me/573022323472?text=Hola,%20estoy%20interesado%20en%20el%20plan%20${selectedPlanName}`}
                className="flex-1 bg-green-500 text-white py-3 rounded-lg font-medium text-center hover:bg-green-600 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contactar por WhatsApp
              </a>
              <button 
                onClick={() => setShowContactModal(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-modalIn {
          animation: modalIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Plans;