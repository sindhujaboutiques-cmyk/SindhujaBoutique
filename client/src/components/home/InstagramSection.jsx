import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import igLogo from '../../assets/insta-logo.png';
import { BUSINESS_CONFIG } from '../../config/businessConfig';

const InstagramSection = () => {
  const previewImages = [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80',
  ];

  return (
    <section className="py-10 sm:py-14 bg-boutique-blush/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Content */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white shadow-sm border border-boutique-pink/30 mb-3">
            <img src={igLogo} alt="Instagram" className="w-4 h-4 rounded-sm" />
            <span className="text-xs uppercase font-semibold tracking-[0.2em] text-boutique-berry">
              Follow Us on Instagram
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-boutique-charcoal mb-4">
            Join Our Fashion Community
          </h2>

          <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
            Discover our latest designs, collections, bespoke tailoring highlights, and boutique updates on Instagram.
          </p>

          <div className="mt-5">
            <a
              href={BUSINESS_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-7 py-3 rounded-full text-xs uppercase tracking-widest font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:opacity-95 transition-all shadow-md transform hover:-translate-y-0.5"
            >
              <img src={igLogo} alt="Instagram" className="w-4 h-4 mr-2 rounded-sm" />
              <span>Follow {BUSINESS_CONFIG.instagramHandle}</span>
              <ArrowUpRight className="w-4 h-4 ml-1.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
