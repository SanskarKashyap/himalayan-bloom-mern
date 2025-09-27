import Razorpay from 'razorpay';

let razorpayInstance;

function getRazorpay() {
  if (razorpayInstance) {
    return razorpayInstance;
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw Object.assign(new Error('Razorpay credentials are not configured'), { statusCode: 500 });
  }

  razorpayInstance = new Razorpay({ key_id: keyId, key_secret: keySecret });
  return razorpayInstance;
}

export async function createPaymentOrder(req, res, next) {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body ?? {};

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ message: 'A valid amount is required to create a payment order' });
    }

    const razorpay = getRazorpay();

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: receipt ?? `hb_${Date.now()}`,
      notes: {
        ...(notes && typeof notes === 'object' ? notes : {}),
        userEmail: req.user?.email,
      },
    });

    return res.json({ order });
  } catch (error) {
    if (error?.message === 'Razorpay credentials are not configured') {
      return res.status(500).json({ message: error.message });
    }

    return next(error);
  }
}
