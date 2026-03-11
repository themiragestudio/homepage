// src/components/layout/Nav.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/models', label: 'AI模型', icon: '🤖' },
    { path: '/methodology', label: '方法论', icon: '🔬' },
    { path: '/team', label: '团队', icon: '👥' },
    { path: '/projects', label: '项目', icon: '🚀' },
    { 
      path: 'https://themiragestudio.github.io/tech-blog-astro/', 
      label: '博客', 
      icon: '📝',
      external: true 
    },
  ];

  return (
    <nav className="py-6 bg-white border-b border-gray-200 -mx-8 px-8 mb-0 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col">
          <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors">
            Mirage Studio
          </Link>
          <span className="text-xs text-gray-500">AI-Powered Research & Models</span>
        </div>
        
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            const className = `px-3 py-2 rounded-lg font-medium no-underline transition-all duration-200 flex items-center gap-2 ${
              isActive
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
            }`;
            
            if (item.external) {
              return (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                  aria-label={item.label}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              );
            }
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={className}
                aria-label={item.label}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Nav;