/**
 * Razorpay Integration Service for Sinduja Boutique
 * Ready to receive Live/Test Razorpay Key ID & Key Secret.
 */

// Dynamically load Razorpay SDK script if not already present
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn('Failed to load Razorpay SDK');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Check if Razorpay Key is configured
export const getRazorpayKey = () => {
  return import.meta.env.VITE_RAZORPAY_KEY_ID || window.__RAZORPAY_KEY_ID__ || '';
};

/**
 * Initiates Razorpay Payment
 * @param {Object} orderData - { orderId, amount, customerName, customerEmail, customerPhone, notes }
 * @param {Function} onSuccess - Callback when payment succeeds
 * @param {Function} onFailure - Callback when payment fails or cancelled
 */
export const initiateRazorpayPayment = async ({
  orderId,
  amount, // in INR
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  onFailure
}) => {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    onFailure?.(new Error('Razorpay SDK failed to load. Please check your internet connection.'));
    return;
  }

  const razorpayKey = getRazorpayKey();

  if (!razorpayKey) {
    // If Razorpay Key is not yet provided by the boutique owner
    onFailure?.({
      code: 'KEY_NOT_CONFIGURED',
      message: 'Razorpay Key has not been configured yet. Please choose Cash on Delivery or WhatsApp Confirmation.'
    });
    return;
  }

  const options = {
    key: razorpayKey,
    amount: Math.round(amount * 100), // Razorpay expects amount in paise (1 INR = 100 paise)
    currency: 'INR',
    name: 'Sinduja Boutique',
    description: `Order #${orderId} - Designer Wear & Tailoring`,
    image: '/assets/logo.png',
    handler: function (response) {
      // response = { razorpay_payment_id, razorpay_order_id, razorpay_signature }
      onSuccess?.(response);
    },
    prefill: {
      name: customerName,
      email: customerEmail || '',
      contact: customerPhone
    },
    theme: {
      color: '#8A1538' // Boutique Signature Berry Color
    },
    modal: {
      ondismiss: function () {
        onFailure?.({ code: 'PAYMENT_CANCELLED', message: 'Payment modal closed by user.' });
      }
    }
  };

  try {
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error('Error opening Razorpay modal:', err);
    onFailure?.(err);
  }
};
