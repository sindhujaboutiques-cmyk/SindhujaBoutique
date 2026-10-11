import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, ShoppingBag, MessageCircle, Phone, Scissors } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BUSINESS_CONFIG } from '../../config/businessConfig';

const MobileActionBar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { cartCount, openCart } = useCart();

  // If viewing a product detail page, let ProductDetail render its dedicated Flipkart/Amazon style Buy Now & Add to Bag bar
  const isProductDetail = pathname.startsWith('/products/') && pathname !== '/products';
  if (isProductDetail) {
    return null;
  }

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Shop', path: '/products', icon: Layers },
    { label: 'Stitching', path: '/services', icon: Scissors },
  ];

  const isCurrentActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-lg border-t border-boutique-blushMedium px-2 pt-1.5 pb-[calc(0.4rem+env(safe-area-inset-bottom,0px))] md:hidden shadow-[0_-6px_25px_rgba(0,0,0,0.08)]">
      {/* Flipkart / Amazon Style App Bottom Navigation Bar */}
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

        {/* Bag Tab with Live Badge */}
        <button
          onClick={openCart}
          className="flex flex-col items-center justify-center py-1 text-gray-500 hover:text-boutique-berry active:scale-90 transition-transform relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 min-w-[16px] h-[16px] rounded-full bg-boutique-berry text-white text-[9px] font-bold flex items-center justify-center px-0.5 shadow-sm">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1 leading-none font-medium text-boutique-charcoal">
            Bag
          </span>
        </button>

        {/* WhatsApp Direct Action Tab */}
        <a
          href={BUSINESS_CONFIG.getWhatsAppUrl('general')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-emerald-700 active:scale-90 transition-transform group"
        >
          <div className="relative w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center shadow-sm group-hover:bg-emerald-100 transition-colors">
            <MessageCircle className="w-4 h-4 text-emerald-600 stroke-[2.2]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
          </div>
          <span className="text-[10px] font-bold tracking-tight text-emerald-700 mt-0.5 leading-none">
            WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
};

export default MobileActionBar;
