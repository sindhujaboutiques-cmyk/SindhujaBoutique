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
    <section className="py-16 sm:py-24 bg-boutique-blush/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.25em] uppercase text-boutique-berry bg-boutique-blushMedium/70 mb-3 border border-boutique-pink/30">
              Fresh Off The Loom
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-boutique-charcoal">
              New Arrivals Showcase
            </h2>
          </div>

          <Link
            to="/new-arrivals"
            className="mt-4 md:mt-0 inline-flex items-center text-xs font-bold uppercase tracking-widest text-boutique-berry hover:text-boutique-deepRose group self-start md:self-end"
          >
            <span>Explore All New Arrivals</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
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
