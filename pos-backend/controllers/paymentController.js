const createHttpError = require("http-errors");
const Stripe = require("stripe");
const config = require("../config/config");
const Payment = require("../models/paymentModel");
const stripe = new Stripe(config.stripeSecretKey);

const createOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;

    // Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Amount in cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        integration: "POS System",
      },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

    // old code we make res like 
    // this res.status(200).json({ success: true, order });
    // why we use data in Bill if we sent clientSecret, paymentIntentId

  } catch (error) {
    console.log(error);
    next(error);
  }
};


const verifyPayment = async (req, res, next) => {
  try {
    const { stripe_payment_intent_id } = req.body;
 
    // Retrieve the PaymentIntent from Stripe to verify insted of using crypto.createHmac in razorpay
    const paymentIntent = await stripe.paymentIntents.retrieve(stripe_payment_intent_id);

    if (paymentIntent.status === 'succeeded') {
      res.json({ success: true, message: "Payment verified successfully!" });
    } else {
      const error = createHttpError(400, "Payment verification failed!");
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};


const webHookVerification = async (req, res, next) => {
  try {
    const signature = req.headers['stripe-signature'];
    const webhookSecret = config.stripeWebhookSecret;

    let event;

    try {
      // Using req.rawBody captured in app.js
      event = stripe.webhooks.constructEvent(req.rawBody, signature, webhookSecret);
    } catch (err) {
      console.log(err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      console.log(`💰 PaymentIntent was successful: ${paymentIntent}`);

      // 1. Try to extract phone number (Contact) specifically from charges
      let contactPhone = null;
      if (paymentIntent.charges && paymentIntent.charges.data.length > 0) {
        contactPhone = paymentIntent.charges.data[0].billing_details.phone;
      }

      // Create and Save Payment Record
      const newPayment = new Payment({
        paymentId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        method: paymentIntent.payment_method_types[0], // Taking the first method type e.g., 'card'
        createdAt: new Date(paymentIntent.created * 1000),
        contact: contactPhone,
      });

      await newPayment.save();
      console.log("✅ Payment saved to database");

    } else if (event.type === 'payment_intent.payment_failed') {
      const failedPayment = event.data.object;
      console.log(`❌ Payment failed: ${failedPayment}`);
    } else {
      console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    next(error);
  }
};


module.exports = { createOrder, verifyPayment, webHookVerification };