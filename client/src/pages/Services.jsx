import React from 'react';
import { Sparkles, MessageCircle, Phone, Scissors, CheckCircle2 } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/common/SectionHeading';
import ServiceCard from '../components/services/ServiceCard';
import { INITIAL_SERVICES } from '../data/initialData';
import { BUSINESS_CONFIG } from '../config/businessConfig';

const Services = () => {
  const steps = [
    {
      num: '01',
      title: 'Consultation & Design Idea',
      desc: 'Connect with us on WhatsApp or in-person. Share your reference designs, wedding saree details, or styling requirements.'
    },
    {
      num: '02',
      title: 'Precise Measurement',
      desc: 'We take accurate measurements or guide you through a step-by-step measurement checklist to ensure an exact fit.'
    },
    {
      num: '03',
      title: 'Master Cutting & Artisan Crafting',
      desc: 'Our experienced cutters and artisans craft your piece with refined necklines, lining, padding, and custom embroidery.'
    },
    {
      num: '04',
      title: 'Trial & Delivery',
      desc: 'Try your outfit for trial perfection. Any minor adjustments are handled promptly so you walk away completely satisfied.'
    }
  ];

  return (
    <div className="bg-white py-12 sm:py-16">
      <SEO 
        title="Bespoke Stitching & Tailoring Services" 
        description="Explore custom tailoring, bridal blouse stitching, aari embroidery, alterations, and customized outfit design at Sinduja Boutique." 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.25em] uppercase text-boutique-berry bg-boutique-blushMedium/70 mb-3 border border-boutique-pink/30">
            Atelier Craftsmanship
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-boutique-charcoal mb-3 sm:mb-4">
            Bespoke Tailoring & Services
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
            From regal bridal blouses to made-to-measure festive silhouettes, we bring your fashion aspirations to life with precision and passion.
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-6 sm:space-y-8 mb-16 sm:mb-20">
          {INITIAL_SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* How It Works Process */}
        <div className="p-5 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl bg-boutique-blush/40 border border-boutique-blushMedium">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-[11px] font-bold uppercase tracking-widest text-boutique-rose block mb-2">
              Our Process
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-boutique-charcoal">
              How Custom Stitching Works
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {steps.map((st) => (
              <div key={st.num} className="p-6 rounded-2xl bg-white border border-boutique-blushMedium/80 shadow-sm relative">
                <span className="font-serif text-3xl font-bold text-boutique-rose/30 block mb-2">
                  {st.num}
                </span>
                <h3 className="font-serif text-lg font-bold text-boutique-charcoal mb-2">
                  {st.title}
                </h3>
                <p className="text-gray-600 text-xs font-light leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick CTA */}
          <div className="mt-12 text-center">
            <a
              href={BUSINESS_CONFIG.getWhatsAppUrl('customStitching')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-boutique-berry hover:bg-boutique-deepRose transition-all shadow-luxury"
            >
              <MessageCircle className="w-4 h-4 mr-2 text-emerald-300" />
              <span>Enquire About Custom Stitching</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Services;
