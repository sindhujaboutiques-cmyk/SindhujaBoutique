import React from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/businessConfig';

const EmptyState = ({ 
  icon: Icon = Sparkles,
  title = "Coming Soon", 
  message = "We are currently curating new additions for this collection.",
  actionText = "Enquire on WhatsApp",
  actionHref = null
}) => {
  return (
    <div className="text-center py-16 px-6 max-w-lg mx-auto bg-boutique-blush/40 rounded-3xl border border-dashed border-boutique-rose/30 my-8">
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-boutique-blushMedium flex items-center justify-center text-boutique-berry">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="font-serif text-2xl font-bold text-boutique-charcoal mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6 font-light">
        {message}
      </p>
      <a
        href={actionHref || BUSINESS_CONFIG.getWhatsAppUrl('general')}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold text-white bg-boutique-berry hover:bg-boutique-deepRose transition-all shadow-md"
      >
        <MessageCircle className="w-4 h-4 mr-2 text-emerald-300" />
        {actionText}
      </a>
    </div>
  );
};

export default EmptyState;
