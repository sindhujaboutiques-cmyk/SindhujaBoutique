import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import ProductCard from '../products/ProductCard';
import { getProducts } from '../../services/api';

const NewArrivalsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const data = await getProducts({ newArrival: true });
        setProducts(data.slice(0, 4));
      } catch (err) {
        console.error('Error loading new arrivals:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  if (!loading && products.length === 0) return null;

  return (
    <section className="py-10 sm:py-20 bg-boutique-blush/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-5 sm:mb-8">
          <div>
            <span className="inline-block px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-boutique-berry bg-boutique-blushMedium/70 mb-1 sm:mb-2 border border-boutique-pink/30">
              Fresh Off The Loom
            </span>
            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-boutique-charcoal">
              New Arrivals
            </h2>
          </div>

          <Link
            to="/new-arrivals"
            className="inline-flex items-center text-[11px] sm:text-xs font-bold uppercase tracking-wider text-boutique-berry hover:text-boutique-deepRose group flex-shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default NewArrivalsSection;
