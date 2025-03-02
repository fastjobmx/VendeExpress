import React, { useState, useEffect, useContext } from 'react';
import { Menu, X, ChevronDown, Home, Users, Gift, Layers, CreditCard, MessageSquare, HelpCircle, Mail } from 'lucide-react';

// Asumimos que tienes un contexto de tema en tu aplicación
// Si no lo tienes, puedes adaptar este código a tu implementación
const ThemeContext = React.createContext({ isDark: false });

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // Usar el contexto de tema (ajusta esto según tu implementación)
  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Navbar background change on scroll
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Ocultar/mostrar navbar al hacer scroll
      if (currentScrollY > 100) {
        setIsVisible(currentScrollY < lastScrollY || currentScrollY < 300);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
      
      // Highlight active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = currentScrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Inicio', href: '#inicio', icon: <Home size={16} /> }, 
    { name: 'Sobre Nosotros', href: '#aboutUs', icon: <Users size={16} /> },
    { name: 'Servicios', href: '#servicios', icon: <Layers size={16} />, dropdown: [
      { name: 'Beneficios', href: '#beneficios', icon: <Gift size={16} /> },
      { name: 'Proceso', href: '#proceso', icon: <Layers size={16} /> },
      { name: 'Planes', href: '#planes', icon: <CreditCard size={16} /> },
    ]},
    { name: 'Proyectos', href: '#testimonios', icon: <MessageSquare size={16} /> },
    { name: 'FAQ', href: '#faq', icon: <HelpCircle size={16} /> },
    { name: 'Contacto', href: '#contacto', icon: <Mail size={16} /> },
  ];

  return (
    <nav 
      className={`fixed w-full z-40 transition-all duration-500 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled 
          ? isDark
            ? 'bg-gray-900/90 backdrop-blur-sm shadow-lg shadow-gray-900/20' 
            : 'bg-white/90 backdrop-blur-sm shadow-md'
          : isDark
            ? 'bg-transparent' 
            : 'bg-transparent'
      } ${
        isDark ? 'text-gray-100' : 'text-gray-800'
      } ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a 
              href="#inicio" 
              className="text-2xl font-bold transition-all duration-300 transform hover:scale-105 relative group"
            >
              <span className="text-yellow-500 group-hover:text-yellow-400">VENDE</span>
              <span className={`text-blue-600 group-hover:text-blue-500 ${isDark ? 'group-hover:text-blue-400' : ''}`}>EXPRESS</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => (
              link.dropdown ? (
                <div key={link.name} className="relative group">
                  <button 
                    className={`flex items-center px-3 py-2 rounded-md text-sm lg:text-base group-hover:bg-opacity-10 ${
                      isDark 
                        ? 'group-hover:bg-gray-700' 
                        : 'group-hover:bg-gray-100'
                    } ${
                      activeSection === link.href.substring(1) 
                        ? 'text-yellow-500 font-semibold' 
                        : isDark ? 'text-gray-200 font-medium' : 'text-gray-700 font-medium'
                    }`}
                  >
                    <span className="flex items-center">
                      <span className="mr-1.5">{link.icon}</span>
                      {link.name}
                    </span>
                    <ChevronDown size={16} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
                  </button>

                  <div 
                    className={`absolute left-0 mt-1 w-56 origin-top-left rounded-md shadow-lg ${
                      isDark ? 'bg-gray-800 ring-1 ring-gray-700' : 'bg-white ring-1 ring-black ring-opacity-5'
                    } focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2`}
                  >
                    <div className="py-1">
                      {link.dropdown.map((dropItem) => (
                        <a
                          key={dropItem.name}
                          href={dropItem.href}
                          className={`flex items-center px-4 py-2 text-sm ${
                            isDark
                              ? 'hover:bg-gray-700'
                              : 'hover:bg-gray-100'
                          } ${
                            activeSection === dropItem.href.substring(1)
                              ? 'text-yellow-500 font-semibold'
                              : isDark ? 'text-gray-200' : 'text-gray-700'
                          }`}
                        >
                          <span className="mr-2">{dropItem.icon}</span>
                          {dropItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center px-3 py-2 rounded-md text-sm lg:text-base ${
                    isDark 
                      ? 'hover:bg-gray-700 hover:bg-opacity-30' 
                      : 'hover:bg-gray-100'
                  } transition-all duration-300 ${
                    activeSection === link.href.substring(1)
                      ? 'text-yellow-500 font-semibold'
                      : isDark ? 'text-gray-200 font-medium' : 'text-gray-700 font-medium'
                  } group`}
                >
                  <span className="mr-1.5">{link.icon}</span>
                  {link.name}
                  {activeSection === link.href.substring(1) && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-gradient-to-r from-yellow-500 to-blue-500 rounded-full"></span>
                  )}
                  <span className="absolute inset-0 rounded-md bg-current opacity-0 group-hover:opacity-5 transition-opacity duration-300"></span>
                </a>
              )
            ))}
            
            <a 
              href="#contacto" 
              className={`ml-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 ${
                isDark ? 'text-white' : 'text-white'
              } px-4 py-2 rounded-md text-sm lg:text-base transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg hover:shadow-blue-600/20 relative overflow-hidden group`}
            >
              <span className="relative z-10 flex items-center">
                <Mail size={16} className="mr-1.5" />
                Contáctanos
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </a>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-md ${
                isDark 
                  ? 'hover:bg-gray-800 text-gray-200' 
                  : 'hover:bg-gray-100 text-gray-700'
              } transition-colors duration-300 focus:outline-none`}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <div 
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div 
          className={`absolute right-0 top-0 h-full w-72 ${
            isDark ? 'bg-gray-900' : 'bg-white'
          } shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 overflow-y-auto h-full">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-opacity-20 border-gray-400">
              <span className="text-xl font-bold">
                <span className="text-yellow-500">VENDE</span>
                <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>EXPRESS</span>
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-md ${
                  isDark ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                }`}
                aria-label="Cerrar menú"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-1">
              {navLinks.map((link) => (
                link.dropdown ? (
                  <div key={link.name} className="py-1 mb-2">
                    <div className={`px-3 py-2 text-sm font-medium rounded-md flex items-center ${
                      isDark ? 'text-gray-300 bg-gray-800/40' : 'text-gray-700 bg-gray-100/60'
                    }`}>
                      <span className="mr-2">{link.icon}</span>
                      {link.name}
                    </div>
                    <div className={`pl-4 border-l-2 ${
                      isDark ? 'border-gray-700' : 'border-gray-200'
                    } ml-3 mt-1 space-y-1`}>
                      {link.dropdown.map((dropItem) => (
                        <a
                          key={dropItem.name}
                          href={dropItem.href}
                          className={`block px-3 py-2 text-sm rounded-md ${
                            isDark 
                              ? 'hover:bg-gray-800 ' 
                              : 'hover:bg-gray-100'
                          } ${
                            activeSection === dropItem.href.substring(1)
                              ? 'text-yellow-500 font-semibold'
                              : isDark ? 'text-gray-300' : 'text-gray-700'
                          } flex items-center`}
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="mr-2">{dropItem.icon}</span>
                          {dropItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`flex items-center px-3 py-2 text-sm rounded-md ${
                      isDark 
                        ? 'hover:bg-gray-800' 
                        : 'hover:bg-gray-100'
                    } ${
                      activeSection === link.href.substring(1)
                        ? `${isDark ? 'bg-gray-800/50' : 'bg-gray-100/80'} text-yellow-500 font-semibold`
                        : isDark ? 'text-gray-300 font-medium' : 'text-gray-700 font-medium'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.name}
                  </a>
                )
              ))}
              
              <div className="pt-4 mt-4 border-t border-opacity-20 border-gray-400">
                <a 
                  href="#contacto" 
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-3 rounded-md text-sm transition-all duration-300 flex items-center justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  <Mail size={16} className="mr-2" />
                  Contáctanos
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;