import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface PortfolioModalProps {
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ onClose }) => {
  const portfolioItems = [
    {
      image: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Tienda de Ropa Online',
      description: 'Sitio web con catálogo y carrito de compras que aumentó las ventas en un 45%'
    },
    {
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Restaurante Gourmet',
      description: 'Página web con sistema de reservas que mejoró la ocupación en un 60%'
    },
    {
      image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Consultora Financiera',
      description: 'Sitio profesional que generó un 35% más de clientes potenciales'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Agencia de Marketing',
      description: 'Sitio web corporativo con portafolio interactivo y blog integrado'
    },
    {
      image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Estudio de Yoga',
      description: 'Página web con sistema de reserva de clases y membresías online'
    },
    {
      image: 'https://images.unsplash.com/photo-1556740772-1a741367b93e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      title: 'Clínica Dental',
      description: 'Sitio web médico con sistema de citas y blog informativo'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative animate-fadeIn">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X size={24} />
        </button>
        
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Nuestro Portafolio</h2>
          <p className="text-gray-600 mb-6 text-center">Ejemplos de sitios web que hemos creado para nuestros clientes</p>
          
          <div className="mb-8">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <iframe 
                width="100%" 
                height="400" 
                src="https://www.youtube.com/watch?v=WOXXQuf3jr8" 
                title="Ejemplos de sitios web" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {portfolioItems.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <a 
                    href="#" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
                  >
                    Ver sitio completo
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <a 
              href="#planes" 
              onClick={onClose}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full inline-flex items-center transition duration-300"
            >
              Quiero un sitio como estos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;