import React from 'react';

const SectionHeading = ({ 
  badge, 
  title, 
  subtitle, 
  alignment = 'center',
  className = '' 
}) => {
  const alignClasses = {
    center: 'text-center mx-auto',
    left: 'text-left mr-auto',
    right: 'text-right ml-auto'
  };

  return (
    <div className={`max-w-3xl mb-8 sm:mb-16 ${alignClasses[alignment]} ${className}`}>
      {badge && (
        <span className="inline-block px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-boutique-berry bg-boutique-blushMedium/70 mb-2.5 sm:mb-3 border border-boutique-pink/30">
          {badge}
        </span>
      )}
      
      <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-boutique-charcoal mb-3 sm:mb-4">
        {title}
      </h2>

      {subtitle && (
        <p className="text-gray-600 text-xs sm:text-base md:text-lg font-light leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Elegant Decorative underline */}
      <div className={`flex items-center space-x-2 mt-4 ${alignment === 'center' ? 'justify-center' : alignment === 'left' ? 'justify-start' : 'justify-end'}`}>
        <span className="w-12 h-[1px] bg-boutique-rose/40"></span>
        <span className="w-2 h-2 rounded-full bg-boutique-rose/70"></span>
        <span className="w-12 h-[1px] bg-boutique-rose/40"></span>
      </div>
    </div>
  );
};

export default SectionHeading;
