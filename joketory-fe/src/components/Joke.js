// src/components/Joke.js
import React from 'react';
import { FaLaughSquint, FaUserAlt, FaCalendarAlt } from 'react-icons/fa';

const Joke = ({ title, content, category, author, formattedDate }) => {
  return (
    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mb-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-pink-500">
      {/* Decorative corner elements */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute -right-8 -top-8 w-16 h-16 bg-pink-900 rounded-full opacity-10"></div>
      </div>
      
      {/* Category Badge */}
      <div className="inline-block mb-4">
        <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-semibold rounded-full shadow-md">
          <FaLaughSquint className="mr-1" />
          {category || 'General'}
        </span>
      </div>
      
      {/* Joke Content */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-3 font-sans">
          "{title}"
        </h3>
        <p className="text-gray-400 text-lg leading-relaxed">
          {content}
        </p>
      </div>
      
      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-700">
        <div className="flex items-center text-sm text-pink-400">
          <FaUserAlt className="mr-1" />
          <span>{author || 'Anonymous Joker'}</span>
        </div>
        <div className="flex items-center text-sm text-purple-400">
          <FaCalendarAlt className="mr-1" />
          <span>{formattedDate || 'Just now'}</span>
        </div>
      </div>
      
      {/* Decorative corner elements */}
      <div className="absolute bottom-0 left-0 w-16 h-16 overflow-hidden">
        <div className="absolute -left-8 -bottom-8 w-16 h-16 bg-purple-900 rounded-full opacity-10"></div>
      </div>
    </div>
  );
};

export default Joke;