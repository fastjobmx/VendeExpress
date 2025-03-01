import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/573022323472?text=Hola,%20estoy%20interesado%20en%20hablar%20sobre%20la%20oferta%20de%20sitios%20web"
      className="fixed bottom-24 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg z-50 transition-all duration-300 hover:scale-110 flex items-center justify-center sm:block hidden"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp size={32} className="text-white" />
    </a>
  );
};

export default WhatsAppButton;