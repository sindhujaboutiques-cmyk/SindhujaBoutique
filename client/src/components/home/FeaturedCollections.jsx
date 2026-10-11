import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { INITIAL_CATEGORIES } from '../../data/initialData';

const FeaturedCollections = () => {
  // Feature representative categories across Sarees, Outfits, Jewels, and Fancy
  const featuredList = [
    INITIAL_CATEGORIES.find(c => c.slug === 'soft-silk-sarees'),
    INITIAL_CATEGORIES.find(c => c.slug === 'malmal-cotton'),
    INITIAL_CATEGORIES.find(c => c.slug === 'chudidar-3pcs'),
    INITIAL_CATEGORIES.find(c => c.slug === 'co-ord-set'),
    INITIAL_CATEGORIES.find(c => c.slug === 'haram'),
    INITIAL_CATEGORIES.find(c => c.slug === 'hair-accesories')
  ].filter(Boolean);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeading
          badge="Curated Collections"
          title="Designed for Every Celebration"
          subtitle="Explore our graceful assortment of soft silks, cotton sarees, tailored chudidars, temple jewels, and fancy accessories."
        />

        {/* Categories Grid */}
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {featuredList.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] min-[500px]:aspect-[3/4] bg-boutique-blush shadow-card hover:shadow-luxury transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"></div>

              {/* Content Box */}
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase tracking-[0.25em] text-pink-200 font-semibold mb-1">
                  {category.parentCategory}
                </span>

                <h3 className="font-serif text-xl sm:text-3xl font-bold tracking-tight text-white mb-1.5 sm:mb-2 group-hover:text-pink-200 transition-colors">
                  {category.name}
                </h3>

                <p className="text-gray-300 text-xs sm:text-sm line-clamp-2 font-light mb-3 sm:mb-4">
                  {category.description}
                </p>

                <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-pink-200 group-hover:text-white transition-colors">
                  <span>View Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Collections Button */}
        <div className="mt-12 text-center">
          <Link
            to="/collections"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-boutique-charcoal bg-boutique-blush hover:bg-boutique-blushMedium border border-boutique-rose/40 transition-all shadow-sm"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 ml-2 text-boutique-berry" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedCollections;
