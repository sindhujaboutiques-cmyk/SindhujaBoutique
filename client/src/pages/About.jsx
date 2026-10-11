import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Scissors, Heart, CheckCircle2, MessageCircle, Phone, Award, ShieldCheck } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/common/SectionHeading';
import WhyChooseUs from '../components/home/WhyChooseUs';
import { BUSINESS_CONFIG } from '../config/businessConfig';

const About = () => {
  const values = [
    {
      title: "Women's Fashion & Ethnic Wear",
      desc: "Thoughtfully assembled selections of sarees, designer kurtis, festive gowns, and comfortable everyday ethnic drapes."
    },
    {
      title: "Bespoke Blouse Stitching",
      desc: "Specialized in tailored bridal blouses, precision armhole cuts, delicate necklines, and comfortable padded structuring."
    },
    {
      title: "Custom Tailoring & Outfits",
      desc: "Bringing your custom fashion ideas to life with personalized measurements, pattern drafting, and fine fabric coordination."
    },
    {
      title: "Artisanal Aari & Embroidery",
      desc: "Skilled handwork, intricate zardosi, thread work, and embellishments tailored to match your sarees and wedding themes."
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="About Us" 
        description="Learn more about Sinduja Boutique — founded by Sinduja with a passion for personalized women's fashion, ethnic elegance, and bespoke blouse stitching." 
      />

      {/* Hero Banner */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-b from-boutique-blush via-boutique-blushLight to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.25em] uppercase text-boutique-berry bg-white/80 border border-boutique-pink/30 mb-4 shadow-sm">
            Our Brand & Story
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-boutique-charcoal mb-4 sm:mb-6">
            Welcome to <span className="text-boutique-deepRose italic">Sinduja Boutique</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 text-sm sm:text-lg font-light leading-relaxed">
            "Your Style. Your Rule." — Celebrating modern feminine elegance, rich South Indian heritage, and bespoke craftsmanship made just for you.
          </p>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Image Collage */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-boutique-blush">
                  <img
                    src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85"
                    alt="Sinduja Boutique Fashion Atelier"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-luxury border border-boutique-blushMedium max-w-[260px] hidden sm:block">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-boutique-rose block mb-1">
                    Boutique Philosophy
                  </span>
                  <p className="text-xs text-gray-700 font-serif italic">
                    Crafting timeless elegance with care and individualized attention for every woman.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Story Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.25em] uppercase text-boutique-berry bg-boutique-blushMedium/70 border border-boutique-pink/30">
                Personalized Fashion
              </span>

              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-boutique-charcoal leading-tight">
                Designed to Match <br />
                <span className="text-boutique-deepRose italic">Your True Essence</span>
              </h2>

              <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
                Founded with a deep love for fine fabric, precision tailoring, and festive celebrations, <strong className="font-semibold text-boutique-charcoal">{BUSINESS_CONFIG.name}</strong> was created to give women an intimate, elevated shopping and stitching experience.
              </p>

              <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
                We believe that great fashion shouldn't be one-size-fits-all. Every woman has distinct tastes, proportions, and preferences. Whether it's selecting the right zari border for a wedding silk saree or customizing the back design and sleeve cuts of a bridal blouse, we take the time to listen and tailor each piece to perfection.
              </p>

              {/* Core Offerings Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {values.map((val, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-boutique-blushLight border border-boutique-blushMedium/60">
                    <h3 className="font-serif text-base font-bold text-boutique-charcoal mb-1">
                      {val.title}
                    </h3>
                    <p className="text-xs text-gray-600 font-light leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={BUSINESS_CONFIG.getWhatsAppUrl('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-boutique-berry hover:bg-boutique-deepRose transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 mr-2 text-emerald-300" />
                  Connect on WhatsApp
                </a>

                <Link
                  to="/collections"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-boutique-charcoal bg-boutique-blush hover:bg-boutique-blushMedium border border-boutique-rose/40 transition-all"
                >
                  Browse Collections
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Boutique Experience Principles */}
      <section className="py-16 sm:py-24 bg-boutique-blush/30 border-y border-boutique-blushMedium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Boutique Experience"
            title="Our Commitment to You"
            subtitle="What you can always expect when you consult with Sinduja Boutique."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-boutique-blushMedium shadow-sm text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 sm:mb-5 rounded-2xl bg-boutique-blushMedium flex items-center justify-center text-boutique-berry">
                <Scissors className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-boutique-charcoal mb-2 sm:mb-3">
                Precision Fitting
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                We take detailed measurements and offer trial adjustments so your blouses and outfits fit comfortably and gracefully.
              </p>
            </div>

            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-boutique-blushMedium shadow-sm text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 sm:mb-5 rounded-2xl bg-boutique-blushMedium flex items-center justify-center text-boutique-berry">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-boutique-charcoal mb-2 sm:mb-3">
                Curated Aesthetics
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                Handpicked sarees, fabrics, and embroideries that balance authentic tradition with fresh contemporary flair.
              </p>
            </div>

            <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-boutique-blushMedium shadow-sm text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 sm:mb-5 rounded-2xl bg-boutique-blushMedium flex items-center justify-center text-boutique-berry">
                <Heart className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-boutique-charcoal mb-2 sm:mb-3">
                Friendly Assistance
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                Dedicated personal consultations with Sinduja to assist in matching fabrics, designs, and accessories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Sinduja Boutique Section */}
      <WhyChooseUs />
    </div>
  );
};

export default About;
