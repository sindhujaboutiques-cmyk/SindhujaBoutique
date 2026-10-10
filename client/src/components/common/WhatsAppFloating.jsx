import React, { useState } from 'react';
import { X } from 'lucide-react';
import waLogo from '../../assets/whatsapp-logo.png';
import { BUSINESS_CONFIG } from '../../config/businessConfig';

const WhatsAppFloating = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 flex items-center group">
      {/* Interactive Tooltip / Prompt */}
      {showTooltip && (
        <div className="hidden sm:flex items-center mr-3 bg-white text-boutique-charcoal text-xs px-3.5 py-2 rounded-full shadow-luxury border border-boutique-blushMedium animate-fade-in">
          <span className="font-medium mr-2">Need styling advice? Chat with Sinduja</span>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600 ml-1"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={BUSINESS_CONFIG.getWhatsAppUrl('general')}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-200"
        aria-label="Chat on WhatsApp with Sinduja Boutique"
      >
        <img src={waLogo} alt="WhatsApp" className="w-7 h-7 sm:w-8 sm:h-8" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
    </div>
  );
};

export default WhatsAppFloating;
