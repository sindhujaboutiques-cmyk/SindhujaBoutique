import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, ShoppingBag, Scissors, MessageCircle, Phone, ArrowLeft } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../config/businessConfig';

const MobileActionBar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Determine if viewing a specific product detail page
  const isProductDetail = pathname.startsWith('/products/') && pathname !== '/products';
  const productSlug = isProductDetail ? pathname.split('/products/')[1]?.replace(/\/.*$/, '') : null;
  const productTitle = productSlug ? productSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'this design';
  const productWhatsAppUrl = isProductDetail 
    ? BUSINESS_CONFIG.getWhatsAppUrl('product', productTitle)
    : BUSINESS_CONFIG.getWhatsAppUrl('general');

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Categories', path: '/collections', icon: Layers },
    { label: 'Shop', path: '/products', icon: ShoppingBag },
    { label: 'Stitching', path: '/services', icon: Scissors },
  ];

  const isCurrentActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-lg border-t border-boutique-blushMedium px-2 pt-1.5 pb-[calc(0.4rem+env(safe-area-inset-bottom,0px))] md:hidden shadow-[0_-6px_25px_rgba(0,0,0,0.08)]">
      {isProductDetail ? (
        /* Amazon / Flipkart Style Sticky Product Detail Buy Bar */
        <div className="flex items-center gap-2 px-1">
          <Link
            to="/products"
            className="flex flex-col items-center justify-center min-w-[50px] h-11 rounded-xl bg-gray-100 hover:bg-gray-200 text-boutique-charcoal active:scale-95 transition-all text-center px-1"
            title="Back to All Products"
          >
            <ArrowLeft className="w-4 h-4 text-boutique-charcoal" />
            <span className="text-[10px] font-medium leading-none mt-0.5">Shop</span>
          </Link>

          <a
            href={BUSINESS_CONFIG.getCallUrl()}
            className="flex items-center justify-center h-11 px-3.5 rounded-xl bg-boutique-blush hover:bg-boutique-blushMedium text-boutique-charcoal font-semibold text-xs active:scale-95 transition-all border border-boutique-blushMedium"
          >
            <Phone className="w-4 h-4 mr-1.5 text-boutique-deepRose" />
            <span>Call</span>
          </a>

          <a
            href={productWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center h-11 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider active:scale-95 transition-all shadow-md shadow-emerald-600/30 text-center"
          >
            <MessageCircle className="w-4 h-4 mr-1.5 flex-shrink-0" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>
      ) : (
        /* Amazon / Flipkart Style App Bottom Navigation Bar */
        <div className="grid grid-cols-5 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isCurrentActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center py-1 active:scale-90 transition-transform ${
                  active ? 'text-boutique-berry font-bold' : 'text-gray-500 hover:text-boutique-charcoal'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${active ? 'scale-110 text-boutique-berry stroke-[2.3]' : 'stroke-[1.8]'}`} />
                  {active && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-boutique-berry"></span>
                  )}
                </div>
                <span className={`text-[10px] tracking-tight mt-1 leading-none ${active ? 'font-bold text-boutique-berry' : 'font-medium'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* WhatsApp Direct Action Tab */}
          <a
            href={BUSINESS_CONFIG.getWhatsAppUrl('general')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1 text-emerald-700 active:scale-90 transition-transform group"
          >
            <div className="relative w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center shadow-sm group-hover:bg-emerald-100 transition-colors">
              <MessageCircle className="w-4 h-4 text-emerald-600 stroke-[2.2]" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </div>
            <span className="text-[10px] font-bold tracking-tight text-emerald-700 mt-0.5 leading-none">
              WhatsApp
            </span>
          </a>
        </div>
      )}
    </div>
  );
};

export default MobileActionBar;
