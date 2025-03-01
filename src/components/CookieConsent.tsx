import React, { useState, useEffect } from 'react';
import { Clock, X, Lock, Bell, Cookie, Gift, ChevronRight } from 'lucide-react';

// Simulamos las funciones de cookies que vendrían de un módulo externo
const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [offerExpired, setOfferExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showOfferCountdown, setShowOfferCountdown] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const offerDuration = 48 * 60 * 60 * 1000; // 48 horas en milisegundos

  useEffect(() => {
    // Verificar consentimiento de cookies
    const consentGiven = getCookie('cookieConsent');
    if (!consentGiven) {
      setShowConsent(true);
    }

    // Verificar tiempo de oferta
    const offerStartTime = localStorage.getItem('offerStartTime');
    if (offerStartTime) {
      const elapsedTime = Date.now() - parseInt(offerStartTime);
      if (elapsedTime >= offerDuration) {
        setOfferExpired(true);
      } else {
        setTimeRemaining(offerDuration - elapsedTime);
        setShowOfferCountdown(true);
        
        const timer = setInterval(() => {
          const remaining = offerDuration - (Date.now() - parseInt(offerStartTime));
          setTimeRemaining(remaining);
          
          if (remaining <= 0) {
            clearInterval(timer);
            setOfferExpired(true);
            setShowOfferCountdown(false);
          }
        }, 1000);
        
        return () => clearInterval(timer);
      }
    }
  }, []);

  const acceptCookies = () => {
    setCookie('cookieConsent', 'true', 30); // 30 días
    setShowConsent(false);

    if (!localStorage.getItem('offerStartTime')) {
      localStorage.setItem('offerStartTime', Date.now().toString());
      setShowOfferCountdown(true);
      setTimeRemaining(offerDuration);
    }
  };

  const rejectCookies = () => {
    setShowConsent(false);
  };

  const formatTimeRemaining = (time) => {
    if (time <= 0) return "00:00:00";
    
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const closeExpiredOffer = () => {
    setOfferExpired(false);
    localStorage.removeItem('offerStartTime');
  };

  return (
    <>
      {/* Banner de Consentimiento de Cookies */}
      {showConsent && (
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 shadow-xl z-50 animate-slide-up">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-500 text-white flex items-center justify-center rounded-full">
                  <Cookie size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Usamos cookies</h3>
                  <p className="text-sm text-gray-300">
                    Este sitio usa cookies para mejorar tu experiencia. 
                    <button 
                      className="underline ml-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                      onClick={() => setPrivacyOpen(true)}
                    >
                      Ver política de privacidad
                    </button>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={rejectCookies}
                  className="bg-transparent hover:bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Solo esenciales
                </button>
                <button
                  onClick={acceptCookies}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 py-2 rounded-lg text-sm transition-colors flex items-center gap-1"
                >
                  <span>Aceptar todas</span>
                  <ChevronRight size={16} />
                </button>
                <button
                  onClick={rejectCookies}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Cerrar"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de política de privacidad */}
      {privacyOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Política de Privacidad</h2>
              <button 
                onClick={() => setPrivacyOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="max-h-64 overflow-y-auto mb-4 pr-2">
              <div className="flex items-start gap-3 mb-4">
                <div className="mt-1 text-blue-600"><Lock size={18} /></div>
                <div>
                  <h3 className="font-medium text-gray-800">Cookies Esenciales</h3>
                  <p className="text-sm text-gray-600">Necesarias para el funcionamiento básico del sitio. No pueden ser desactivadas.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-4">
                <div className="mt-1 text-green-600"><Bell size={18} /></div>
                <div>
                  <h3 className="font-medium text-gray-800">Cookies de Preferencias</h3>
                  <p className="text-sm text-gray-600">Permiten recordar información para personalizar tu experiencia.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 text-yellow-600"><Gift size={18} /></div>
                <div>
                  <h3 className="font-medium text-gray-800">Cookies de Marketing</h3>
                  <p className="text-sm text-gray-600">Utilizadas para rastrear a los visitantes en las páginas web con el fin de mostrar anuncios relevantes.</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setPrivacyOpen(false)}
                className="bg-transparent hover:bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  acceptCookies();
                  setPrivacyOpen(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Aceptar todas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de oferta expirada */}
      {offerExpired && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} className="text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Oferta finalizada!</h3>
            <p className="text-gray-600 mb-6">
              El tiempo para obtener el 20% de descuento ha expirado. ¡Pero no te preocupes! Tenemos nuevas promociones para ti.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={closeExpiredOffer}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={closeExpiredOffer}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
              >
                Ver nuevas ofertas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Barra de cuenta regresiva */}
      {showOfferCountdown && timeRemaining > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 shadow-lg z-40 animate-slide-up">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-yellow-300" />
                <span className="font-medium">Oferta especial:</span>
                <span className="bg-white text-indigo-800 px-3 py-1 rounded-md font-mono font-bold">
                  {formatTimeRemaining(timeRemaining)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-200 font-medium">¡20% de descuento en todos los planes!</span>
                <a
                  href="/#planes"
                  className="bg-yellow-400 hover:bg-yellow-300 text-indigo-900 px-4 py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                >
                  Ver planes
                  <ChevronRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;