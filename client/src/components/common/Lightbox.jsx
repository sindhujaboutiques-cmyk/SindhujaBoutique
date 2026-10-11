import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/businessConfig';

const Lightbox = ({ 
  isOpen, 
  images = [], 
  currentIndex = 0, 
  onClose, 
  onNext, 
  onPrev,
  title = '',
  category = ''
}) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onNext, onPrev, onClose]);

  if (!isOpen || images.length === 0) return null;

  const currentItem = typeof images[currentIndex] === 'string' 
    ? { image: images[currentIndex], title: title, category: category } 
    : images[currentIndex];

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50 && onNext) onNext();
    if (distance < -50 && onPrev) onPrev();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-8 animate-fade-in"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Controls */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center space-x-2.5 sm:space-x-3 z-50">
        <a
          href={BUSINESS_CONFIG.getWhatsAppUrl('product', currentItem.title || 'this design')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white tracking-wider uppercase transition-colors shadow-md"
          onClick={(e) => e.stopPropagation()}
        >
          <MessageCircle className="w-3.5 h-3.5 sm:mr-1.5" />
          <span className="hidden sm:inline">Enquire this design</span>
          <span className="sm:hidden ml-1 font-bold">Enquire</span>
        </a>

        <button
          onClick={onClose}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center transition-all focus:outline-none z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 flex items-center justify-center transition-all focus:outline-none z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* Main Image Container */}
      <div 
        className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentItem.image || currentItem}
          alt={currentItem.title || 'Boutique Gallery Item'}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
        />

        {/* Caption Bar */}
        {(currentItem.title || currentItem.caption) && (
          <div className="mt-4 text-center text-white max-w-xl px-4">
            {currentItem.category && (
              <span className="text-[11px] uppercase tracking-widest text-boutique-pink font-semibold block mb-1">
                {currentItem.category}
              </span>
            )}
            <h4 className="font-serif text-lg sm:text-xl font-medium tracking-wide">
              {currentItem.title}
            </h4>
            {currentItem.caption && (
              <p className="text-gray-300 text-xs sm:text-sm mt-1 font-light">
                {currentItem.caption}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-400 text-xs font-mono tracking-widest">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default Lightbox;
