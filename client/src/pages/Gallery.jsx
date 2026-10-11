import React, { useState, useEffect } from 'react';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/common/SectionHeading';
import GalleryGrid from '../components/gallery/GalleryGrid';
import SampleNoticeBadge from '../components/common/SampleNoticeBadge';
import { getGallery } from '../services/api';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Sarees',
    "Women's Wear",
    'Jewels',
    'Fancy',
    'Stitching',
    'Boutique'
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const data = await getGallery(selectedCategory);
        setItems(data);
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [selectedCategory]);

  return (
    <div className="bg-white py-12 sm:py-16">
      <SEO 
        title="Atelier Gallery & Portfolio" 
        description="View our curated portfolio of bridal blouses, handloom sarees, party gowns, and bespoke stitching craftsmanship at Sinduja Boutique." 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.25em] uppercase text-boutique-berry bg-boutique-blushMedium/70 mb-3 border border-boutique-pink/30">
            Visual Portfolio
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-boutique-charcoal mb-3 sm:mb-4">
            Atelier Gallery
          </h1>
          <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
            A visual glimpse into our craftsmanship, fabric styling, intricate bridal work, and boutique ambiance.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 sm:mb-10 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all flex-shrink-0 ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-boutique-berry text-white shadow-md'
                  : 'bg-boutique-blush text-boutique-charcoal hover:bg-boutique-blushMedium border border-boutique-blushMedium'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid & Lightbox */}
        <GalleryGrid items={items} loading={loading} />

      </div>
    </div>
  );
};

export default Gallery;
