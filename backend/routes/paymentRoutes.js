const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.SECRET_KEY);

const calculateOrderAmount = (cart) => {};
router.post('/', async (req, res) => {
  const { amount } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
  });
  res.json({ client_secret: paymentIntent.client_secret });
});

module.exports = router;
