const express = require("express");
const router = express.Router();
const PantProduct = require("../schema/pantProductSchema");
const ShirtProduct = require("../schema/shirtProductSchema");
router.get("/all-products", async (req, res) => {
  try {
    const shirtProducts = await ShirtProduct.find({});
    const pantProducts = await PantProduct.find({});
    const allProducts = [...shirtProducts, ...pantProducts];
    res.json(allProducts).status(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
