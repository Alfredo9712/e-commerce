const mongoose = require("mongoose");

const shirtProductSchema = mongoose.Schema({
  category: { type: String, required: true },
  product: { type: String, required: true },
  image: { type: String, required: true },
  sizes: [{ size: { type: String, quantity: { type: Number } } }],
});

const ShirtProduct = mongoose.model("ShirtProduct", shirtProductSchema);
module.exports = ShirtProduct;
