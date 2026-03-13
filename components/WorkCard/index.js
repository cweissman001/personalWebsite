import React, { useState } from "react";

const WorkCard = ({ img, name, description, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer border border-gray-200 dark:border-slate-700"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Overlay */}
      <div className="relative h-64 overflow-hidden">
        <img
          alt={name}
          className={`h-full w-full object-cover transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          src={img}
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'}`}></div>
        
        {/* Hover Content */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-2'}`}>
          <div className={`flex items-center gap-2 mb-2 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`}>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-xs font-medium text-white/90 uppercase tracking-wider">Project</span>
          </div>
          <h3 className={`text-xl font-bold text-white transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-90'}`}>
            {name || "Project Name"}
          </h3>
        </div>
        
        {/* View Project Indicator */}
        <div className={`absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {name || "Project Name"}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {description || "Description"}
        </p>
        
        {/* Call to Action */}
        <div className={`mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium transition-all duration-300 ${isHovered ? 'translate-x-1' : 'translate-x-0'}`}>
          <span className="text-sm">View Project</span>
          <svg className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      
      {/* Subtle Border Animation */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default WorkCard;
