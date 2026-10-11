import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, Truck, CreditCard, CheckCircle2, 
  MessageCircle, ArrowLeft, Scissors, AlertCircle, 
  Phone, Lock, ShoppingBag 
} from 'lucide-react';
import SEO from '../components/common/SEO';
import { useCart, formatINR } from '../context/CartContext';
import { initiateRazorpayPayment, getRazorpayKey } from '../services/razorpay';
import { deductProductStock } from '../services/api';
import { BUSINESS_CONFIG } from '../config/businessConfig';

const Checkout = () => {
  const { cart, cartCount, cartSubtotal, shippingFee, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Redirect if cart is empty
  if (cart.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
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

  const hasCustomizableItems = cart.some((item) => item.customizable);
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
    paymentMethod: razorpayKey ? 'razorpay' : 'cod' // 'razorpay' | 'cod' | 'whatsapp'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      paymentMethod: formData.paymentMethod,
      orderDate: new Date().toISOString()
    };

    // Save order to localStorage for confirmation page
    try {
      localStorage.setItem(`sinduja_order_${generatedOrderId}`, JSON.stringify(orderData));
      // Keep a list of all order IDs
      const history = JSON.parse(localStorage.getItem('sinduja_orders_history') || '[]');
      history.unshift(orderData);
      localStorage.setItem('sinduja_orders_history', JSON.stringify(history));
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }

    // Handle Payment Selection
    if (formData.paymentMethod === 'razorpay') {
      if (!razorpayKey) {
        // Razorpay details not yet provided by user
        setErrorMsg('Razorpay payment gateway credentials will be activated soon. Please select Cash on Delivery or Confirm via WhatsApp below.');
        setIsSubmitting(false);
        return;
      }

      // Initiate Razorpay
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
          setErrorMsg(err.message || 'Payment was cancelled or failed. Please try again or choose Cash on Delivery.');
        }
      });
      return;
    }

    // Cash on Delivery or Direct WhatsApp Order: Automatically deduct product quantities & mark out of stock when sold out
    try {
      await deductProductStock(cart);
    } catch (e) {
      console.warn('Stock deduct error', e);
    }
    clearCart();
    setIsSubmitting(false);
    navigate(`/order-success/${generatedOrderId}`);
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

            {/* 4. Payment Method Selection */}
            <div className="bg-white p-5 sm:p-7 rounded-2xl border border-boutique-blushMedium shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-boutique-charcoal">
                  {hasCustomizableItems ? '4. Payment Method' : '3. Payment Method'}
                </h2>
                <span className="text-[11px] text-gray-400">Safe & Verified</span>
              </div>

              <div className="space-y-3">
                
                {/* Cash on Delivery / Pay on Delivery */}
                <label className={`flex items-start p-4 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-boutique-berry bg-boutique-blushLight ring-2 ring-boutique-pink/30' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="mt-1 text-boutique-berry focus:ring-boutique-pink mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs sm:text-sm text-boutique-charcoal">
                        Cash on Delivery (COD) / Pay on Delivery
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Available
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-light mt-0.5">
                      Pay easily via Cash or UPI when your parcel arrives at your doorstep.
                    </p>
                  </div>
                </label>

                {/* Direct WhatsApp Confirmation */}
                <label className={`flex items-start p-4 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === 'whatsapp' ? 'border-boutique-berry bg-boutique-blushLight ring-2 ring-boutique-pink/30' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="whatsapp"
                    checked={formData.paymentMethod === 'whatsapp'}
                    onChange={handleInputChange}
                    className="mt-1 text-boutique-berry focus:ring-boutique-pink mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs sm:text-sm text-boutique-charcoal flex items-center">
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                        Confirm & Pay via WhatsApp
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Instant
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-light mt-0.5">
                      Send your order directly to Sinduja on WhatsApp. Pay directly via Google Pay / PhonePe / UPI QR code.
                    </p>
                  </div>
                </label>

                {/* Razorpay Online Payment Gateway */}
                <label className={`flex items-start p-4 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === 'razorpay' ? 'border-boutique-berry bg-boutique-blushLight ring-2 ring-boutique-pink/30' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={formData.paymentMethod === 'razorpay'}
                    onChange={handleInputChange}
                    className="mt-1 text-boutique-berry focus:ring-boutique-pink mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs sm:text-sm text-boutique-charcoal flex items-center">
                        <CreditCard className="w-3.5 h-3.5 text-boutique-rose mr-1.5" />
                        Online Payment (UPI, Debit/Credit Cards, NetBanking)
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                        Razorpay
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-light mt-0.5">
                      {razorpayKey 
                        ? 'Instant automated checkout with Razorpay Secure Gateway.' 
                        : 'Razorpay integration module ready. (Will activate automatically once boutique Razorpay Key is linked).'}
                    </p>
                  </div>
                </label>

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
                <div key={item.cartId} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-14 object-cover rounded-lg border border-boutique-blushMedium flex-shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-boutique-charcoal line-clamp-1">{item.name}</p>
                      <p className="text-gray-500 text-[11px]">
                        Qty: {item.quantity} {item.size ? `• ${item.size}` : ''}
                      </p>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-boutique-charcoal whitespace-nowrap ml-2">
                    {formatINR(item.numericPrice * item.quantity)}
                  </span>
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
                <span className="font-semibold text-boutique-charcoal">
                  {shippingFee === 0 ? <span className="text-emerald-700 font-bold">FREE Delivery</span> : formatINR(shippingFee)}
                </span>
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
                <span>Processing Order...</span>
              ) : (
                <span>
                  {formData.paymentMethod === 'razorpay' ? 'Proceed to Razorpay Payment' : 'Confirm & Place Order'}
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
