import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Navigation, Info } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/businessConfig';

const MobileActionBar = () => {
  const [showLocationToast, setShowLocationToast] = useState(false);

  const handleDirectionsClick = (e) => {
    if (!BUSINESS_CONFIG.googleMapsUrl) {
      e.preventDefault();
      setShowLocationToast(true);
      setTimeout(() => setShowLocationToast(false), 3500);
    }
  };

  return (
    <>
      {/* Toast Notification when directions is clicked before map URL is configured */}
      {showLocationToast && (
        <div className="fixed bottom-20 left-4 right-4 z-50 md:hidden animate-slide-up">
          <div className="bg-boutique-charcoal text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center border border-boutique-pink/30">
            <Info className="w-4 h-4 text-boutique-pink mr-2.5 flex-shrink-0" />
            <span>Exact boutique location will be updated soon. Please WhatsApp or call us for directions!</span>
          </div>
        </div>
      )}

      {/* Sticky Mobile Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-boutique-blushMedium px-3 py-2.5 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="grid grid-cols-3 gap-2">
          
          {/* Direct Call */}
          <a
            href={BUSINESS_CONFIG.getCallUrl()}
            className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-boutique-blush text-boutique-charcoal hover:bg-boutique-blushMedium active:scale-95 transition-all text-center"
          >
            <Phone className="w-4 h-4 text-boutique-deepRose mb-1" />
            <span className="text-[11px] font-semibold tracking-wide">Call Us</span>
          </a>

          {/* WhatsApp Primary CTA */}
          <a
            href={BUSINESS_CONFIG.getWhatsAppUrl('general')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-boutique-berry text-white active:scale-95 transition-all text-center shadow-md shadow-boutique-rose/20"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300 mb-1" />
            <span className="text-[11px] font-bold tracking-wide">WhatsApp</span>
          </a>

          {/* Directions / Maps Placeholder */}
          <a
            href={BUSINESS_CONFIG.googleMapsUrl || '#'}
            target={BUSINESS_CONFIG.googleMapsUrl ? '_blank' : '_self'}
            rel="noopener noreferrer"
            onClick={handleDirectionsClick}
            className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-center active:scale-95 transition-all ${
              BUSINESS_CONFIG.googleMapsUrl 
                ? 'bg-boutique-blush text-boutique-charcoal hover:bg-boutique-blushMedium' 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            <Navigation className={`w-4 h-4 mb-1 ${BUSINESS_CONFIG.googleMapsUrl ? 'text-boutique-deepRose' : 'text-gray-400'}`} />
            <span className="text-[11px] font-medium tracking-wide">
              {BUSINESS_CONFIG.googleMapsUrl ? 'Directions' : 'Location'}
            </span>
          </a>

        </div>
      </div>
    </>
  );
};

export default MobileActionBar;
