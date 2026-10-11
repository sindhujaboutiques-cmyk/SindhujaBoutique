import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Sparkles, Filter } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/common/SectionHeading';
import { INITIAL_CATEGORIES } from '../data/initialData';

const Collections = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'all';

  const filterTabs = [
    { label: 'All Collections', value: 'all' },
    { label: 'Sarees', value: 'Sarees' },
    { label: "Women's Wear & Outfits", value: "Women's Wear" },
    { label: 'Jewels & Jewellery', value: 'Jewels' },
    { label: 'Fancy & Cosmetics', value: 'Fancy' },
  ];

  const filteredCategories = activeTab === 'all'
    ? INITIAL_CATEGORIES
    : INITIAL_CATEGORIES.filter(c => c.parentCategory.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="bg-white py-12 sm:py-16">
      <SEO 
        title="Collections" 
        description="Browse curated collections of soft silk sarees, cotton sarees, chudidars, kurtis, temple jewels, and fancy accessories at Sinduja Boutique." 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.25em] uppercase text-boutique-berry bg-boutique-blushMedium/70 mb-3 border border-boutique-pink/30">
            Digital Showroom
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-boutique-charcoal mb-3 sm:mb-4">
            Curated Fashion Collections
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
            Explore our extensive repertoire of ethnic wear, wedding specials, bespoke blouses, and festive outfits.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8 sm:mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSearchParams(tab.value === 'all' ? {} : { tab: tab.value })}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                activeTab.toLowerCase() === tab.value.toLowerCase()
                  ? 'bg-boutique-berry text-white shadow-md'
                  : 'bg-boutique-blush text-boutique-charcoal hover:bg-boutique-blushMedium border border-boutique-blushMedium'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Categories Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-boutique-blushMedium shadow-card hover:shadow-luxury transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Category Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-boutique-blush">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-boutique-berry shadow-sm">
                  {category.parentCategory}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-boutique-charcoal mb-2 group-hover:text-boutique-berry transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed line-clamp-3 mb-6">
                    {category.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-boutique-blushMedium flex items-center justify-between">
                  <Link
                    to={`/products?category=${category.slug}`}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-boutique-berry hover:text-boutique-deepRose group/link"
                  >
                    <span>View Products</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>

                  <span className="text-[11px] text-gray-500 font-medium">
                    Custom Tailoring Available
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Catalogue CTA Banner */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-boutique-blushLight border border-boutique-blushMedium text-center max-w-4xl mx-auto space-y-4">
          <Sparkles className="w-8 h-8 text-boutique-deepRose mx-auto" />
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-boutique-charcoal">
            Looking for something specific or customized?
          </h3>
          <p className="text-gray-600 text-sm max-w-xl mx-auto font-light">
            Bring your design references or browse our comprehensive product gallery with instant WhatsApp consultation.
          </p>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-boutique-berry hover:bg-boutique-deepRose transition-all shadow-luxury"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Collections;
