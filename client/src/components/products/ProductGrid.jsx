import React from 'react';
import ProductCard from './ProductCard';
import EmptyState from '../common/EmptyState';

const ProductGrid = ({ products = [], loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div key={n} className="bg-boutique-blush/60 rounded-2xl aspect-[3/4] border border-boutique-blushMedium"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No Products Found"
        message="We could not find any products matching your selected criteria. Try changing your filters or chat with us on WhatsApp to ask about custom designs."
        actionText="Enquire on WhatsApp"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id || product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
