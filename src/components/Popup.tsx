// src/components/Popup.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { X, MessageCircle, BellRing, AlertCircle } from 'lucide-react';

type PopupType = 'urgent' | 'reminder' | 'special';

interface PopupProps {
  uiState: {
    popupType: PopupType;
    popupMessage: string;
  };
  closePopup: () => void;
  getPopupColors: () => {
    bg: string;
    border: string;
    text: string;
    button: string;
  };
  getPopupIcon: () => JSX.Element;
}

const Popup: React.FC<PopupProps> = ({ uiState, closePopup, getPopupColors, getPopupIcon }) => {
  const { popupType, popupMessage } = uiState;

  const getPopupTitle = () => {
    switch (popupType) {
      case 'urgent':
        return '¡Actúa Rápido!';
      case 'reminder':
        return '¿Sabías que...';
      default:
        return '¡Oferta Especial!';
    }
  };

  const getPopupSubtitle = () => {
    switch (popupType) {
      case 'urgent':
        return 'Oferta válida por las próximas 24 horas';
      case 'reminder':
        return 'Más de 500 clientes satisfechos';
      default:
        return 'Oferta válida por tiempo limitado';
    }
  };

  const getActionText = () => {
    switch (popupType) {
      case 'urgent':
        return 'Quiero Aprovechar';
      case 'reminder':
        return 'Saber Más';
      default:
        return 'Obtener Descuento';
    }
  };

  const getActionUrl = () => {
    return 'https://wa.me/573022323472?text=Hola,%20estoy%20interesado%20en%20conocer%20más%20sobre%20sus%20servicios';
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`${getPopupColors().bg} ${getPopupColors().border} border-2 rounded-lg shadow-2xl p-6 max-w-md relative`}
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
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
          <div className="flex justify-center mb-4">{getPopupIcon()}</div>

          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{getPopupTitle()}</h3>

          <p className={`${getPopupColors().text} font-semibold text-xl mb-6`}>{popupMessage}</p>

          <div className="flex justify-center">
            <motion.a
              href={getActionUrl()}
              className={`${getPopupColors().button} text-white font-bold py-3 px-8 rounded-full inline-flex items-center transition-all shadow-lg`}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={20} className="mr-2" />
              {getActionText()}
            </motion.a>
          </div>

          <motion.p
            className="mt-6 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {getPopupSubtitle()}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Popup;
