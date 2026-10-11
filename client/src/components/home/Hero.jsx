import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Sparkles, ArrowRight, Scissors, Award } from 'lucide-react';
import waLogo from '../../assets/whatsapp-logo.png';
import heroSectionImg from '../../assets/hero-section-sindhuja-boutique.jpeg';
import { BUSINESS_CONFIG } from '../../config/businessConfig';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-boutique-blush via-white to-white pt-4 pb-10 lg:pt-8 lg:pb-16">
      {/* Decorative luxury gradient background glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-boutique-blushMedium/50 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-boutique-pink/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Main Brand Title & Tagline */}
            <div className="space-y-2">
              <h1 className="font-serif text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-boutique-charcoal leading-[1.08]">
                SINDUJA <span className="text-boutique-rose italic font-normal">BOUTIQUE</span>
              </h1>
              <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-boutique-deepRose tracking-wide italic font-medium">
                "{BUSINESS_CONFIG.tagline}"
              </p>
            </div>

            {/* Supporting Description */}
            <p className="max-w-xl mx-auto lg:mx-0 text-gray-600 text-sm sm:text-lg font-light leading-relaxed">
              Discover elegant fashion, handcrafted soft silks, kanchi cotton sarees, designer jewellery, cosmetics, and made-to-measure tailoring crafted to celebrate your distinctive grace.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <Link
                to="/collections"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-boutique-berry hover:bg-boutique-deepRose transition-all btn-primary-glow shadow-luxury"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              <a
                href={BUSINESS_CONFIG.getWhatsAppUrl('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-emerald-700 hover:bg-emerald-800 transition-all shadow-md"
              >
                <img src={waLogo} alt="WhatsApp" className="w-4 h-4 mr-2" />
                WhatsApp Us
              </a>

              <a
                href={BUSINESS_CONFIG.getCallUrl()}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-boutique-charcoal bg-white hover:bg-boutique-blush border border-boutique-rose/40 transition-all"
              >
                <Phone className="w-3.5 h-3.5 mr-2 text-boutique-rose" />
                Call Now
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-boutique-blushMedium grid grid-cols-3 gap-2 sm:gap-4 text-center max-w-lg mx-auto lg:mx-0">
              <div className="space-y-1">
                <span className="font-serif text-base sm:text-lg font-bold text-boutique-charcoal block">Bespoke</span>
                <span className="text-[10px] sm:text-[11px] text-gray-500 uppercase tracking-wider block font-medium leading-tight">Custom Stitching</span>
              </div>
              <div className="space-y-1 border-x border-boutique-blushMedium px-1">
                <span className="font-serif text-base sm:text-lg font-bold text-boutique-charcoal block">Bridal</span>
                <span className="text-[10px] sm:text-[11px] text-gray-500 uppercase tracking-wider block font-medium leading-tight">Specialist Cuts</span>
              </div>
              <div className="space-y-1">
                <span className="font-serif text-base sm:text-lg font-bold text-boutique-charcoal block">Personalized</span>
                <span className="text-[10px] sm:text-[11px] text-gray-500 uppercase tracking-wider block font-medium leading-tight">Styling Care</span>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Hero Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Decorative background framing ring */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-boutique-rose/25 via-boutique-pink/20 to-boutique-berry/20 rounded-[2.2rem] blur-sm -rotate-1 pointer-events-none"></div>

              {/* Main Editorial Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-boutique-blush aspect-[3/4] sm:aspect-[2/3] max-h-[460px] sm:max-h-[580px] w-full mx-auto">
                <img
                  src={heroSectionImg}
                  alt="Sinduja Boutique Signature Festive Saree Collection"
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700 ease-out"
                />

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 z-20 backdrop-blur-md bg-white/90 text-boutique-charcoal px-3.5 py-1.5 rounded-full shadow-md border border-white/70 flex items-center space-x-1.5 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-boutique-rose" />
                  <span>Exclusive Sarees & Jewels</span>
                </div>

                {/* Vignette Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none"></div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-5 left-5 right-5 text-white z-20">
                  <span className="text-[10px] tracking-[0.25em] text-pink-200 uppercase font-semibold block">
                    Sinduja Signature Collection
                  </span>
                  <p className="font-serif text-xl sm:text-2xl font-bold tracking-wide mt-0.5 drop-shadow">
                    Traditional Silks & Bespoke Tailoring
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

