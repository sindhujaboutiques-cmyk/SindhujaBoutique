import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, Truck, ShieldCheck, MessageCircle, ArrowLeft } from 'lucide-react';
import SEO from '../components/common/SEO';
import { useCart, formatINR } from '../context/CartContext';
import { BUSINESS_CONFIG } from '../config/businessConfig';

const Cart = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    shippingFee,
    cartTotal,
    amountNeededForFreeShipping,
    freeShippingThreshold,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const navigate = useNavigate();

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="bg-white py-10 sm:py-16 min-h-[75vh]">
      <SEO
        title="Shopping Bag"
        description="Review your selected sarees, designer blouses, and handcrafted outfits at Sinduja Boutique before checking out."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-boutique-berry">Home</Link>
          <span>/</span>
          <span className="text-boutique-charcoal font-semibold">Shopping Bag</span>
        </div>

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-boutique-blushMedium">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-boutique-charcoal">
              Your Shopping Bag
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-light">
              You have {cartCount} {cartCount === 1 ? 'item' : 'items'} in your boutique bag
            </p>
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-gray-400 hover:text-rose-600 transition-colors underline"
            >
              Clear Bag
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="py-16 text-center max-w-md mx-auto space-y-4">
            <div className="w-20 h-20 rounded-full bg-boutique-blush flex items-center justify-center text-boutique-rose mx-auto shadow-inner">
              <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-boutique-charcoal">
              Your Bag is Currently Empty
            </h2>
            <p className="text-gray-500 text-sm font-light leading-relaxed">
              Discover our exclusive Soft Silk sarees, Cotton drapes, Chudidar collections, and made-to-measure bespoke blouse stitching.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center px-7 py-3 rounded-full bg-boutique-berry hover:bg-boutique-deepRose text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md"
              >
                <span>Explore Creations</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Shipping Guaranteed Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-900">FREE Express Courier Delivery</p>
                    <p className="text-[11px] text-emerald-700 font-light">Complimentary doorstep delivery on all orders across India</p>
                  </div>
                </div>
                <span className="self-start sm:self-center text-xs font-bold text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-200 shadow-sm whitespace-nowrap">
                  ₹0 Free Delivery
                </span>
              </div>

              {/* Items Table/Cards */}
              <div className="divide-y divide-boutique-blushMedium border border-boutique-blushMedium rounded-2xl overflow-hidden bg-white shadow-sm">
                {cart.map((item) => (
                  <div key={item.cartId} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:bg-boutique-blushLight/40 transition-colors">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      {/* Compact Thumbnail (strictly bounded square, no oversized full images) */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-boutique-blush border border-boutique-blushMedium flex-shrink-0 aspect-square shadow-sm">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover aspect-square"
                        />
                      </div>

                      <div className="space-y-1 min-w-0 flex-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-boutique-rose block">
                          {item.category}
                        </span>
                        <Link
                          to={`/products/${item.slug}`}
                          className="font-serif text-base font-bold text-boutique-charcoal hover:text-boutique-berry transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>

                        <div className="flex flex-wrap gap-1.5 text-[11px] text-gray-500 pt-0.5">
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
                          <span className="text-gray-400">•</span>
                          <span className="font-medium text-boutique-charcoal">
                            {formatINR(item.numericPrice)} / unit
                          </span>
                        </div>

                        {/* Mobile Quick Remove Link */}
                        <div className="sm:hidden pt-1">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.cartId)}
                            className="inline-flex items-center text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors py-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5 mr-1" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-5 pt-2 sm:pt-0 border-t sm:border-0 border-gray-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                          title={item.quantity === 1 ? 'Remove from bag' : 'Decrease quantity'}
                          aria-label="Decrease quantity"
                        >
                          {item.quantity === 1 ? (
                            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                          ) : (
                            <Minus className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <span className="px-3 text-xs font-bold text-boutique-charcoal min-w-[28px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          disabled={item.maxStock !== undefined && item.quantity >= item.maxStock}
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          className={`px-2.5 py-1.5 transition-colors ${
                            item.maxStock !== undefined && item.quantity >= item.maxStock
                              ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                              : 'text-gray-500 hover:bg-gray-100 active:bg-gray-200'
                          }`}
                          title={
                            item.maxStock !== undefined && item.quantity >= item.maxStock
                              ? `Maximum available stock reached (${item.maxStock} units)`
                              : "Increase quantity"
                          }
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.maxStock !== undefined && item.quantity >= item.maxStock && (
                        <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded font-medium hidden sm:inline-block">
                          Max stock reached ({item.maxStock})
                        </span>
                      )}

                      {/* Subtotal */}
                      <div className="text-right min-w-[85px]">
                        <span className="font-serif text-base sm:text-lg font-bold text-boutique-charcoal block">
                          {formatINR(item.numericPrice * item.quantity)}
                        </span>
                      </div>

                      {/* Prominent Remove Button (Desktop & Tablet) */}
                      <div className="hidden sm:block">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartId)}
                          className="inline-flex items-center text-xs font-semibold text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 hover:border-rose-600 px-3 py-1.5 rounded-lg transition-all shadow-sm"
                          title="Remove item from bag"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center text-xs font-semibold text-boutique-berry hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  <span>Continue Shopping Creations</span>
                </Link>
              </div>

            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-4 bg-boutique-blushLight p-6 rounded-2xl border border-boutique-blushMedium space-y-5 sticky top-24 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-boutique-charcoal pb-3 border-b border-boutique-blushMedium">
                Order Summary
              </h3>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal ({cartCount} items)</span>
                  <span className="font-semibold text-boutique-charcoal">{formatINR(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-semibold text-emerald-700">FREE (₹0)</span>
                </div>
                <div className="flex justify-between text-base font-bold text-boutique-charcoal pt-3 border-t border-boutique-blushMedium">
                  <span>Grand Total</span>
                  <span className="font-serif text-2xl text-boutique-berry">{formatINR(cartTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full flex items-center justify-center py-4 px-6 rounded-full bg-boutique-berry hover:bg-boutique-deepRose text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={BUSINESS_CONFIG.getWhatsAppUrl(
                  'general',
                  `Hello Sinduja Boutique! I would like to place an order for my shopping bag with ${cartCount} item(s) totalling ${formatINR(cartTotal)}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center py-3 px-4 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-wider transition-colors border border-emerald-200"
              >
                <MessageCircle className="w-4 h-4 mr-2 text-emerald-600" />
                <span>Quick Order via WhatsApp</span>
              </a>

              <div className="pt-2 text-center text-xs text-gray-500 space-y-1">
                <div className="flex items-center justify-center space-x-1 text-boutique-rose font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure Checkout & Direct Boutique Support</span>
                </div>
                <p className="text-[11px] text-gray-400 font-light">
                  Tailoring & measurements will be confirmed via phone or WhatsApp after order placement.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
