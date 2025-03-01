import React, { useState } from 'react';
import { Check, Star, Rocket, Award, LineChart, Users, Settings, Shield, Zap, Gift } from 'lucide-react';

const PremiumOffers = () => {
  const [selectedPlan, setSelectedPlan] = useState('business');
  const [showModal, setShowModal] = useState(false);

  const premiumPlans = {
    business: {
      name: "Business Premium",
      originalPrice: 1200000,
      discountPrice: 950000,
      description: "Solución completa para negocios en crecimiento",
      highlight: "RECOMENDADO",
      features: [
        "Sitio web de hasta 8 páginas personalizadas",
        "Diseño exclusivo responsive premium",
        "Dominio .com por 2 años",
        "Hosting premium por 2 años",
        "Panel de administración avanzado",
        "SEO profesional + Google My Business",
        "Blog integrado con gestión de contenidos",
        "Integración con CRM básico",
        "Sistemas de reservas o citas online",
        "Chat en vivo para atención al cliente",
        "Email profesional (hasta 5 cuentas)",
        "Soporte prioritario por 12 meses"
      ],
      regalo: "Dashboard de estadísticas personalizado"
    },
    ecommerce: {
      name: "eCommerce Premium",
      originalPrice: 1500000,
      discountPrice: 1250000,
      description: "La tienda virtual completa para impulsar tus ventas",
      highlight: "MÁS COMPLETO",
      features: [
        "Tienda online para hasta 100 productos",
        "Panel de administración avanzado",
        "Diseño premium a medida de tu marca",
        "Dominio .com por 2 años",
        "Hosting de alto rendimiento por 2 años",
        "Múltiples pasarelas de pago integradas",
        "Sistema de gestión de inventario",
        "SEO avanzado + Google Shopping",
        "Email marketing integrado",
        "Sistema de cupones y descuentos",
        "Programa de fidelización de clientes",
        "Integración con marketplaces (Mercado Libre)",
        "Soporte técnico prioritario por 12 meses"
      ],
      regalo: "Plan de marketing digital básico"
    },
    professional: {
      name: "Profesional 360°",
      originalPrice: 1800000,
      discountPrice: 1450000,
      description: "Solución integral para profesionales y consultores",
      highlight: "EXCLUSIVO",
      features: [
        "Web profesional con hasta 10 páginas",
        "Diseño premium personalizado a tu marca",
        "Dominio .com por 2 años",
        "Hosting premium por 2 años",
        "Sistema de blog avanzado para posicionamiento",
        "Agenda online y gestión de citas",
        "Automatización de recordatorios a clientes",
        "Sistema de testimonios verificados",
        "Portal de recursos para clientes",
        "Email marketing para nurturing de prospectos",
        "Integración con redes sociales profesionales",
        "CRM completo para seguimiento de clientes",
        "Soporte VIP por 12 meses"
      ],
      regalo: "Sesión de estrategia digital personalizada"
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleContactClick = () => {
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      {/* Encabezado */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">PLANES PREMIUM - OFERTA ESPECIAL</h1>
        <p className="text-lg text-gray-700 mt-2">Soluciones Premium para Pequeños Negocios</p>
        <p className="text-sm text-gray-500 mt-2">Impulsa tu negocio con nuestros planes premium diseñados específicamente para emprendedores y pequeñas empresas.</p>
        <div className="mt-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full inline-block">
          <span>20% DE DESCUENTO | Oferta por tiempo limitado</span>
        </div>
      </header>

      {/* Selector de Planes */}
      <div className="flex justify-center space-x-4 mb-8">
        {Object.keys(premiumPlans).map((planKey) => (
          <button
            key={planKey}
            onClick={() => handlePlanSelect(planKey)}
            className={`px-6 py-3 rounded-lg transition duration-300 ${
              selectedPlan === planKey ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {premiumPlans[planKey].name}
          </button>
        ))}
      </div>

      {/* Detalles del Plan Seleccionado */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{premiumPlans[selectedPlan].highlight}</h2>
          <span className="text-sm text-green-600 font-semibold">Ahorras {formatPrice(premiumPlans[selectedPlan].originalPrice - premiumPlans[selectedPlan].discountPrice)}</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{premiumPlans[selectedPlan].name}</h3>
        <p className="text-gray-600 mb-4">{premiumPlans[selectedPlan].description}</p>
        <div className="flex items-center mb-4">
          <span className="text-3xl font-bold text-blue-700 mr-2">{formatPrice(premiumPlans[selectedPlan].discountPrice)}</span>
          <span className="text-gray-400 line-through">{formatPrice(premiumPlans[selectedPlan].originalPrice)}</span>
        </div>
        <p className="text-sm text-gray-500 mb-4">Regalo exclusivo: {premiumPlans[selectedPlan].regalo}</p>
        <button
          onClick={handleContactClick}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Solicitar información
        </button>
        <p className="text-xs text-gray-500 mt-2">¿Necesitas una solución personalizada? Contáctanos para un presupuesto a medida.</p>

        {/* Características Incluidas */}
        <div className="mt-6">
          <h4 className="text-lg font-bold text-gray-800 mb-2">Características incluidas:</h4>
          <ul className="list-disc pl-6 text-gray-700">
            {premiumPlans[selectedPlan].features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Beneficios Adicionales */}
        <div className="mt-6">
          <h4 className="text-lg font-bold text-gray-800 mb-2">Beneficios adicionales:</h4>
          <ul className="flex flex-wrap gap-4">
            <li className="flex items-center text-gray-600">
              <Zap size={16} className="mr-2" /> Velocidad optimizada
            </li>
            <li className="flex items-center text-gray-600">
              <Shield size={16} className="mr-2" /> Seguridad avanzada
            </li>
            <li className="flex items-center text-gray-600">
              <Users size={16} className="mr-2" /> Usuarios ilimitados
            </li>
            <li className="flex items-center text-gray-600">
              <LineChart size={16} className="mr-2" /> Analytics incluido
            </li>
          </ul>
        </div>
      </div>

      {/* Modal de Confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold text-green-600 mb-2">¡Perfecto!</h3>
            <p className="text-gray-700">Te redirigiremos para completar tu compra con el descuento aplicado.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumOffers;