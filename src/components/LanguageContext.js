import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the translations object
const translations = {
  es: {
    // Navigation
    inicio: 'Inicio',
    beneficios: 'Beneficios',
    proceso: 'Proceso',
    planes: 'Planes',
    testimonios: 'Testimonios',
    faq: 'FAQ',
    contacto: 'Contacto',
    
    // Hero section
    heroTitle: 'Sitios web profesionales que venden',
    heroSubtitle: 'Creamos diseños web atractivos y funcionales para potenciar tu negocio online',
    heroButton: 'Ver nuestro portafolio',
    heroConsult: 'Consulta gratis',
    
    // Benefits section
    benefitsTitle: 'Beneficios',
    benefitsSubtitle: 'Por qué elegirnos',
    
    // Process section
    processTitle: 'Nuestro Proceso',
    processSubtitle: 'Cómo trabajamos',
    
    // Plans section
    plansTitle: 'Nuestros Planes',
    plansSubtitle: 'Soluciones para cada necesidad',
    
    // Testimonials section
    testimonialsTitle: 'Testimonios',
    testimonialsSubtitle: 'Lo que nuestros clientes dicen',
    
    // FAQ section
    faqTitle: 'Preguntas Frecuentes',
    faqSubtitle: 'Resolvemos tus dudas',
    
    // Contact section
    contactTitle: 'Contáctanos',
    contactSubtitle: 'Estamos para ayudarte',
    contactName: 'Nombre',
    contactEmail: 'Correo electrónico',
    contactMessage: 'Mensaje',
    contactSend: 'Enviar mensaje',
    
    // Popup content
    offerTitle: '¡Oferta Especial!',
    urgentTitle: '¡Actúa Rápido!',
    reminderTitle: '¿Sabías que...',
    offerButton: 'Obtener Descuento',
    urgentButton: 'Quiero Aprovechar',
    reminderButton: 'Saber Más',
    offerFooter: 'Oferta válida por tiempo limitado',
    urgentFooter: 'Oferta válida por las próximas 24 horas',
    reminderFooter: 'Más de 500 clientes satisfechos',
    
    // Cookie consent
    cookieTitle: 'Uso de cookies',
    cookieMessage: 'Utilizamos cookies para mejorar tu experiencia en nuestro sitio web.',
    cookieAccept: 'Aceptar',
    cookieLearnMore: 'Más información',
    
    // WhatsApp button
    whatsappText: 'Chatea con nosotros'
  },
  en: {
    // Navigation
    inicio: 'Home',
    beneficios: 'Benefits',
    proceso: 'Process',
    planes: 'Plans',
    testimonios: 'Testimonials',
    faq: 'FAQ',
    contacto: 'Contact',
    
    // Hero section
    heroTitle: 'Professional Websites that Sell',
    heroSubtitle: 'We create attractive and functional web designs to boost your online business',
    heroButton: 'View our portfolio',
    heroConsult: 'Free consultation',
    
    // Benefits section
    benefitsTitle: 'Benefits',
    benefitsSubtitle: 'Why choose us',
    
    // Process section
    processTitle: 'Our Process',
    processSubtitle: 'How we work',
    
    // Plans section
    plansTitle: 'Our Plans',
    plansSubtitle: 'Solutions for every need',
    
    // Testimonials section
    testimonialsTitle: 'Testimonials',
    testimonialsSubtitle: 'What our clients say',
    
    // FAQ section
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'We solve your doubts',
    
    // Contact section
    contactTitle: 'Contact Us',
    contactSubtitle: 'We are here to help',
    contactName: 'Name',
    contactEmail: 'Email',
    contactMessage: 'Message',
    contactSend: 'Send message',
    
    // Popup content
    offerTitle: 'Special Offer!',
    urgentTitle: 'Act Fast!',
    reminderTitle: 'Did you know...',
    offerButton: 'Get Discount',
    urgentButton: 'I Want This',
    reminderButton: 'Learn More',
    offerFooter: 'Offer valid for a limited time',
    urgentFooter: 'Offer valid for the next 24 hours',
    reminderFooter: 'Over 500 satisfied customers',
    
    // Cookie consent
    cookieTitle: 'Cookie Usage',
    cookieMessage: 'We use cookies to enhance your experience on our website.',
    cookieAccept: 'Accept',
    cookieLearnMore: 'Learn More',
    
    // WhatsApp button
    whatsappText: 'Chat with us'
  }
};

// Create context
const LanguageContext = createContext();

// Context provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Try to get language from localStorage
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'es'; // Default to Spanish if not set
  });

  useEffect(() => {
    // Save language preference to localStorage when it changes
    localStorage.setItem('language', language);
  }, [language]);

  // Get translation for a key
  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};