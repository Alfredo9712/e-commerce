const mongoose = require("mongoose");

const pantProductSchema = mongoose.Schema({
  category: { type: String, required: true },
  product: { type: String, required: true },
  image: { type: String, required: true },
  sizes: [{ size: { type: String, quantity: { type: Number } } }],
});

const PantProduct = mongoose.model("PantProduct", pantProductSchema);
module.exports = PantProduct;
