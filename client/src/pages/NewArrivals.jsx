import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/common/SectionHeading';
import ProductGrid from '../components/products/ProductGrid';
import { getProducts } from '../services/api';
import { BUSINESS_CONFIG } from '../config/businessConfig';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      setLoading(true);
      try {
        const data = await getProducts({ newArrival: true });
        setProducts(data);
      } catch (err) {
        console.error('Error fetching new arrivals:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  return (
    <div className="bg-white py-12 sm:py-16">
      <SEO 
        title="New Arrivals" 
        description="Explore the latest additions to Sinduja Boutique — freshly crafted designer sarees, festive blouses, and new season styles." 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.25em] uppercase text-boutique-berry bg-boutique-blushMedium/70 mb-3 border border-boutique-pink/30">
            Latest Catalog Additions
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-boutique-charcoal mb-3 sm:mb-4">
            New Arrivals
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
            Discover the newest handcrafted silhouettes, fresh seasonal palettes, and bridal blouses hot off the atelier.
          </p>
        </div>

        {/* Products Grid */}
        <ProductGrid products={products} loading={loading} />

        {/* WhatsApp Custom Notice */}
        <div className="mt-10 sm:mt-16 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-boutique-blush/40 border border-boutique-blushMedium text-center max-w-2xl mx-auto">
          <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 font-light">
            Want to be first to know about new fabric arrivals and festive collections?
          </p>
          <a
            href={BUSINESS_CONFIG.getWhatsAppUrl('general')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-7 py-3 rounded-full text-xs uppercase font-bold tracking-widest text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-md text-center"
          >
            <MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>Connect on WhatsApp for Updates</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default NewArrivals;
