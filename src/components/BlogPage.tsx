import React, { useState, useContext, useEffect } from 'react';
import { Calendar, Clock, Tag, User, ChevronRight, Search, ArrowRight, Heart, MessageSquare, Share2, Bookmark } from 'lucide-react';

// Asumimos que tienes un contexto de tema en tu aplicación
const ThemeContext = React.createContext({ isDark: false });

const BlogPage = () => {
  const { isDark } = useContext(ThemeContext);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Simular la carga de datos
  useEffect(() => {
    // Datos de ejemplo - normalmente vendrían de una API
    setFeaturedPosts([
      {
        id: 1,
        title: 'Cómo aumentar las ventas en tu tienda online',
        excerpt: 'Descubre las estrategias probadas para incrementar la conversión y mejorar tus ventas en línea.',
        date: '15 Feb 2025',
        readTime: '8 min',
        category: 'Estrategia',
        author: 'Carlos Méndez',
        image: 'images/pexels-pixabay-270637.jpg',
        likes: 245,
        comments: 32
      },
      {
        id: 2,
        title: 'Los errores más comunes en el ecommerce',
        excerpt: 'Evita estos errores frecuentes que pueden estar afectando el rendimiento de tu tienda virtual.',
        date: '10 Feb 2025',
        readTime: '6 min',
        category: 'Consejos',
        author: 'María Rodríguez',
        image: '/api/placeholder/800/500',
        likes: 187,
        comments: 24
      },
    ]);
    
    setRecentPosts([
      {
        id: 3,
        title: 'Optimización SEO para tiendas online',
        excerpt: 'Guía completa para mejorar el posicionamiento de tu tienda y aumentar el tráfico orgánico.',
        date: '5 Feb 2025',
        readTime: '10 min',
        category: 'Marketing',
        author: 'Laura Torres',
        image: '/api/placeholder/400/300',
        likes: 126,
        comments: 18
      },
      {
        id: 4,
        title: 'Las mejores plataformas de ecommerce en 2025',
        excerpt: 'Análisis comparativo de las plataformas más populares para crear tu tienda online.',
        date: '1 Feb 2025',
        readTime: '7 min',
        category: 'Tecnología',
        author: 'Javier López',
        image: '/api/placeholder/400/300',
        likes: 95,
        comments: 14
      },
      {
        id: 5,
        title: 'Estrategias de email marketing para ecommerce',
        excerpt: 'Cómo diseñar campañas efectivas que aumenten tus ventas y fidelicen a tus clientes.',
        date: '28 Ene 2025',
        readTime: '9 min',
        category: 'Marketing',
        author: 'Ana Gómez',
        image: '/api/placeholder/400/300',
        likes: 108,
        comments: 21
      },
      {
        id: 6,
        title: 'Tendencias en diseño web para tiendas online',
        excerpt: 'Las últimas innovaciones en diseño UX/UI para mejorar la experiencia de compra.',
        date: '22 Ene 2025',
        readTime: '5 min',
        category: 'Diseño',
        author: 'Daniel García',
        image: '/api/placeholder/400/300',
        likes: 76,
        comments: 9
      },
    ]);
    
    setCategories([
      { name: 'Marketing', count: 24 },
      { name: 'Estrategia', count: 18 },
      { name: 'Diseño', count: 12 },
      { name: 'Tecnología', count: 15 },
      { name: 'Consejos', count: 20 },
      { name: 'Casos de éxito', count: 8 },
    ]);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implementar lógica de búsqueda aquí
    console.log('Buscar:', searchTerm);
  };

  return (
    <div className={`pt-24 pb-16 ${isDark ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
      {/* Hero de Blog */}
      <div className={`w-full ${isDark ? 'bg-gray-800' : 'bg-blue-50'} mb-16`}>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Blog de VendeExpress
            </h1>
            <p className={`text-lg md:text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Recursos, consejos y estrategias para impulsar tus ventas online
            </p>
            <div className={`flex max-w-md mx-auto rounded-full overflow-hidden shadow-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full py-3 px-6 focus:outline-none ${isDark ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`}
              />
              <button 
                onClick={handleSearch}
                className={`px-6 flex items-center justify-center ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-yellow-500 hover:bg-yellow-600'} text-white transition-colors duration-300`}
              >
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Posts Destacados */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Posts Destacados</h2>
            <a href="/blog" className={`flex items-center text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors duration-300`}>
              Ver todos
              <ChevronRight size={16} className="ml-1" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map(post => (
              <div 
                key={post.id} 
                className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'}`}
              >
                <div className="relative overflow-hidden h-56">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  <div className={`absolute top-4 left-4 ${isDark ? 'bg-blue-600' : 'bg-yellow-500'} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    <a href={`/blog/${post.id}`} className="hover:underline">{post.title}</a>
                  </h3>
                  <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{post.excerpt}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <User size={14} className={`mr-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{post.author}</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex items-center">
                        <Calendar size={14} className={`mr-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className={`mr-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-opacity-10 border-gray-400">
                    <div className="flex space-x-4">
                      <button className={`flex items-center ${isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'} transition-colors duration-300`}>
                        <Heart size={16} className="mr-1" />
                        <span className="text-xs">{post.likes}</span>
                      </button>
                      <button className={`flex items-center ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'} transition-colors duration-300`}>
                        <MessageSquare size={16} className="mr-1" />
                        <span className="text-xs">{post.comments}</span>
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      <button className={`p-1 rounded ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-300`}>
                        <Share2 size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                      </button>
                      <button className={`p-1 rounded ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-300`}>
                        <Bookmark size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Columna de Posts */}
          <div className="lg:w-2/3">
            <div className="flex justify-between items-center mb-8">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Posts Recientes</h2>
              <a href="/blog/archive" className={`flex items-center text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors duration-300`}>
                Ver archivo
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
            
            <div className="space-y-8">
              {recentPosts.map(post => (
                <div 
                  key={post.id} 
                  className={`flex flex-col md:flex-row rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'}`}
                >
                  <div className="md:w-1/3 relative overflow-hidden h-48 md:h-auto">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                    <div className={`absolute top-4 left-4 ${isDark ? 'bg-blue-600' : 'bg-yellow-500'} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                      {post.category}
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      <a href={`/blog/${post.id}`} className="hover:underline">{post.title}</a>
                    </h3>
                    <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{post.excerpt}</p>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <User size={14} className={`mr-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{post.author}</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex items-center">
                          <Calendar size={14} className={`mr-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{post.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className={`mr-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4">
                        <button className={`flex items-center ${isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'} transition-colors duration-300`}>
                          <Heart size={16} className="mr-1" />
                          <span className="text-xs">{post.likes}</span>
                        </button>
                        <button className={`flex items-center ${isDark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'} transition-colors duration-300`}>
                          <MessageSquare size={16} className="mr-1" />
                          <span className="text-xs">{post.comments}</span>
                        </button>
                      </div>
                      <a 
                        href={`/blog/${post.id}`} 
                        className={`flex items-center text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors duration-300`}
                      >
                        Leer más
                        <ArrowRight size={16} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <a 
                href="/blog/page/2" 
                className={`px-6 py-3 rounded-full ${
                  isDark 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                } font-medium transition-colors duration-300 shadow-md hover:shadow-lg flex items-center`}
              >
                Cargar más artículos
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* Bloque de búsqueda */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Buscar</h3>
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full rounded-l-md py-2 px-4 focus:outline-none ${
                    isDark 
                      ? 'bg-gray-700 text-white border border-gray-600 focus:border-blue-500' 
                      : 'bg-gray-100 text-gray-900 border border-gray-200 focus:border-blue-500'
                  }`}
                />
                <button 
                  type="submit"
                  className={`px-4 rounded-r-md ${
                    isDark 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-yellow-500 hover:bg-yellow-600'
                  } text-white transition-colors duration-300`}
                >
                  <Search size={18} />
                </button>
              </form>
            </div>
            
            {/* Categorías */}
            <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Categorías</h3>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category.name}>
                    <a 
                      href={`/blog/category/${category.name.toLowerCase()}`}
                      className={`flex justify-between items-center py-2 px-3 rounded-md transition-colors duration-300 ${
                        isDark 
                          ? 'hover:bg-gray-700 text-gray-300' 
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <Tag size={14} className="mr-2" />
                        {category.name}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isDark 
                          ? 'bg-gray-700 text-gray-400' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {category.count}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Newsletter */}
            <div className={`rounded-xl p-6 ${
              isDark 
                ? 'bg-gradient-to-br from-blue-900 to-blue-800' 
                : 'bg-gradient-to-br from-blue-600 to-blue-500'
            } shadow-md text-white`}>
              <h3 className="text-lg font-bold mb-2">Suscríbete a nuestra newsletter</h3>
              <p className="text-sm mb-4 opacity-90">Recibe nuestros mejores artículos y consejos directamente en tu email.</p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="w-full rounded-md py-2 px-4 bg-white/20 backdrop-blur-sm placeholder-white placeholder-opacity-70 text-white border border-white/20 focus:border-white/50 focus:outline-none"
                />
                <button 
                  type="submit"
                  className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-300 ${
                    isDark 
                      ? 'bg-white text-blue-900 hover:bg-gray-100' 
                      : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  }`}
                >
                  Suscribirme
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;