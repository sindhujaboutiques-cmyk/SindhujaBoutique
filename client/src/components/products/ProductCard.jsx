import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Sparkles, ArrowUpRight, Scissors } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/businessConfig';
import SampleNoticeBadge from '../common/SampleNoticeBadge';

const ProductCard = ({ product }) => {
  const {
    name,
    slug,
    category,
    price = 'Price on Enquiry',
    images = [],
    customizable = true,
    newArrival = false,
    isSampleData = true
  } = product;

  const mainImage = images && images.length > 0 
    ? images[0] 
    : 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';

  const whatsappUrl = BUSINESS_CONFIG.getWhatsAppUrl('product', name);

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-boutique-blushMedium shadow-sm hover:shadow-luxury transition-all duration-500 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-boutique-blush">
        <Link to={`/products/${slug}`} className="block w-full h-full">
          <img
            src={mainImage}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
          {newArrival && (
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-boutique-berry text-white shadow-sm">
              New Arrival
            </span>
          )}
          {customizable && (
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-semibold tracking-wider bg-white/95 backdrop-blur-sm text-boutique-deepRose border border-boutique-pink/40 shadow-sm flex items-center">
              <Scissors className="w-2.5 h-2.5 mr-1" />
              Custom Stitching
            </span>
          )}
        </div>

        {/* Development Notice */}
        {isSampleData && (
          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10">
            <SampleNoticeBadge text="Sample Item" />
          </div>
        )}

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-between gap-2">
          <Link
            to={`/products/${slug}`}
            className="flex-1 py-2 px-3 rounded-xl bg-white/95 text-boutique-charcoal text-xs font-semibold text-center hover:bg-white transition-colors"
          >
            View Details
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center transition-colors shadow-md"
            title="Enquire on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3 sm:p-5 flex flex-col flex-grow justify-between bg-white">
        <div>
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-boutique-rose block mb-0.5 sm:mb-1">
            {category}
          </span>
          <Link to={`/products/${slug}`}>
            <h3 className="font-serif text-sm sm:text-lg font-bold text-boutique-charcoal group-hover:text-boutique-berry transition-colors line-clamp-2 leading-snug">
              {name}
            </h3>
          </Link>
        </div>

        <div className="pt-2.5 sm:pt-3 mt-2 sm:mt-3 border-t border-boutique-blushMedium flex flex-col min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between gap-1.5 sm:gap-2">
          <div>
            <span className="text-[10px] sm:text-xs text-gray-500 font-light block">Pricing:</span>
            <span className="text-xs sm:text-sm font-semibold text-boutique-charcoal tracking-wide">
              {price}
            </span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center py-1 px-2.5 rounded-full bg-boutique-blush hover:bg-emerald-50 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-700 border border-emerald-200/60 transition-colors"
          >
            <MessageCircle className="w-3 h-3 mr-1 text-emerald-600 flex-shrink-0" />
            <span>Enquire</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
