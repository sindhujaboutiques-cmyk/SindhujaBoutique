import React from 'react';
import { Scissors, Sparkles, Ruler, Feather, Crown, Palette, Check, MessageCircle, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/businessConfig';

const iconMap = {
  Scissors: Scissors,
  Sparkles: Sparkles,
  Ruler: Ruler,
  Feather: Feather,
  Crown: Crown,
  Palette: Palette
};

const ServiceCard = ({ service }) => {
  const IconComponent = iconMap[service.icon] || Scissors;
  const whatsappUrl = BUSINESS_CONFIG.getWhatsAppUrl('service', service.name);

  return (
    <div className="flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden border border-boutique-blushMedium shadow-card hover:shadow-luxury transition-all duration-300">
      {/* Visual Image */}
      <div className="lg:w-2/5 relative min-h-[260px] bg-boutique-blush">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden"></div>
      </div>

      {/* Content Area */}
      <div className="lg:w-3/5 p-6 sm:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-boutique-blushMedium flex items-center justify-center text-boutique-berry">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-boutique-rose block">
                {service.tagline || 'Boutique Service'}
              </span>
              <h3 className="font-serif text-2xl font-bold text-boutique-charcoal">
                {service.name}
              </h3>
            </div>
          </div>

          <p className="text-gray-600 text-sm font-light leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Features / Highlights */}
          {service.features && service.features.length > 0 && (
            <div className="space-y-2 mb-6">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-center text-xs text-boutique-charcoal/90">
                  <Check className="w-3.5 h-3.5 text-boutique-rose mr-2 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-boutique-blushMedium flex items-center justify-between">
          <span className="text-xs text-gray-500 font-light">
            Consultation & Measurement Available
          </span>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-boutique-berry hover:bg-boutique-deepRose transition-colors shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-300" />
            Book / Enquire
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
