import React, { useState } from 'react';
import { Maximize2, Sparkles } from 'lucide-react';
import Lightbox from '../common/Lightbox';
import SampleNoticeBadge from '../common/SampleNoticeBadge';

const ProductGallery = ({ images = [], productName = '', category = '' }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const displayImages = images && images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85'];

  return (
    <div className="space-y-4">
      {/* Main Image View */}
      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-boutique-blush border border-boutique-blushMedium shadow-card group">
        <img
          src={displayImages[selectedIdx]}
          alt={`${productName} view ${selectedIdx + 1}`}
          className="w-full h-full object-cover object-center cursor-zoom-in transition-transform duration-500 group-hover:scale-105"
          onClick={() => setIsLightboxOpen(true)}
        />

        {/* Development badge */}
        <div className="absolute top-4 left-4 z-10">
          <SampleNoticeBadge text="Demo Showcase Image" />
        </div>

        {/* Click to expand overlay button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-boutique-charcoal hover:bg-white shadow-md transition-all group-hover:scale-110 focus:outline-none"
          aria-label="View Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnail Bar */}
      {displayImages.length > 1 && (
        <div className="flex items-center space-x-3 overflow-x-auto pb-2">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                selectedIdx === idx
                  ? 'border-boutique-berry ring-2 ring-boutique-pink/30'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <Lightbox
        isOpen={isLightboxOpen}
        images={displayImages}
        currentIndex={selectedIdx}
        onClose={() => setIsLightboxOpen(false)}
        onNext={() => setSelectedIdx((prev) => (prev + 1) % displayImages.length)}
        onPrev={() => setSelectedIdx((prev) => (prev - 1 + displayImages.length) % displayImages.length)}
        title={productName}
        category={category}
      />
    </div>
  );
};

export default ProductGallery;
