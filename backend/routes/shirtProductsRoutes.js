const express = require("express");
const router = express.Router();
const ShirtProduct = require("../schema/shirtProductSchema");
const SHIRT = "shirt";
require("dotenv").config();

router.get("/shirts", async (req, res) => {
  const products = await ShirtProduct.find({});
  res.json(products).status(200);
});

router.get("/shirts/:id", async (req, res) => {
  const _id = req.params.id;
  const product = await ShirtProduct.findById({ _id });
  res.json(product).status(200);
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

router.put("/shirts/:id", async (req, res) => {
  const _id = req.params.id;
  // const key = req.params.key;
  // key !== process.env.KEY && res.json({ msg: "Not authorized" }).status(400);
  const { category, product, image, sizes } = req.body;
  const updatedShirt = {
    category,
    product,
    image,
    sizes,
  };
  await ShirtProduct.replaceOne({ _id }, updatedShirt);
  res.send("Updated").status(200);
});
module.exports = router;
