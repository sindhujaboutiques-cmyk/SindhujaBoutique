import React, { useState } from 'react';
import { Maximize2, MessageCircle, Sparkles } from 'lucide-react';
import Lightbox from '../common/Lightbox';
import EmptyState from '../common/EmptyState';
import { BUSINESS_CONFIG } from '../../config/businessConfig';

const GalleryGrid = ({ items = [], loading = false }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="bg-boutique-blush/60 rounded-3xl aspect-[4/5] border border-boutique-blushMedium"></div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Gallery Updating"
        message="We are currently shooting and assembling high-resolution photographs of our recent boutique creations. Check back shortly or message us directly on WhatsApp."
        actionText="Request Gallery on WhatsApp"
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        {items.map((item, index) => (
          <div
            key={item.id || item._id || index}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/5] bg-boutique-blush border border-boutique-blushMedium shadow-card hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 cursor-pointer"
            onClick={() => setSelectedIdx(index)}
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"></div>

            {/* Category Tag */}
            <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-10">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-md text-boutique-berry shadow-sm">
                {item.category}
              </span>
            </div>

            {/* Click to expand icon */}
            <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
              <span className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center">
                <Maximize2 className="w-4 h-4" />
              </span>
            </div>

            {/* Bottom Caption & WhatsApp Trigger */}
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 text-white flex flex-col justify-end">
              <h3 className="font-serif text-sm sm:text-lg font-bold tracking-wide group-hover:text-pink-200 transition-colors mb-0.5 line-clamp-1">
                {item.title}
              </h3>
              {item.caption && (
                <p className="text-gray-300 text-[11px] sm:text-xs line-clamp-1 sm:line-clamp-2 font-light mb-2">
                  {item.caption}
                </p>
              )}

              <div className="pt-1.5 sm:pt-2 border-t border-white/20 flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] text-pink-200 uppercase tracking-wider font-semibold">
                  Tap to view
                </span>
                <a
                  href={BUSINESS_CONFIG.getWhatsAppUrl('product', item.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 sm:p-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                  title="Enquire on WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <Lightbox
          isOpen={selectedIdx !== null}
          images={items}
          currentIndex={selectedIdx}
          onClose={() => setSelectedIdx(null)}
          onNext={() => setSelectedIdx((prev) => (prev + 1) % items.length)}
          onPrev={() => setSelectedIdx((prev) => (prev - 1 + items.length) % items.length)}
        />
      )}
    </>
  );
};

export default GalleryGrid;
