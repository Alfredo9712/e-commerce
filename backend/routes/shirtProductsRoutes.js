const express = require("express");
const router = express.Router();
const data = require("../db.json");
const ShirtProduct = require("../schema/shirtProductSchema");
const SHIRT = "shirt";
router.get("/shirts", async (req, res) => {
  const products = await ShirtProduct.find({});
  res.json(products).status(200);
});

router.post("/shirts", (req, res) => {
  const { category, product, image, sizes } = req.body;
  const newProduct = new ShirtProduct({
    category,
    product,
    image,
    sizes,
  });
  category !== SHIRT
    ? res.json({ msg: "Incorrect category" }).status(400)
    : newProduct.save();
  res.send(`Product added`).status(200);
});
module.exports = router;
