const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
