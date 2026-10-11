/**
 * Razorpay Standard Web Checkout Integration for Sinduja Boutique
 * Supports Order Creation -> Modal Payment -> Signature Verification
 */

import { createRazorpayOrder, verifyRazorpayPayment, getRazorpayPublicKey } from './api';

// Dynamically ensure Razorpay SDK script is loaded
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }
    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', () => resolve(false));
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

// Retrieve public key from Vite env or window
export const getRazorpayKey = () => {
  return (
    import.meta.env.VITE_RAZORPAY_KEY_ID ||
    window.__RAZORPAY_KEY_ID__ ||
    ''
  );
};

/**
 * Initiates Razorpay Standard Payment:
 * 1. Validates SDK & Key
 * 2. Creates order on server (/api/create-order)
 * 3. Opens Razorpay Modal with returned order_id
 * 4. Verifies signature on server (/api/verify-payment)
 *
 * @param {Object} params - { orderId, amount, customerName, customerEmail, customerPhone, notes, onSuccess, onFailure }
 */
export const initiateRazorpayPayment = async ({
  orderId,
  amount, // in INR
  customerName,
  customerEmail,
  customerPhone,
  notes = {},
  onSuccess,
  onFailure
}) => {
  try {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded || typeof window.Razorpay === 'undefined') {
      onFailure?.(new Error('Razorpay SDK failed to load. Please check your internet connection.'));
      return;
    }

    let razorpayKey = getRazorpayKey();
    if (!razorpayKey) {
      try {
        razorpayKey = await getRazorpayPublicKey();
      } catch (e) {
        console.warn('Could not fetch Razorpay key from server');
      }
    }

    if (!razorpayKey) {
      onFailure?.({
        code: 'KEY_NOT_CONFIGURED',
        message: 'Razorpay payment gateway credentials are not yet initialized. Please configure RAZORPAY_KEY_ID in your environment variables.'
      });
      return;
    }

    // Minimum transaction check: 100 paise (₹1.00)
    const amountInPaise = Math.round(Number(amount) * 100);
    if (isNaN(amountInPaise) || amountInPaise < 100) {
      onFailure?.({
        code: 'INVALID_AMOUNT',
        message: 'Minimum order amount for online payment is ₹1.00 (100 paise).'
      });
      return;
    }

    // 1. Create Order on Backend (POST /api/create-order)
    let serverOrder = null;
    let rzpOrderId = null;
    try {
      serverOrder = await createRazorpayOrder({
        amount: amountInPaise,
        currency: 'INR',
        receipt: orderId,
        notes: {
          customerName,
          customerPhone,
          orderId,
          ...notes
        }
      });
      rzpOrderId = serverOrder?.order_id || serverOrder?.order?.id;
    } catch (createErr) {
      console.warn('Backend order creation notice, fallback to direct modal checkout:', createErr);
    }

    // 2. Configure Razorpay Standard Checkout Modal
    const options = {
      key: razorpayKey,
      amount: serverOrder?.amount || amountInPaise,
      currency: serverOrder?.currency || 'INR',
      name: 'Sinduja Boutique',
      description: `Order #${orderId} - Handcrafted Saree & Boutique Wear`,
      image: '/assets/logo.png',
      ...(rzpOrderId ? { order_id: rzpOrderId } : {}),
      prefill: {
        name: customerName,
        email: customerEmail || '',
        contact: customerPhone
      },
      theme: {
        color: '#8A1538' // Sinduja Signature Berry
      },
      handler: async function (response) {
        // response = { razorpay_payment_id, razorpay_order_id, razorpay_signature }
        try {
          // 3. Verify Payment Signature on Backend (POST /api/verify-payment)
          const verifyResult = await verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });

          if (verifyResult && verifyResult.isPaid) {
            onSuccess?.({
              ...response,
              verified: true,
              receipt: serverOrder.receipt,
              verification: verifyResult
            });
          } else {
            onFailure?.({
              code: 'SIGNATURE_MISMATCH',
              message: verifyResult?.message || 'Payment signature verification failed. Order not marked as paid.'
            });
          }
        } catch (verifyErr) {
          console.error('Payment verification failed:', verifyErr);
          onFailure?.({
            code: 'VERIFY_FAILED',
            message: verifyErr.message || 'Failed to verify payment with server. Please contact boutique support.'
          });
        }
      },
      modal: {
        ondismiss: function () {
          onFailure?.({
            code: 'PAYMENT_CANCELLED',
            message: 'Payment cancelled. The transaction was not completed.'
          });
        }
      }
    };

    const rzpInstance = new window.Razorpay(options);

    // Handle payment.failed event
    rzpInstance.on('payment.failed', function (failedResponse) {
      console.error('Razorpay payment failed:', failedResponse);
      const errMsg = failedResponse.error?.description || failedResponse.error?.reason || 'Payment could not be processed.';
      onFailure?.({
        code: 'PAYMENT_FAILED',
        message: `${errMsg} (Error: ${failedResponse.error?.code || 'DECLINED'})`
      });
    });

    rzpInstance.open();
  } catch (err) {
    console.error('Razorpay initialization exception:', err);
    onFailure?.(err);
  }
};
