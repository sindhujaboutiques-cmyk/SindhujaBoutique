import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Package, ArrowRight, Phone, Home, Sparkles } from 'lucide-react';
import SEO from '../components/common/SEO';
import { formatINR } from '../context/CartContext';
import { BUSINESS_CONFIG } from '../config/businessConfig';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`sinduja_order_${orderId}`);
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not read order from localStorage', e);
    }
  }, [orderId]);

  const whatsappMessage = order
    ? `🌸 *New Order Confirmation - Sinduja Boutique*\n\n` +
      `*Order ID:* ${order.orderId}\n` +
      `*Customer Name:* ${order.customer?.name}\n` +
      `*Phone:* ${order.customer?.phone}\n` +
      `*Delivery Address:* ${order.customer?.address}\n` +
      (order.stitchingNotes ? `*Tailoring Notes:* ${order.stitchingNotes}\n` : '') +
      `*Payment Method:* ${order.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : order.paymentMethod === 'razorpay' ? 'Razorpay Online' : 'WhatsApp UPI'}\n\n` +
      `*Items Ordered:*\n` +
      order.items?.map((it, idx) => `${idx + 1}. ${it.name} (Qty: ${it.quantity}${it.size ? `, Size: ${it.size}` : ''}) - ${formatINR(it.numericPrice * it.quantity)}`).join('\n') +
      `\n\n*Total Amount:* ${formatINR(order.total)}\n\n` +
      `Please confirm my order and share courier dispatch/measurement details.`
    : `Hello Sinduja Boutique! I have placed order #${orderId}. Please confirm my order details.`;

  return (
    <div className="bg-white py-12 sm:py-20 min-h-[80vh]">
      <SEO title="Order Confirmed" description="Thank you for your order at Sinduja Boutique." />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-6 shadow-sm animate-bounce-slow">
          <CheckCircle2 className="w-12 h-12 stroke-[2]" />
        </div>

        <span className="text-xs uppercase font-bold tracking-[0.25em] text-boutique-berry bg-boutique-blushMedium px-3.5 py-1 rounded-full border border-boutique-pink/30">
          Order Successfully Placed
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-boutique-charcoal mt-3 mb-2">
          Thank You, {order?.customer?.name || 'Valued Customer'}!
        </h1>

        <p className="text-gray-600 text-sm sm:text-base font-light max-w-lg mx-auto leading-relaxed">
          Your order has been recorded. Our boutique team will review your order details and reach out to you directly for dispatch updates and custom tailoring measurements.
        </p>

        {/* Order ID Card */}
        <div className="mt-8 p-6 rounded-2xl bg-boutique-blushLight border border-boutique-blushMedium max-w-xl mx-auto text-left shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-boutique-blushMedium">
            <div>
              <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold block">Order Reference ID</span>
              <span className="font-mono text-lg font-bold text-boutique-berry tracking-wider">#{orderId}</span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold block">Payment Mode</span>
              <span className="text-xs font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {order?.paymentMethod === 'cod' ? 'Cash on Delivery' : order?.paymentMethod === 'razorpay' ? 'Razorpay Online' : 'WhatsApp UPI'}
              </span>
            </div>
          </div>

          {order && (
            <div className="py-4 space-y-2 text-xs text-gray-600 border-b border-boutique-blushMedium">
              <p><strong className="text-boutique-charcoal">Delivery Address:</strong> {order.customer?.address}</p>
              <p><strong className="text-boutique-charcoal">Phone:</strong> {order.customer?.phone}</p>
              {order.stitchingNotes && (
                <p><strong className="text-boutique-charcoal">Tailoring Notes:</strong> {order.stitchingNotes}</p>
              )}
              <div className="pt-2">
                <span className="font-semibold text-boutique-charcoal block mb-1">Items ({order.items?.length}):</span>
                <ul className="space-y-1 list-disc list-inside text-gray-700">
                  {order.items?.map((it, idx) => (
                    <li key={idx}>
                      {it.name} (x{it.quantity}) {it.size ? `• ${it.size}` : ''} — <strong>{formatINR(it.numericPrice * it.quantity)}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="pt-3 flex justify-between items-center text-sm font-bold text-boutique-charcoal">
            <span>Total Payable Amount</span>
            <span className="font-serif text-xl text-boutique-berry">
              {order ? formatINR(order.total) : 'Confirmed'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          {/* Send Order to WhatsApp */}
          <a
            href={BUSINESS_CONFIG.getWhatsAppUrl('general', whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            <span>Send Order via WhatsApp</span>
          </a>

          {/* Continue Shopping */}
          <Link
            to="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center py-3.5 px-6 rounded-full bg-boutique-blush hover:bg-boutique-blushMedium text-boutique-charcoal font-semibold text-xs tracking-wider transition-colors border border-boutique-blushMedium"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        {/* Assistance Note */}
        <div className="mt-8 text-xs text-gray-500 font-light">
          <p>
            Need urgent assistance or want to add matching accessories? Call Sinduja directly at{' '}
            <a href={BUSINESS_CONFIG.getCallUrl()} className="font-bold text-boutique-rose hover:underline">
              {BUSINESS_CONFIG.phoneDisplay}
            </a>.
          </p>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;
