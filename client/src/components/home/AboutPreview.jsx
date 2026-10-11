import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/businessConfig';

const AboutPreview = () => {
  const highlights = [
    "Premium Women's Ethnic & Festive Fashion",
    "Bespoke Bridal & Designer Blouse Stitching",
    "Customized Outfits tailored to your measurements",
    "Dedicated personal attention & styling consultations"
  ];

  return (
    <section className="py-16 sm:py-24 bg-boutique-blush/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Atelier Showcase Visuals */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-luxury border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85"
                  alt="Sinduja Boutique Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Founder quote pill */}
              <div className="relative sm:absolute mt-4 sm:mt-0 sm:-bottom-6 sm:-right-6 bg-white p-4 sm:p-5 rounded-2xl shadow-luxury border border-boutique-blushMedium max-w-xs mx-auto sm:mx-0">
                <div className="flex items-center space-x-2 text-boutique-berry mb-1.5">
                  <Heart className="w-4 h-4 fill-boutique-pink text-boutique-deepRose" />
                  <span className="font-serif text-sm font-bold">Personalized Service</span>
                </div>
                <p className="text-xs text-gray-600 italic leading-relaxed">
                  "Every garment should make you feel confident, poised, and distinctly yourself."
                </p>
                <p className="text-[11px] font-bold text-boutique-charcoal mt-2 tracking-wide uppercase">
                  — {BUSINESS_CONFIG.owner}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Narrative Description */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.25em] uppercase text-boutique-berry bg-boutique-blushMedium/70 border border-boutique-pink/30">
              Welcome to Sinduja Boutique
            </span>

            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-boutique-charcoal leading-tight">
              Where Elegant Fashion Meets <br />
              <span className="text-boutique-deepRose italic">Personalized Craftsmanship</span>
            </h2>

            <p className="text-gray-600 text-sm sm:text-base md:text-lg font-light leading-relaxed">
              At <strong className="font-semibold text-boutique-charcoal">{BUSINESS_CONFIG.name}</strong>, we celebrate individuality and style. Whether you are looking for timeless traditional sarees, custom-embroidered bridal blouses, regal wedding wear, or contemporary festive outfits, our boutique offers thoughtfully curated collections and meticulous bespoke tailoring.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-boutique-deepRose mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium text-boutique-charcoal">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center space-x-4">
              <Link
                to="/about"
                className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-boutique-berry hover:text-boutique-deepRose border-b-2 border-boutique-rose/50 pb-1 hover:border-boutique-berry transition-all group"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
