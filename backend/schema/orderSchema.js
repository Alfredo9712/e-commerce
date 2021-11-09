const mongoose = require("mongoose");
var date = new Date(); // Or the date you'd like converted.
var isoDateTime = new Date(
  date.getTime() - date.getTimezoneOffset() * 60000
).toISOString();

const orderSchema = mongoose.Schema({
  amount: { type: Number, required: true },
  complete: { type: Boolean, default: false },
  order: [
    {
      price: { type: Number, required: true },
      category: { type: String, required: true },
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
  createdAt: { type: Date, default: isoDateTime },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
