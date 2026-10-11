import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Truck, CreditCard, CheckCircle2, 
  MessageCircle, ArrowLeft, Scissors, AlertCircle, 
  Phone, Lock, ShoppingBag, Trash2 
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { useCart, formatINR } from '../context/CartContext';
import { initiateRazorpayPayment, getRazorpayKey } from '../services/razorpay';
import { deductProductStock } from '../services/api';
import { BUSINESS_CONFIG } from '../config/businessConfig';

const Checkout = () => {
  const { cart, cartCount, cartSubtotal, shippingFee, cartTotal, clearCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const razorpayKey = getRazorpayKey();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    city: '',
    state: 'Tamil Nadu',
    pincode: '',
    stitchingNotes: '',
    paymentMethod: 'razorpay' // Exclusively Razorpay
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const hasCustomizableItems = Array.isArray(cart) && cart.some((item) => item.customizable);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // If cart is empty, show empty bag state (rendered AFTER all hooks)
  if (!cart || cart.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4 min-h-[60vh] flex flex-col items-center justify-center">
        <SEO title="Checkout" description="Complete your boutique order at Sinduja Boutique." />
        <ShoppingBag className="w-16 h-16 text-boutique-rose mx-auto mb-4 stroke-[1.5]" />
        <h2 className="font-serif text-2xl font-bold text-boutique-charcoal">Your Bag is Empty</h2>
        <p className="text-gray-500 text-xs mt-2 mb-6">
          Add your favorite sarees, blouses, or handcrafted outfits to proceed to checkout.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center px-6 py-3 rounded-full bg-boutique-berry text-white text-xs font-bold uppercase tracking-widest hover:bg-boutique-deepRose transition-colors shadow-md"
        >
          Browse Catalogue
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.city.trim() || !formData.pincode.trim()) {
      setErrorMsg('Please fill in all mandatory delivery address fields.');
      return;
    }

    if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number for delivery updates.');
      return;
    }

    setIsSubmitting(true);

    const generatedOrderId = `SB-${Date.now().toString().slice(-6)}`;
    const orderData = {
      orderId: generatedOrderId,
      items: cart,
      subtotal: cartSubtotal,
      shipping: shippingFee,
      total: cartTotal,
      customer: {
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: `${formData.address}, ${formData.landmark ? formData.landmark + ', ' : ''}${formData.city}, ${formData.state} - ${formData.pincode}`
      },
      stitchingNotes: formData.stitchingNotes,
      paymentMethod: 'razorpay',
      orderDate: new Date().toISOString()
    };

    // Save preliminary order to history
    try {
      localStorage.setItem(`sinduja_order_${generatedOrderId}`, JSON.stringify(orderData));
      const history = JSON.parse(localStorage.getItem('sinduja_orders_history') || '[]');
      history.unshift(orderData);
      localStorage.setItem('sinduja_orders_history', JSON.stringify(history));
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }

    if (!razorpayKey) {
      setErrorMsg('Razorpay payment gateway credentials are not yet initialized. Please verify your environment or contact store administrator.');
      setIsSubmitting(false);
      return;
    }

    // Initiate Razorpay Standard Checkout
    initiateRazorpayPayment({
      orderId: generatedOrderId,
      amount: cartTotal,
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      onSuccess: async (response) => {
        orderData.paymentId = response.razorpay_payment_id;
        orderData.razorpayOrderId = response.razorpay_order_id;
        orderData.razorpaySignature = response.razorpay_signature;
        orderData.paymentStatus = 'Paid';
        orderData.verified = true;
        localStorage.setItem(`sinduja_order_${generatedOrderId}`, JSON.stringify(orderData));
        try {
          await deductProductStock(cart);
        } catch (e) {
          console.warn('Stock deduct error', e);
        }
        clearCart();
        setIsSubmitting(false);
        navigate(`/order-success/${generatedOrderId}`);
      },
      onFailure: (err) => {
        setIsSubmitting(false);
        setErrorMsg(err.message || 'Payment was cancelled or failed. Please try again with another card, UPI, or NetBanking.');
      }
    });
  };

  return (
    <div className="bg-white py-8 sm:py-14 min-h-screen">
      <SEO title="Checkout" description="Secure boutique checkout at Sinduja Boutique." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-boutique-blushMedium">
          <Link
            to="/cart"
            className="inline-flex items-center text-xs font-semibold text-boutique-charcoal hover:text-boutique-berry transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1 text-boutique-rose" />
            <span>Return to Shopping Bag</span>
          </Link>

          <div className="flex items-center space-x-1.5 text-xs text-gray-500 font-medium">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Form Details (Customer & Address) */}
          <div className="lg:col-span-7 space-y-8">
            
            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* 1. Contact Information */}
            <div className="bg-white p-5 sm:p-7 rounded-2xl border border-boutique-blushMedium shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-boutique-charcoal">
                  1. Contact Information
                </h2>
                <span className="text-[11px] text-gray-400">Order Updates</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-boutique-charcoal block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Priya Sundaram"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-boutique-blushMedium focus:outline-none focus:border-boutique-rose focus:ring-2 focus:ring-boutique-pink/20 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-boutique-charcoal block mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-boutique-blushMedium focus:outline-none focus:border-boutique-rose focus:ring-2 focus:ring-boutique-pink/20 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-boutique-charcoal block mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. priya@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-boutique-blushMedium focus:outline-none focus:border-boutique-rose focus:ring-2 focus:ring-boutique-pink/20 text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white p-5 sm:p-7 rounded-2xl border border-boutique-blushMedium shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-boutique-charcoal">
                  2. Delivery Address
                </h2>
                <span className="text-[11px] text-gray-400">All India Courier</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-boutique-charcoal block mb-1">
                  Street Address / Flat / House No *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="e.g. No. 14, Gandhi Road, 2nd Cross"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-boutique-blushMedium focus:outline-none focus:border-boutique-rose focus:ring-2 focus:ring-boutique-pink/20 text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-boutique-charcoal block mb-1">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    placeholder="e.g. Near Vinayagar Temple"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-boutique-blushMedium focus:outline-none focus:border-boutique-rose focus:ring-2 focus:ring-boutique-pink/20 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-boutique-charcoal block mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Coimbatore / Chennai"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-boutique-blushMedium focus:outline-none focus:border-boutique-rose focus:ring-2 focus:ring-boutique-pink/20 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-boutique-charcoal block mb-1">
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-boutique-blushMedium focus:outline-none focus:border-boutique-rose focus:ring-2 focus:ring-boutique-pink/20 text-xs sm:text-sm bg-white"
                  >
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Other States">Other States (All India)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-boutique-charcoal block mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    placeholder="e.g. 641001"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-boutique-blushMedium focus:outline-none focus:border-boutique-rose focus:ring-2 focus:ring-boutique-pink/20 text-xs sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* 3. Tailoring & Custom Stitching Consultation (if applicable) */}
            {hasCustomizableItems && (
              <div className="bg-boutique-blushLight p-5 sm:p-7 rounded-2xl border border-dashed border-boutique-rose/50 space-y-3">
                <div className="flex items-center space-x-2 text-boutique-berry">
                  <Scissors className="w-5 h-5 text-boutique-deepRose flex-shrink-0" />
                  <h3 className="font-serif text-base sm:text-lg font-bold text-boutique-charcoal">
                    3. Custom Tailoring & Measurement Notes
                  </h3>
                </div>
                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  Your bag includes made-to-measure customizable items. You can share your bust, sleeve length, or blouse neck preferences below. Sinduja will also verify your measurements on WhatsApp after checkout!
                </p>
                <textarea
                  name="stitchingNotes"
                  rows={3}
                  placeholder="e.g. Blouse back neck depth 8 inches, elbow sleeve length, padded cup required..."
                  value={formData.stitchingNotes}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-boutique-blushMedium focus:outline-none focus:border-boutique-rose text-xs sm:text-sm bg-white"
                />
              </div>
            )}

            {/* 4. Payment Method - Exclusively Razorpay */}
            <div className="bg-white p-5 sm:p-7 rounded-2xl border border-boutique-blushMedium shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-boutique-charcoal">
                  {hasCustomizableItems ? '4. Payment Method' : '3. Payment Method'}
                </h2>
                <div className="flex items-center space-x-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Secure Checkout</span>
                </div>
              </div>

              {/* Exclusive Razorpay Payment Box */}
              <div className="p-5 rounded-2xl border-2 border-boutique-berry bg-gradient-to-br from-boutique-blushLight via-white to-boutique-blush/40 shadow-sm space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-boutique-berry text-white flex items-center justify-center shadow-md flex-shrink-0">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-boutique-charcoal">
                        Razorpay Standard Online Checkout
                      </h4>
                      <p className="text-xs text-gray-500 font-light mt-0.5">
                        Instant payment confirmation with automated receipt
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-2.5 py-1 rounded-full border border-purple-200 flex-shrink-0">
                    Razorpay Secure
                  </span>
                </div>

                {/* Supported Payment Channels */}
                <div className="pt-2 border-t border-boutique-blushMedium grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-gray-200/80 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-semibold text-boutique-charcoal">UPI</span>
                    <span className="text-[10px] text-gray-400 font-light">(GPay, PhonePe, Paytm)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-gray-200/80 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-semibold text-boutique-charcoal">Cards</span>
                    <span className="text-[10px] text-gray-400 font-light">(Visa, Master, RuPay)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-gray-200/80 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-semibold text-boutique-charcoal">NetBanking</span>
                    <span className="text-[10px] text-gray-400 font-light">(All Indian Banks)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                  <span className="flex items-center">
                    <Lock className="w-3 h-3 text-emerald-600 mr-1.5" />
                    256-bit Bank Grade SSL Encryption
                  </span>
                  <span className="font-medium text-boutique-berry">
                    Zero Extra Transaction Fee
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Order Review & Submit */}
          <div className="lg:col-span-5 bg-boutique-blushLight p-6 rounded-2xl border border-boutique-blushMedium space-y-5 sticky top-24 shadow-sm">
            
            <h3 className="font-serif text-xl font-bold text-boutique-charcoal pb-3 border-b border-boutique-blushMedium">
              Order Review ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </h3>

            {/* Compact Item Scroller */}
            <div className="max-h-60 overflow-y-auto divide-y divide-boutique-blushMedium scrollbar-none pr-1">
              {cart.map((item) => (
                <div key={item.cartId} className="py-2.5 flex items-center justify-between text-xs gap-3">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg border border-boutique-blushMedium flex-shrink-0 aspect-square shadow-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-boutique-charcoal line-clamp-1">{item.name}</p>
                      <p className="text-gray-500 text-[11px]">
                        Qty: {item.quantity} {item.size ? `• ${item.size}` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className="font-serif font-bold text-boutique-charcoal whitespace-nowrap">
                      {formatINR(item.numericPrice * item.quantity)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.cartId)}
                      className="p-1 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      title="Remove item from bag"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="pt-3 border-t border-boutique-blushMedium space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-boutique-charcoal">{formatINR(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Express Courier Shipping</span>
                <span className="font-semibold text-emerald-700">FREE (₹0)</span>
              </div>
              <div className="flex justify-between text-base font-bold text-boutique-charcoal pt-3 border-t border-boutique-blushMedium">
                <span>Total Amount</span>
                <span className="font-serif text-2xl text-boutique-berry">{formatINR(cartTotal)}</span>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center py-4 px-6 rounded-full bg-boutique-berry hover:bg-boutique-deepRose text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Connecting Razorpay Gateway...</span>
              ) : (
                <span className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  <span>Pay {formatINR(cartTotal)} with Razorpay</span>
                </span>
              )}
            </button>

            {/* Guarantee Note */}
            <div className="pt-2 text-center text-xs text-gray-500 space-y-1">
              <div className="flex items-center justify-center space-x-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Handloom & Boutique Tailoring</span>
              </div>
              <p className="text-[11px] text-gray-400 font-light">
                Questions about this order? Call Sinduja directly at {BUSINESS_CONFIG.phoneDisplay}.
              </p>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};

export default Checkout;
