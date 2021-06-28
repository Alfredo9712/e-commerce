const mongoose = require("mongoose");

const shirtProductSchema = mongoose.Schema({
  category: { type: String, required: true },
  product: { type: String, required: true },
  image: { type: String, required: true },
  color: { type: String },
  sex: { type: String },
  sizes: [
    {
      size: { type: String },
      quantity: { type: Number },
      price: { type: Number },
    },
  ],
});

const ShirtProduct = mongoose.model("ShirtProduct", shirtProductSchema);
module.exports = ShirtProduct;
