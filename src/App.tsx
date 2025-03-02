import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { X, MessageCircle, BellRing, AlertCircle, Loader, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { setCookie, getCookie } from './utils/cookies';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Lazy load components for better performance
const Hero = lazy(() => import('./components/Hero'));
const Benefits = lazy(() => import('./components/Benefits'));
const Plans = lazy(() => import('./components/Plans'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));
const WorkProcess = lazy(() => import('./components/WorkProcess'));
const FAQ = lazy(() => import('./components/FAQ'));
const PortfolioModal = lazy(() => import('./components/PortfolioModal'));
const CookieConsent = lazy(() => import('./components/CookieConsent'));
const AboutUs = lazy(() => import('./components/AboutUs')); // Usamos lazy loading si es necesario BlogPage
const BlogPage = lazy(() => import('./components/BlogPage')); // Usamos lazy loading si es necesario 


// Loading spinner component with improved visual appeal and dark mode support
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
    <Loader size={48} className="text-indigo-600 dark:text-indigo-400 animate-spin" />
    <p className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium animate-pulse">Cargando experiencia...</p>
  </div>
);

function App() {
  // State management with improved organization
  const [uiState, setUiState] = useState({
    showPopup: false,
    exitIntent: false,
    showPortfolioModal: false,
    popupMessage: '',
    popupType: 'offer', // 'offer', 'urgent', 'reminder'
    activeSection: 'inicio',
    cookieAccepted: getCookie('cookieAccepted') === 'true',
    darkMode: localStorage.getItem('darkMode') === 'true'
  });

  // Observer reference for tracking sections
  const sectionRefs = useRef({});
  
  // Observer for intersection detection
  const observer = useRef(null);

  // Enhanced offer messages with better marketing copy and personalization
  const messages = {
    offer: [
      '¡Oferta Exclusiva! 20% de descuento en todos nuestros planes Premium si contratas hoy.',
      '¡Promoción Relámpago! 15% de descuento + dominio gratis por tiempo limitado.',
      '¡Oferta Especial! Contrata ahora y recibe 3 meses de mantenimiento gratuito.'
    ],
    urgent: [
      '¡Solo quedan 2 cupos para diseños web este mes! Agenda tu consulta ahora.',
      '¡Últimas 24 horas! Nuestros precios aumentarán mañana. Asegura tu tarifa actual.',
      '¡Cierre de campaña! Esta oferta termina a medianoche.'
    ],
    reminder: [
      'Tu diseño web podría estar listo en solo 14 días. ¿Comenzamos?',
      '95% de nuestros clientes aumentan sus ventas en el primer trimestre.',
      'Tu competencia ya está online. No te quedes atrás.'
    ]
  };

  // Apply dark mode to HTML element with improved implementation
  useEffect(() => {
    // This ensures the dark mode is consistently applied across the entire application
    if (uiState.darkMode) {
      document.documentElement.classList.add('dark');
      // Force re-render of any components that might not be properly respecting the dark mode
      document.querySelectorAll('[class*="dark:"]').forEach(el => {
        el.classList.add('dark-mode-active');
      });
    } else {
      document.documentElement.classList.remove('dark');
      document.querySelectorAll('.dark-mode-active').forEach(el => {
        el.classList.remove('dark-mode-active');
      });
    }
    
    // Store the current mode to ensure consistency across page refreshes
    localStorage.setItem('darkMode', uiState.darkMode.toString());
  }, [uiState.darkMode]);

  // Initialize Intersection Observer for smoother section tracking
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setUiState(prev => ({ ...prev, activeSection: sectionId }));
          }
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0px -10% 0px' }
    );

    // Observe all sections
    Object.values(sectionRefs.current).forEach(element => {
      if (element) observer.current.observe(element);
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  // Popup management with improved logic and performance
  useEffect(() => {
    // Check if popup has been shown recently
    const popupShown = sessionStorage.getItem('popupShown') === 'true';
    const now = new Date().getTime();
    const lastPopupTime = parseInt(sessionStorage.getItem('lastPopupTime') || '0');
    const timeElapsed = now - lastPopupTime;
    const minTimeBetweenPopups = 30 * 60 * 1000; // 30 minutes in milliseconds

    // Choose popup type strategically based on time on page and user behavior
    const selectPopupType = () => {
      const timeOnPage = performance.now() / 1000; // Time in seconds
      
      // If user has spent significant time, offer reminder
      if (timeOnPage > 120) return 'reminder';
      
      // If user has browsed multiple sections, offer urgent deal
      if (localStorage.getItem('sectionsViewed') > 2) return 'urgent';
      
      // Default to regular offer
      return 'offer';
    };

    // Show initial popup after delay if conditions met
    if (!popupShown || timeElapsed > minTimeBetweenPopups) {
      const timer = setTimeout(() => {
        const type = selectPopupType();
        const messageArr = messages[type];
        const randomMessage = messageArr[Math.floor(Math.random() * messageArr.length)];
        
        setUiState(prev => ({
          ...prev,
          popupType: type,
          popupMessage: randomMessage,
          showPopup: true
        }));
        
        sessionStorage.setItem('popupShown', 'true');
        sessionStorage.setItem('lastPopupTime', now.toString());
      }, 15000); // 15 seconds delay

      return () => clearTimeout(timer);
    }

    // Exit intent detection with improved sensitivity and reduced false positives
    const handleMouseLeave = (e) => {
      // Only trigger if moving cursor to top of window quickly
      if (
        e.clientY <= 5 && 
        !uiState.exitIntent && 
        (!popupShown || timeElapsed > minTimeBetweenPopups) &&
        performance.now() > 10000 // Only after 10 seconds on page
      ) {
        const type = 'urgent'; // Always use urgent messaging for exit intent
        const messageArr = messages[type];
        const randomMessage = messageArr[Math.floor(Math.random() * messageArr.length)];
        
        setUiState(prev => ({
          ...prev,
          popupType: type,
          popupMessage: randomMessage,
          showPopup: true,
          exitIntent: true
        }));
        
        sessionStorage.setItem('popupShown', 'true');
        sessionStorage.setItem('lastPopupTime', now.toString());
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [uiState.exitIntent, messages]);

  // Track viewed sections for better targeting
  useEffect(() => {
    const currentCount = parseInt(localStorage.getItem('sectionsViewed') || '0');
    localStorage.setItem('sectionsViewed', (currentCount + 1).toString());
  }, [uiState.activeSection]);

  // Event handlers
  const closePopup = () => {
    setUiState(prev => ({ ...prev, showPopup: false }));
    // Reset exit intent after short delay
    setTimeout(() => setUiState(prev => ({ ...prev, exitIntent: false })), 30000); // 30 seconds
  };

  const openPortfolioModal = () => setUiState(prev => ({ ...prev, showPortfolioModal: true }));
  const closePortfolioModal = () => setUiState(prev => ({ ...prev, showPortfolioModal: false }));
  
  const acceptCookies = () => {
    setCookie('cookieAccepted', 'true', 365 * 24 * 60 * 60); // 1 year
    setUiState(prev => ({ ...prev, cookieAccepted: true }));
  };

  const toggleDarkMode = () => {
    const newDarkMode = !uiState.darkMode;
    setUiState(prev => ({ ...prev, darkMode: newDarkMode }));
  };

  // Assign section refs
  const setSectionRef = (id) => (el) => {
    if (el && !sectionRefs.current[id]) {
      sectionRefs.current[id] = el;
      if (observer.current) observer.current.observe(el);
    }
  };

  // Helper to select appropriate popup icon
  const getPopupIcon = () => {
    switch(uiState.popupType) {
      case 'urgent':
        return <AlertCircle size={28} className="text-red-500 dark:text-red-400" />;
      case 'reminder':
        return <BellRing size={28} className="text-indigo-500 dark:text-indigo-400" />;
      case 'offer':
      default:
        return <MessageCircle size={28} className="text-indigo-500 dark:text-indigo-400" />;
    }
  };

  // Helper to get popup color scheme - unified to match site theme with dark mode support
  const getPopupColors = () => {
    switch(uiState.popupType) {
      case 'urgent':
        return {
          bg: uiState.darkMode ? 'bg-red-900 bg-opacity-30' : 'bg-red-50',
          border: uiState.darkMode ? 'border-red-800' : 'border-red-200',
          button: uiState.darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600',
          text: uiState.darkMode ? 'text-red-400' : 'text-red-600'
        };
      case 'reminder':
        return {
          bg: uiState.darkMode ? 'bg-indigo-900 bg-opacity-30' : 'bg-indigo-50',
          border: uiState.darkMode ? 'border-indigo-800' : 'border-indigo-200',
          button: uiState.darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600',
          text: uiState.darkMode ? 'text-indigo-400' : 'text-indigo-600'
        };
      case 'offer':
      default:
        return {
          bg: uiState.darkMode ? 'bg-indigo-900 bg-opacity-30' : 'bg-indigo-50',
          border: uiState.darkMode ? 'border-indigo-800' : 'border-indigo-200',
          button: uiState.darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600',
          text: uiState.darkMode ? 'text-indigo-400' : 'text-indigo-600'
        };
    }
  };

  // Animation variants for consistent animations
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  // Consistent section styling with proper dark mode support
  const getSectionClass = (isAlt) => {
    return isAlt 
      ? "py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300" 
      : "py-20 bg-white dark:bg-gray-900 transition-colors duration-300";
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Navbar with active section highlighting - ensure dark mode is passed as prop */}
      <Navbar activeSection={uiState.activeSection} darkMode={uiState.darkMode} />
      
      {/* Dark mode toggle button with improved styling and accessibility */}
      <motion.button 
        className="fixed top-20 right-4 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg text-indigo-600 dark:text-indigo-400 ring-1 ring-gray-200 dark:ring-gray-700 transition-colors duration-300"
        onClick={toggleDarkMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={uiState.darkMode ? "Activar modo claro" : "Activar modo oscuro"}
      >
        {uiState.darkMode ? <Sun size={22} /> : <Moon size={22} />}
      </motion.button>
      
      <Suspense fallback={<LoadingSpinner />}>
        <main className="transition-colors duration-300">
          {/* Hero Section */}
          <section 
            id="inicio" 
            ref={setSectionRef('inicio')}
            className="relative dark:bg-gray-900 transition-colors duration-300"
          >
            <Hero openPortfolioModal={openPortfolioModal} darkMode={uiState.darkMode} />
          </section>

          {/* Benefits Section */}
          <section 
            id="beneficios" 
            ref={setSectionRef('beneficios')} 
            className={getSectionClass(true)}
          >
            <motion.div
              variants={fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="transition-colors duration-300"
            >
              <Benefits darkMode={uiState.darkMode} />
            </motion.div>
          </section>

          {/* Work Process Section */}
          <section 
            id="proceso" 
            ref={setSectionRef('proceso')} 
            className={getSectionClass(false)}
          >
            <motion.div
              variants={fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="transition-colors duration-300"
            >
              <WorkProcess darkMode={uiState.darkMode} />
            </motion.div>
          </section>

          {/* Plans Section */}
          <section 
            id="planes" 
            ref={setSectionRef('planes')} 
            className={getSectionClass(true)}
          >
            <motion.div
              variants={fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="transition-colors duration-300"
            >
              <Plans darkMode={uiState.darkMode} />
            </motion.div>
          </section>

          {/* Testimonials Section */}
          <section 
            id="testimonios" 
            ref={setSectionRef('testimonios')} 
            className={getSectionClass(false)}
          >
            <motion.div
              variants={fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="transition-colors duration-300"
            >
              <Testimonials darkMode={uiState.darkMode} />
            </motion.div>
          </section>

          {/* FAQ Section */}
          <section 
            id="faq" 
            ref={setSectionRef('faq')} 
            className={getSectionClass(true)}
          >
            <motion.div
              variants={fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="transition-colors duration-300"
            >
              <FAQ darkMode={uiState.darkMode} />
            </motion.div>
          </section>

          {/* Contact Section */}
          <section 
            id="contacto" 
            ref={setSectionRef('contacto')} 
            className={getSectionClass(false)}
          >
            <motion.div
              variants={fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="transition-colors duration-300"
            >
              <Contact darkMode={uiState.darkMode} />
            </motion.div>
          </section>

          {/* AboutUs Section */}
          <section 
            id="aboutUs" 
            ref={setSectionRef('aboutUs')} 
            className={getSectionClass(false)}
          >
            <motion.div
              variants={fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="transition-colors duration-300"
            >
              <AboutUs darkMode={uiState.darkMode} />
            </motion.div>
          </section>

          {/* BlogPage Section */}
          <section 
            id="blogpage" 
            ref={setSectionRef('blogpage')} 
            className={getSectionClass(false)}
          >
            <motion.div
              variants={fadeInUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="transition-colors duration-300"
            >
              <BlogPage darkMode={uiState.darkMode} />
            </motion.div>
          </section>

          {/* Special Offer Section has been removed as requested */}
        </main>
      </Suspense> 

      {/* Footer with dark mode prop */}
      <Footer darkMode={uiState.darkMode} />
      
      {/* WhatsApp Button with enhanced pulse animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20, 
          delay: 1.5 
        }}
        className="fixed bottom-6 right-6 z-40"
      >
        <WhatsAppButton darkMode={uiState.darkMode} />
      </motion.div>

      {/* Popup for special offer with improved AnimatePresence for smoother transitions */}
      <AnimatePresence mode="wait">
        {uiState.showPopup && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={`${getPopupColors().bg} ${getPopupColors().border} border-2 rounded-lg shadow-2xl p-6 max-w-md relative transition-colors duration-300`}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
            >
              <button 
                onClick={closePopup}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="Cerrar"
              >
                <X size={24} />
              </button>
              
              <div className="text-center pt-2">
                <div className="flex justify-center mb-4">
                  {getPopupIcon()}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">
                  {uiState.popupType === 'urgent' ? '¡Actúa Rápido!' : 
                   uiState.popupType === 'reminder' ? '¿Sabías que...' : 
                   '¡Oferta Especial!'}
                </h3>
                
                <p className={`${getPopupColors().text} font-semibold text-xl mb-6 transition-colors duration-300`}>
                  {uiState.popupMessage}
                </p>
                
                <div className="flex justify-center">
                  <motion.a 
                    href="https://wa.me/573022323472?text=Hola,%20estoy%20interesado%20en%20conocer%20más%20sobre%20sus%20servicios"
                    className={`${getPopupColors().button} text-white font-bold py-3 px-8 rounded-full inline-flex items-center transition-all shadow-lg`}
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle size={20} className="mr-2" />
                    {uiState.popupType === 'urgent' ? 'Quiero Aprovechar' : 
                     uiState.popupType === 'reminder' ? 'Saber Más' : 
                     'Obtener Descuento'}
                  </motion.a>
                </div>
                
                <motion.p 
                  className="mt-6 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {uiState.popupType === 'urgent' ? 'Oferta válida por las próximas 24 horas' : 
                   uiState.popupType === 'reminder' ? 'Más de 500 clientes satisfechos' : 
                   'Oferta válida por tiempo limitado'}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portfolio Modal with improved animation */}
      <AnimatePresence>
        {uiState.showPortfolioModal && (
          <PortfolioModal onClose={closePortfolioModal} darkMode={uiState.darkMode} />
        )}
      </AnimatePresence>

      {/* Cookie Consent with animation and dark mode support */}
      {!uiState.cookieAccepted && <CookieConsent onAccept={acceptCookies} darkMode={uiState.darkMode} />}
    </div>
  );
}

export default App;