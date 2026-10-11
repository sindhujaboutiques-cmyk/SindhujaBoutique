import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Scissors, ChevronRight } from 'lucide-react';
import { INITIAL_CATEGORIES } from '../../data/initialData';

const QuickCategoryRail = () => {
  // Curate top shopping categories for instant Amazon/Flipkart mobile discovery
  const quickCategories = [
    {
      name: 'Soft Silks',
      slug: 'soft-silk-sarees',
      badge: 'Popular',
      image: INITIAL_CATEGORIES.find(c => c.slug === 'soft-silk-sarees')?.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Cottons',
      slug: 'kanchi-cotton-saree',
      badge: null,
      image: INITIAL_CATEGORIES.find(c => c.slug === 'kanchi-cotton-saree')?.image || 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Chudidar',
      slug: 'chudidar-3pcs',
      badge: 'Trending',
      image: INITIAL_CATEGORIES.find(c => c.slug === 'chudidar-3pcs')?.image || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Co-ord Sets',
      slug: 'co-ord-set',
      badge: null,
      image: INITIAL_CATEGORIES.find(c => c.slug === 'co-ord-set')?.image || 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Blouses',
      slug: 'ready-made-blouse',
      badge: 'Stitching',
      image: INITIAL_CATEGORIES.find(c => c.slug === 'ready-made-blouse')?.image || 'https://images.unsplash.com/photo-1610030469668-93510cb67655?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Jewellery',
      slug: 'haram',
      badge: null,
      image: INITIAL_CATEGORIES.find(c => c.slug === 'haram')?.image || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Cosmetics',
      slug: 'hair-accesories',
      badge: null,
      image: INITIAL_CATEGORIES.find(c => c.slug === 'hair-accesories')?.image || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80'
    },
  ];

  return (
    <div className="bg-white border-b border-boutique-blushMedium py-3 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-boutique-rose flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            Quick Categories
          </span>
          <Link
            to="/collections"
            className="text-[11px] font-semibold text-boutique-berry hover:text-boutique-deepRose flex items-center"
          >
            <span>All Categories</span>
            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </Link>
        </div>

        {/* Amazon & Flipkart Style Horizontal Category Bubble Rail */}
        <div className="flex items-center gap-3 sm:gap-5 overflow-x-auto pb-1 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
          {quickCategories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="flex flex-col items-center flex-shrink-0 group active:scale-95 transition-transform"
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 bg-gradient-to-tr from-boutique-berry via-boutique-rose to-boutique-pink shadow-sm group-hover:shadow-md transition-shadow">
                <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                {cat.badge && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-boutique-berry text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-tighter whitespace-nowrap shadow-sm">
                    {cat.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium text-boutique-charcoal group-hover:text-boutique-berry mt-1.5 text-center whitespace-nowrap tracking-tight">
                {cat.name}
              </span>
            </Link>
          ))}

          {/* Direct Custom Stitching Tile */}
          <Link
            to="/services"
            className="flex flex-col items-center flex-shrink-0 group active:scale-95 transition-transform"
          >
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-sm group-hover:shadow-md transition-shadow">
              <div className="w-full h-full rounded-full overflow-hidden bg-emerald-50 flex items-center justify-center text-emerald-700">
                <Scissors className="w-6 h-6 stroke-[2]" />
              </div>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-tighter whitespace-nowrap shadow-sm">
                Custom
              </span>
            </div>
            <span className="text-[11px] font-medium text-boutique-charcoal group-hover:text-emerald-700 mt-1.5 text-center whitespace-nowrap tracking-tight">
              Stitching
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickCategoryRail;
