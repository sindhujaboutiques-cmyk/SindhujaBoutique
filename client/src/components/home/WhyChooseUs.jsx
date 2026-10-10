import React from 'react';
import { Sparkles, Scissors, ShieldCheck, Layers, HeartHandshake, Smile } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { WHY_CHOOSE_US } from '../../data/initialData';

const iconMap = {
  Sparkles: Sparkles,
  Scissors: Scissors,
  ShieldCheck: ShieldCheck,
  Layers: Layers,
  HeartHandshake: HeartHandshake,
  Smile: Smile
};

const WhyChooseUs = () => {
  return (
    <section className="py-16 sm:py-24 bg-boutique-charcoal text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-boutique-berry/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="max-w-3xl text-center mx-auto mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.25em] uppercase text-boutique-pink bg-white/10 mb-3 border border-boutique-pink/30">
            The Sinduja Difference
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Why Choose Sinduja Boutique
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
            Crafting fashion that honors your personal taste with impeccable fit, refined detailing, and dedicated assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item, index) => {
            const Icon = iconMap[item.icon] || Sparkles;

            return (
              <div
                key={index}
                className="p-8 rounded-3xl bg-boutique-charcoalLight/70 border border-white/10 hover:border-boutique-pink/40 hover:bg-boutique-charcoalLight transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-boutique-berry/40 border border-boutique-pink/20 flex items-center justify-center text-boutique-pink mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-serif text-xl font-bold text-white mb-2.5">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
