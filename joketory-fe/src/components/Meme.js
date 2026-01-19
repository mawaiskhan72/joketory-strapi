import React from 'react';
import { FaCalendarAlt, FaTag, FaImage } from 'react-icons/fa';

const Meme = ({ imageUrl, category, formattedDate, title, description }) => {
  // Handle image loading errors
  const handleImageError = (e) => {
    console.error('Error loading image:', e.target.src);
    e.target.onerror = null;
    e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Available';
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mb-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-purple-500 overflow-hidden">
      {/* Category Badge */}
      <div className="inline-block mb-4">
        <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-semibold rounded-full shadow-md">
          <FaTag className="mr-1" />
          {category || 'Meme'}
        </span>
      </div>
      
      {/* Title */}
      {title && <h3 className="text-xl font-bold text-white mb-3">{title}</h3>}
      
      {/* Meme Content */}
      <div className="mb-6">
        {/* Image */}
        <div className="mb-4 rounded-lg overflow-hidden bg-gray-900/50 flex items-center justify-center" style={{ minHeight: '200px' }}>
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title || "Meme"} 
              className="w-full h-auto max-h-96 object-contain mx-auto"
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-gray-500">
              <FaImage className="text-4xl mb-2" />
              <span>No image available</span>
            </div>
          )}
        </div>
        
        {/* Description */}
        {description && <p className="text-gray-300 text-sm mb-4">{description}</p>}
      </div>
      
      {/* Date */}
      <div className="flex items-center text-sm text-gray-400">
        <FaCalendarAlt className="mr-2" />
        <span>{formattedDate || 'Recently'}</span>
      </div>
    </div>
  );
};

export default Meme;