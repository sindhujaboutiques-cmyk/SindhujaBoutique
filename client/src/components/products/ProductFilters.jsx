import React from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';

const ProductFilters = ({
  categories = [],
  selectedCategory = 'all',
  onSelectCategory,
  searchQuery = '',
  onSearchChange,
  showCustomizableOnly = false,
  onToggleCustomizable
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-boutique-blushMedium shadow-sm mb-6 sm:mb-8 space-y-4 sm:space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        
        {/* Search Bar */}
        <div className="relative flex-1 w-full md:max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sarees, blouses, lehengas, kurtis..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs sm:text-sm bg-boutique-blush/40 border border-boutique-blushMedium focus:outline-none focus:border-boutique-rose focus:ring-2 focus:ring-boutique-pink/20 transition-all placeholder-gray-400"
          />
        </div>

        {/* Customization Quick Filter */}
        <div className="flex items-center">
          <button
            onClick={onToggleCustomizable}
            className={`w-full sm:w-auto px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all border text-center ${
              showCustomizableOnly
                ? 'bg-boutique-berry text-white border-boutique-berry shadow-sm'
                : 'bg-white text-boutique-charcoal border-boutique-blushMedium hover:bg-boutique-blush'
            }`}
          >
            ✂️ Custom Stitching Only
          </button>
        </div>

      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-boutique-berry text-white shadow-sm'
              : 'bg-boutique-blush text-boutique-charcoal hover:bg-boutique-blushMedium'
          }`}
        >
          All Items
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id || cat.slug}
            onClick={() => onSelectCategory(cat.slug)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all ${
              selectedCategory === cat.slug
                ? 'bg-boutique-berry text-white shadow-sm'
                : 'bg-boutique-blush text-boutique-charcoal hover:bg-boutique-blushMedium'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductFilters;
