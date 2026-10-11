import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, MessageCircle, Truck } from 'lucide-react';
import { useCart, formatINR } from '../../context/CartContext';
import { BUSINESS_CONFIG } from '../../config/businessConfig';

const CartDrawer = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    shippingFee,
    cartTotal,
    amountNeededForFreeShipping,
    freeShippingThreshold,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart
  } = useCart();

  const navigate = useNavigate();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slide-up sm:animate-none">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-boutique-blushMedium flex items-center justify-between bg-boutique-blushLight">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-boutique-berry" />
              <h2 className="font-serif text-lg font-bold text-boutique-charcoal">
                Shopping Bag ({cartCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full hover:bg-white text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cart.length > 0 && (
            <div className="bg-boutique-blush/60 px-5 py-2.5 border-b border-boutique-blushMedium">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="flex items-center text-boutique-charcoal">
                  <Truck className="w-3.5 h-3.5 mr-1.5 text-boutique-rose" />
                  {amountNeededForFreeShipping === 0 ? (
                    <span className="text-emerald-700 font-bold">🎉 You have unlocked FREE Express Delivery!</span>
                  ) : (
                    <span>Add <strong className="text-boutique-berry font-bold">{formatINR(amountNeededForFreeShipping)}</strong> more for <strong>FREE Delivery</strong></span>
                  )}
                </span>
                <span className="text-[11px] font-bold text-gray-500">{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-boutique-rose to-boutique-berry transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-boutique-blushMedium scrollbar-none">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-boutique-blush flex items-center justify-center text-boutique-rose shadow-inner">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-boutique-charcoal">
                    Your Bag is Empty
                  </h3>
                  <p className="text-gray-500 text-xs mt-1 max-w-xs font-light">
                    Explore our handpicked collection of Soft Silks, Chudidars, Ready Blouses, and Designer Jewellery.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/products');
                  }}
                  className="px-6 py-2.5 rounded-full bg-boutique-berry text-white text-xs font-bold uppercase tracking-wider hover:bg-boutique-deepRose transition-colors shadow-md"
                >
                  Explore Catalogue
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartId} className="py-4 flex gap-3.5 items-start">
                  {/* Item Image */}
                  <div className="w-18 h-22 rounded-xl overflow-hidden bg-boutique-blush flex-shrink-0 border border-boutique-blushMedium">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        to={`/products/${item.slug}`}
                        onClick={closeCart}
                        className="font-serif text-sm font-bold text-boutique-charcoal hover:text-boutique-berry transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-[10px] uppercase font-semibold tracking-wider text-boutique-rose block mt-0.5">
                      {item.category}
                    </span>

                    {/* Options Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 my-1.5 text-[10px] text-gray-600">
                      {item.size && (
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 font-medium">
                          Size: {item.size}
                        </span>
                      )}
                      {item.color && (
                        <span className="px-2 py-0.5 rounded-md bg-gray-100 font-medium">
                          {item.color}
                        </span>
                      )}
                    </div>

                    {/* Price & Quantity Stepper */}
                    <div className="flex items-center justify-between mt-2 pt-1">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          className="px-2 py-1 text-gray-500 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-boutique-charcoal min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          className="px-2 py-1 text-gray-500 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-sm font-bold text-boutique-charcoal">
                          {formatINR(item.numericPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Actions */}
          {cart.length > 0 && (
            <div className="border-t border-boutique-blushMedium bg-white p-5 space-y-3 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
              {/* Cost Summary */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-boutique-charcoal">{formatINR(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-medium text-boutique-charcoal">
                    {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatINR(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-boutique-charcoal pt-2 border-t border-gray-100">
                  <span>Estimated Total</span>
                  <span className="font-serif text-lg text-boutique-berry">{formatINR(cartTotal)}</span>
                </div>
              </div>

              {/* Primary Checkout Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full flex items-center justify-center py-3.5 px-6 rounded-full bg-boutique-berry hover:bg-boutique-deepRose text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Direct WhatsApp Quick Order */}
              <a
                href={BUSINESS_CONFIG.getWhatsAppUrl(
                  'general',
                  `Hello Sinduja Boutique! I would like to place an order for my cart with ${cartCount} item(s) totalling ${formatINR(cartTotal)}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center py-2.5 px-4 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-wider transition-colors border border-emerald-200"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                <span>Order Directly on WhatsApp</span>
              </a>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-boutique-rose" />
                <span>100% Authentic Handpicked Fabrics & Quality Assured</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
