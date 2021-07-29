const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  order: [
    {
      product: { type: String, required: true },
      quantityPurchased: { type: Number, required: true },
      sizePurchased: { type: String, required: true },
    },
  ],
  billingDetails: {
    email: { type: String, required: true },
    name: { type: String, required: true },
    address: {
      city: { type: String, required: true },
      line1: { type: String, requred: true },
      state: { type: String, required: true },
      postal_code: { type: String, required: true },
    },
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;