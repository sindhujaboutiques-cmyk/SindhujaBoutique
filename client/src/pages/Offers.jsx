import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, MessageCircle, Gift, Calendar, ArrowRight } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/common/SectionHeading';
import EmptyState from '../components/common/EmptyState';
import { BUSINESS_CONFIG } from '../config/businessConfig';

const Offers = () => {
  // In dynamic mode, offers are loaded from backend/admin
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-white py-12 sm:py-16">
      <SEO 
        title="Promotions & Seasonal Offers" 
        description="Stay tuned for upcoming festive offers, wedding season discounts, and stitching promotions at Sinduja Boutique." 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.25em] uppercase text-boutique-berry bg-boutique-blushMedium/70 mb-3 border border-boutique-pink/30">
            Seasonal Promotions
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-boutique-charcoal mb-4">
            Boutique Offers & Packages
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
            Special festive promotions, bridal trousseau tailoring packages, and seasonal celebrations.
          </p>
        </div>

        {/* Dynamic Offers or Tasteful Empty State */}
        {offers.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <EmptyState
              icon={Gift}
              title="New Offers Coming Soon"
              message="We periodically offer special festival packages, complimentary styling consultations, and bridal group stitching promotions. Connect with us on WhatsApp to inquire about current packages."
              actionText="Ask on WhatsApp"
              actionHref={BUSINESS_CONFIG.getWhatsAppUrl('general')}
            />

            {/* Upcoming Promo Teaser Cards */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 rounded-2xl bg-boutique-blushLight border border-boutique-blushMedium">
                <Tag className="w-6 h-6 text-boutique-rose mx-auto mb-2" />
                <h4 className="font-serif text-base font-bold text-boutique-charcoal mb-1">Bridal Packages</h4>
                <p className="text-xs text-gray-500 font-light">Custom trousseau & wedding party stitching</p>
              </div>

              <div className="p-6 rounded-2xl bg-boutique-blushLight border border-boutique-blushMedium">
                <Sparkles className="w-6 h-6 text-boutique-rose mx-auto mb-2" />
                <h4 className="font-serif text-base font-bold text-boutique-charcoal mb-1">Festival Specials</h4>
                <p className="text-xs text-gray-500 font-light">Diwali, Pongal & Navratri collection specials</p>
              </div>

              <div className="p-6 rounded-2xl bg-boutique-blushLight border border-boutique-blushMedium">
                <Gift className="w-6 h-6 text-boutique-rose mx-auto mb-2" />
                <h4 className="font-serif text-base font-bold text-boutique-charcoal mb-1">Custom Stitching</h4>
                <p className="text-xs text-gray-500 font-light">Special combo rates for multiple blouse orders</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div key={offer.id || offer._id} className="p-6 rounded-3xl bg-white border border-boutique-blushMedium shadow-card">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-boutique-berry text-white inline-block mb-3">
                  {offer.badge || 'Offer'}
                </span>
                <h3 className="font-serif text-2xl font-bold text-boutique-charcoal mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-600 text-sm font-light mb-4">
                  {offer.description}
                </p>
                <a
                  href={BUSINESS_CONFIG.getWhatsAppUrl('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-bold text-boutique-berry uppercase tracking-wider"
                >
                  <span>Claim on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Offers;
