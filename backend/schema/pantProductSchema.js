const mongoose = require("mongoose");

const pantProductSchema = mongoose.Schema({
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

const PantProduct = mongoose.model("PantProduct", pantProductSchema);
module.exports = PantProduct;
