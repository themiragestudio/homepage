// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="text-xl font-bold text-gray-900">Mirage Studio</div>
            <p className="text-gray-500 text-sm">AI-Human Collaboration · Methodological Precision · Accelerated Insights</p>
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <Link to="/" className="hover:text-indigo-600 transition-colors no-underline">首页</Link>
            <Link to="/models" className="hover:text-indigo-600 transition-colors no-underline">AI模型</Link>
          </div>
          <div className="text-gray-500 text-sm">
            &copy; {currentYear} Mirage Studio
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
