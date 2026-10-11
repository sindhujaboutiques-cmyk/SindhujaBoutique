const Razorpay = require('razorpay');
const crypto = require('crypto');

/**
 * Controller for Razorpay Standard Checkout
 */

/**
 * @route   POST /api/create-order
 * @desc    Create a new Razorpay order
 * @access  Public
 */
const createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;

    // Minimum amount validation: 100 paise (₹1.00)
    if (!amount || isNaN(amount) || Number(amount) < 100) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount. Minimum transaction amount is 100 paise (₹1.00).'
      });
    }

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return res.status(401).json({
        success: false,
        message: 'Razorpay credentials not configured on the server.'
      });
    }

    const instance = new Razorpay({
      key_id,
      key_secret
    });

    const options = {
      amount: Math.round(Number(amount)), // amount in paise
      currency: currency || 'INR',
      receipt: receipt ? String(receipt).slice(0, 40) : `rcpt_${Date.now()}`.slice(0, 40),
      notes: notes || {}
    };

    const order = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      order
    });
  } catch (error) {
    console.error('Razorpay Create Order Error:', error);
    const statusCode = error.statusCode === 401 ? 401 : 500;
    return res.status(statusCode).json({
      success: false,
      message: error.error?.description || error.description || error.message || 'Failed to create Razorpay order',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

/**
 * @route   POST /api/verify-payment
 * @desc    Verify Razorpay payment signature
 * @access  Public
 */
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        isPaid: false,
        message: 'Missing required parameters: razorpay_order_id, razorpay_payment_id, and razorpay_signature are required.'
      });
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_secret) {
      return res.status(401).json({
        success: false,
        isPaid: false,
        message: 'Razorpay Key Secret is not configured on the server.'
      });
    }

    // Signature verification algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const expectedData = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(expectedData)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        isPaid: false,
        message: 'Payment verification failed: Signature mismatch. Order not marked as paid.'
      });
    }

    return res.status(200).json({
      success: true,
      isPaid: true,
      message: 'Payment verified successfully.',
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id
    });
  } catch (error) {
    console.error('Razorpay Verify Payment Error:', error);
    return res.status(500).json({
      success: false,
      isPaid: false,
      message: error.message || 'Internal server error while verifying payment signature'
    });
  }
};

/**
 * @route   GET /api/razorpay-key
 * @desc    Get public Razorpay Key ID for frontend
 * @access  Public
 */
const getPublicKey = (req, res) => {
  const key_id = process.env.RAZORPAY_KEY_ID || '';
  return res.status(200).json({
    success: true,
    key_id
  });
};

module.exports = {
  createOrder,
  verifyPayment,
  getPublicKey
};
