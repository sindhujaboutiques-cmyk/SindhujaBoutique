import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Sparkles, ArrowRight, Heart } from 'lucide-react';
import SEO from '../components/common/SEO';
import Hero from '../components/home/Hero';
import AboutPreview from '../components/home/AboutPreview';
import FeaturedCollections from '../components/home/FeaturedCollections';
import NewArrivalsSection from '../components/home/NewArrivalsSection';
import ServicesSpotlight from '../components/home/ServicesSpotlight';
import InstagramSection from '../components/home/InstagramSection';
import { BUSINESS_CONFIG } from '../config/businessConfig';

const Home = () => {
  return (
    <div>
      <SEO 
        title="Home" 
        description="Welcome to Sinduja Boutique. Your Style. Your Rule. Explore luxury sarees, bridal wear, custom stitching and bespoke designer blouses." 
      />

      {/* Hero Section */}
      <Hero />

      {/* About Preview */}
      <AboutPreview />

      {/* Featured Collections Showcase */}
      <FeaturedCollections />

      {/* Fresh New Arrivals */}
      <NewArrivalsSection />

      {/* Atelier Services Spotlight */}
      <ServicesSpotlight />

      {/* Instagram Community Section */}
      <InstagramSection />

      {/* Luxury Bottom Call to Action */}
      <section className="py-14 sm:py-20 bg-gradient-to-r from-boutique-berry via-boutique-deepRose to-boutique-berry text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4 sm:space-y-6">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-pink-200 bg-white/10 border border-white/20">
            Visit Our Showroom or Chat Directly
          </span>

          <h2 className="font-serif text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Ready to Design Your <br />
            <span className="text-pink-200 italic font-normal">Dream Outfit?</span>
          </h2>

          <p className="text-pink-100 text-xs sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Connect with Sinduja on WhatsApp for personalized styling advice, bridal consultations, bespoke blouse designing, or custom stitching requests.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <a
              href={BUSINESS_CONFIG.getWhatsAppUrl('general')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-boutique-charcoal bg-white hover:bg-pink-50 transition-all shadow-2xl transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 mr-2 text-emerald-600" />
              Chat on WhatsApp ({BUSINESS_CONFIG.phoneDisplay})
            </a>

            <a
              href={BUSINESS_CONFIG.getCallUrl()}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white border-2 border-white/60 hover:bg-white/10 transition-all"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
