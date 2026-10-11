import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/common/SectionHeading';
import ProductFilters from '../components/products/ProductFilters';
import ProductGrid from '../components/products/ProductGrid';
import { getProducts, getCategories } from '../services/api';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomizableOnly, setShowCustomizableOnly] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const catData = await getCategories();
        setCategories(catData);
      } catch (err) {
        console.error(err);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get('category') || 'all';
    setSelectedCategory(categoryParam);
  }, [searchParams]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts({
          category: selectedCategory,
          search: searchQuery
        });

        let filtered = data;
        if (showCustomizableOnly) {
          filtered = filtered.filter(p => p.customizable);
        }
        setProducts(filtered);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchFilteredProducts();
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, showCustomizableOnly]);

  const handleSelectCategory = (catSlug) => {
    setSelectedCategory(catSlug);
    if (catSlug === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catSlug });
    }
  };

  return (
    <div className="bg-white py-12 sm:py-16">
      <SEO 
        title="Product Catalogue" 
        description="Browse all women's fashion items, designer blouses, pure silk sarees, bridal ensembles, and customized outfits at Sinduja Boutique." 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-[0.25em] uppercase text-boutique-berry bg-boutique-blushMedium/70 mb-3 border border-boutique-pink/30">
            Showroom Catalogue
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-boutique-charcoal mb-3">
            Explore All Creations
          </h1>
          <p className="text-gray-600 text-xs sm:text-base font-light">
            Every product is custom-tailorable to your exact measurements, fabric choices, and design aesthetics.
          </p>
        </div>

        {/* Filter Controls */}
        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showCustomizableOnly={showCustomizableOnly}
          onToggleCustomizable={() => setShowCustomizableOnly(!showCustomizableOnly)}
        />

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6 text-xs text-gray-500 font-medium">
          <span>Showing {products.length} {products.length === 1 ? 'item' : 'items'}</span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => handleSelectCategory('all')}
              className="text-boutique-rose hover:underline"
            >
              Clear Category Filter
            </button>
          )}
        </div>

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} />

      </div>
    </div>
  );
};

export default Products;
