import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Sparkles, Ruler, Feather, Crown, Palette, ArrowRight, MessageCircle } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { INITIAL_SERVICES } from '../../data/initialData';
import { BUSINESS_CONFIG } from '../../config/businessConfig';

const iconMap = {
  Scissors: Scissors,
  Sparkles: Sparkles,
  Ruler: Ruler,
  Feather: Feather,
  Crown: Crown,
  Palette: Palette
};

const ServicesSpotlight = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Atelier Services"
          title="Bespoke Tailoring & Custom Styling"
          subtitle="From intricate bridal aari work to made-to-measure blouse stitching and wardrobe alterations."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {INITIAL_SERVICES.map((service) => {
            const IconComponent = iconMap[service.icon] || Scissors;
            const whatsappUrl = BUSINESS_CONFIG.getWhatsAppUrl('service', service.name);

            return (
              <div
                key={service.id}
                className="group flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-boutique-blushLight border border-boutique-blushMedium hover:border-boutique-rose/50 hover:bg-white hover:shadow-luxury transition-all duration-300"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-boutique-blushMedium flex items-center justify-center text-boutique-berry mb-5 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] font-semibold uppercase tracking-wider text-boutique-rose block mb-1">
                    {service.tagline}
                  </span>

                  <h3 className="font-serif text-2xl font-bold text-boutique-charcoal mb-3">
                    {service.name}
                  </h3>

                  <p className="text-gray-600 text-sm font-light leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-boutique-blushMedium/60 flex items-center justify-between">
                  <Link
                    to="/services"
                    className="text-xs font-semibold text-boutique-charcoal hover:text-boutique-berry transition-colors flex items-center"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 text-boutique-rose" />
                  </Link>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-bold text-emerald-700 hover:text-emerald-800 tracking-wider uppercase"
                  >
                    <MessageCircle className="w-3.5 h-3.5 mr-1" />
                    Enquire
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-boutique-berry hover:bg-boutique-deepRose transition-all shadow-luxury"
          >
            <span>Explore All Atelier Services</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ServicesSpotlight;
