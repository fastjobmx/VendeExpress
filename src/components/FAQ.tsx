import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X, MessageSquare, Check, ExternalLink } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', question: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const answerRefs = useRef([]);
  const searchInputRef = useRef(null);

  const categories = ['Todos', 'Sitios Web', 'E-commerce', 'Marketing', 'Soporte', 'Precios'];

  const faqs = [
    {
      question: '¿Cuánto tiempo toma crear mi sitio web?',
      answer: 'Nuestro proceso está optimizado para entregar tu sitio web en tan solo <strong>48 horas</strong> después de recibir toda la información necesaria. Para proyectos más complejos o con requisitos especiales, el tiempo puede variar ligeramente.',
      category: 'Sitios Web',
      icon: '⏱️',
      popular: true
    },
    {
      question: '¿Qué necesito para comenzar?',
      answer: 'Para iniciar el proceso, solo necesitamos que nos proporciones:<ul class="list-disc pl-5 mt-2 space-y-1 dark:text-gray-300"><li>Información básica sobre tu negocio</li><li>Preferencias de diseño</li><li>Contenido que deseas incluir (textos, imágenes, logotipo)</li></ul>Nosotros nos encargamos de todo lo demás.',
      category: 'Sitios Web',
      icon: '🚀'
    },
    {
      question: '¿Puedo actualizar mi sitio web después?',
      answer: 'Sí, todos nuestros sitios web incluyen un <strong>panel de administración fácil de usar</strong> que te permite actualizar contenido, añadir imágenes y realizar cambios básicos sin conocimientos técnicos. También ofrecemos servicios de mantenimiento si prefieres que nosotros realicemos las actualizaciones.',
      category: 'Sitios Web',
      icon: '🔄',
      popular: true
    },
    {
      question: '¿Qué incluye el hosting y dominio?',
      answer: 'El <strong>hosting</strong> incluye el alojamiento de tu sitio web en servidores de alta velocidad con un 99.9% de tiempo de actividad garantizado. El <strong>dominio</strong> es la dirección web de tu sitio (www.tunegocio.com). Ambos están incluidos en todos nuestros planes por el período especificado.',
      category: 'Sitios Web',
      icon: '🌐'
    },
    {
      question: '¿Qué es SEO y por qué es importante?',
      answer: '<strong>SEO</strong> (Search Engine Optimization) es el proceso de optimizar tu sitio web para que aparezca en los primeros resultados de búsqueda en Google y otros buscadores. Es crucial porque:<ul class="list-disc pl-5 mt-2 space-y-1 dark:text-gray-300"><li>Aumenta la visibilidad de tu negocio</li><li>Atrae más visitantes y potenciales clientes</li><li>No requiere costo adicional de publicidad</li></ul>',
      category: 'Marketing',
      icon: '📊',
      popular: true
    },
    {
      question: '¿Ofrecen soporte técnico después de la entrega?',
      answer: 'Sí, todos nuestros planes incluyen <strong>soporte técnico</strong> por el período especificado (desde 1 mes hasta 6 meses, dependiendo del plan). Después de este período, ofrecemos planes de mantenimiento a precios accesibles para continuar brindándote asistencia.',
      category: 'Soporte',
      icon: '🛠️'
    },
    {
      question: '¿Cuáles son los métodos de pago aceptados?',
      answer: 'Aceptamos múltiples métodos de pago para tu comodidad:<ul class="list-disc pl-5 mt-2 space-y-1 dark:text-gray-300"><li>Tarjetas de crédito/débito</li><li>PayPal</li><li>Transferencia bancaria</li><li>Pago en efectivo (solo para clientes locales)</li></ul>Ofrecemos facilidades de pago en cuotas para todos nuestros planes.',
      category: 'Precios',
      icon: '💳'
    },
    {
      question: '¿Puedo migrar mi tienda online existente?',
      answer: 'Sí, ofrecemos servicios de <strong>migración de tiendas online</strong> existentes. Nuestro equipo técnico transferirá todos tus productos, categorías, imágenes, clientes y pedidos a la nueva plataforma sin pérdida de información. El proceso de migración suele tardar entre 2-5 días dependiendo del tamaño de tu catálogo.',
      category: 'E-commerce',
      icon: '📦'
    },
    {
      question: '¿Las tiendas online incluyen pasarelas de pago?',
      answer: 'Sí, todas nuestras tiendas online incluyen integración con las principales <strong>pasarelas de pago</strong> como:<ul class="list-disc pl-5 mt-2 space-y-1 dark:text-gray-300"><li>PayPal</li><li>Stripe</li><li>Mercado Pago</li><li>Transferencia bancaria</li></ul>Podemos configurar pasarelas adicionales según tus necesidades específicas.',
      category: 'E-commerce',
      icon: '💰',
      popular: true
    },
    {
      question: '¿Ofrecen servicios de marketing digital?',
      answer: 'Sí, complementamos nuestros servicios de desarrollo web con <strong>estrategias de marketing digital</strong> que incluyen:<ul class="list-disc pl-5 mt-2 space-y-1 dark:text-gray-300"><li>Gestión de redes sociales</li><li>Campañas de Google Ads</li><li>Email marketing</li><li>Contenido SEO</li></ul>Consulta nuestros paquetes de marketing para más información.',
      category: 'Marketing',
      icon: '📱'
    }
  ];

  useEffect(() => {
    if (searchTerm) {
      const results = faqs.filter(
        faq => 
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFaqs(results);
    } else {
      setFilteredFaqs(
        activeCategory === 'Todos' 
          ? faqs 
          : faqs.filter(faq => faq.category === activeCategory)
      );
    }
  }, [searchTerm, activeCategory]);

  useEffect(() => {
    // Iniciar con todos los FAQs
    setFilteredFaqs(
      activeCategory === 'Todos' 
        ? faqs 
        : faqs.filter(faq => faq.category === activeCategory)
    );
  }, []);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario a un servidor
    setFormSubmitted(true);
    setTimeout(() => {
      setShowContactForm(false);
      setFormData({ name: '', email: '', question: '' });
      setFormSubmitted(false);
    }, 3000);
  };

  const popularFaqs = faqs.filter(faq => faq.popular);
  const displayFaqs = filteredFaqs.length > 0 ? filteredFaqs : [];

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-300">
            Preguntas Frecuentes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
            Resolvemos tus dudas para que tomes la mejor decisión para tu negocio
          </p>
          
          {/* Buscador */}
          <div className="max-w-xl mx-auto mt-8 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar una pregunta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                ref={searchInputRef}
                className="w-full p-4 pl-12 pr-10 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 focus:border-yellow-500 dark:focus:border-yellow-400 outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                aria-label="Buscar una pregunta"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
              {searchTerm && (
                <button 
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          
          {/* Categorías */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-yellow-500 dark:bg-yellow-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Preguntas más populares */}
        {searchTerm === '' && activeCategory === 'Todos' && (
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6 text-center transition-colors duration-300">Preguntas más frecuentes</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {popularFaqs.map((faq, index) => (
                <div 
                  key={`popular-${index}`} 
                  className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-500 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-3 mt-1">{faq.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">{faq.question}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 transition-colors duration-300">{faq.answer.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                      <a 
                        href={`#faq-detail-${faqs.indexOf(faq)}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const actualIndex = displayFaqs.indexOf(faq);
                          if (actualIndex !== -1) {
                            toggleQuestion(actualIndex);
                            setTimeout(() => {
                              answerRefs.current[faqs.indexOf(faq)]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }, 100);
                          }
                        }}
                        className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-2 inline-flex items-center hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                      >
                        Ver respuesta completa
                        <ExternalLink size={14} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Preguntas principales */}
        <div className="max-w-3xl mx-auto">
          {displayFaqs.length > 0 ? (
            displayFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const actualIndex = faqs.indexOf(faq);
              
              return (
                <div 
                  key={actualIndex} 
                  id={`faq-detail-${actualIndex}`}
                  className={`mb-4 border rounded-xl overflow-hidden transition-all duration-300 ${
                    isOpen 
                      ? 'border-yellow-300 dark:border-yellow-500 shadow-md bg-white dark:bg-gray-800' 
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-200 dark:hover:border-blue-500 hover:shadow-sm'
                  }`}
                >
                  <button
                    className="w-full flex justify-between items-center p-5 text-left focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 focus:ring-inset"
                    onClick={() => toggleQuestion(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${actualIndex}`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3 flex-shrink-0">{faq.icon}</span>
                      <span className="font-semibold text-lg text-gray-800 dark:text-gray-100 transition-colors duration-300">{faq.question}</span>
                    </div>
                    <div className="flex items-center">
                      {faq.popular && (
                        <span className="mr-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 text-xs font-medium px-2 py-1 rounded-full transition-colors duration-300">Popular</span>
                      )}
                      <ChevronDown className={`flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180 text-yellow-500 dark:text-yellow-400' : 'text-gray-400 dark:text-gray-500'
                      }`} />
                    </div>
                  </button>
                  
                  <div 
                    id={`faq-answer-${actualIndex}`}
                    ref={el => answerRefs.current[actualIndex] = el}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    style={{
                      maxHeight: isOpen ? `${answerRefs.current[actualIndex]?.scrollHeight}px` : '0px'
                    }}
                  >
                    <div className="p-5 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
                      <div 
                        className="text-gray-600 dark:text-gray-300 prose dark:prose-invert transition-colors duration-300"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                          ¿Te fue útil esta respuesta?
                          <div className="flex space-x-2 mt-1">
                            <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-gray-600 dark:text-gray-300 text-xs font-medium flex items-center transition-colors duration-200">
                              <Check size={14} className="mr-1" /> Sí
                            </button>
                            <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-gray-600 dark:text-gray-300 text-xs font-medium transition-colors duration-200">No</button>
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500 dark:text-gray-400 transition-colors duration-300">Categoría: </span>
                          <span className="text-blue-600 dark:text-blue-400 font-medium transition-colors duration-300">{faq.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 transition-colors duration-300">
              <p className="text-gray-500 dark:text-gray-400 transition-colors duration-300">No se encontraron resultados para "{searchTerm}"</p>
              <button 
                onClick={clearSearch}
                className="mt-4 px-4 py-2 bg-yellow-500 dark:bg-yellow-600 text-white rounded-md hover:bg-yellow-600 dark:hover:bg-yellow-700 transition-all duration-200"
              >
                Limpiar búsqueda
              </button>
            </div>
          )}
        </div>
        
        {/* Sección de contacto */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm max-w-3xl mx-auto transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 transition-colors duration-300">¿No encuentras lo que buscas?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">Nuestro equipo está listo para responder cualquier otra pregunta que tengas</p>
            
            {!showContactForm ? (
              <button 
                onClick={() => setShowContactForm(true)}
                className="inline-flex items-center px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white font-medium rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
              >
                <MessageSquare size={18} className="mr-2" />
                Hacer una pregunta
              </button>
            ) : formSubmitted ? (
              <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center max-w-md mx-auto transition-colors duration-300">
                <Check size={24} className="text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-300 transition-colors duration-300">¡Pregunta enviada!</p>
                  <p className="text-green-600 dark:text-green-400 text-sm transition-colors duration-300">Te responderemos a la brevedad.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto text-left">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="question" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">Tu pregunta</label>
                  <textarea
                    id="question"
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
                  ></textarea>
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-yellow-500 dark:bg-yellow-600 text-white font-medium rounded-lg hover:bg-yellow-600 dark:hover:bg-yellow-500 transition-all duration-200 transform hover:scale-105 active:scale-95"
                  >
                    Enviar pregunta
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="py-3 px-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;