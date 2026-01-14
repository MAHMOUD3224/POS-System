const Stripe = require("stripe");
const config = require("../config/config");
// const crypto = require("crypto"); // TODO: For future use in webhooks & payment verification
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


// TODO: Stripe payment verification (if needed in the future)
// const verifyPayment = async (req, res, next) => {
//   try {
//     const { stripe_payment_intent_id } = req.body;
//     
//     // Retrieve the PaymentIntent from Stripe to verify
//     const paymentIntent = await stripe.paymentIntents.retrieve(stripe_payment_intent_id);
//     
//     if (paymentIntent.status === 'succeeded') {
//       res.json({ success: true, message: "Payment verified successfully!" });
//     } else {
//       const error = createHttpError(400, "Payment verification failed!");
//       return next(error);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// TODO: Stripe webhook verification (for production use)
// const webHookVerification = async (req, res, next) => {
//   try {
//     const sig = req.headers['stripe-signature'];
//     const webhookSecret = config.stripeWebhookSecret;
//     
//     let event;
//     
//     try {
//       event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
//     } catch (err) {
//       console.log(`⚠️  Webhook signature verification failed.`, err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }
//     
//     // Handle the event
//     switch (event.type) {
//       case 'payment_intent.succeeded':
//         const paymentIntent = event.data.object;
//         console.log(`💰 PaymentIntent was successful: ${paymentIntent.id}`);
//         
//         // Add Payment Details to Database
//         // const newPayment = new Payment({
//         //   paymentId: paymentIntent.id,
//         //   amount: paymentIntent.amount / 100,
//         //   currency: paymentIntent.currency,
//         //   status: paymentIntent.status,
//         //   paymentMethod: paymentIntent.payment_method,
//         //   createdAt: new Date(paymentIntent.created * 1000)
//         // });
//         //
//         // await newPayment.save();
//         break;
//       
//       case 'payment_intent.payment_failed':
//         const failedPayment = event.data.object;
//         console.log(`❌ Payment failed: ${failedPayment.id}`);
//         break;
//       
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }
//     
//     res.json({ received: true });
//   } catch (error) {
//     next(error);
//   }
// };


module.exports = { createOrder };