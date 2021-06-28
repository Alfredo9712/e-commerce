const express = require("express");
const router = express.Router();
const data = require("../db.json");
const PantProduct = require("../schema/pantProductSchema");
const PANT = "pants";

//* GET REQUEST
router.get("/pants", async (req, res) => {
  const pants = await PantProduct.find({});
  res.json(pants).status(200);
});

//* POST REQUEST
router.post("/pants", (req, res) => {
  const { category, product, image, sizes } = req.body;
  const newProduct = new PantProduct({
    category,
    product,
    image,
    sizes,
  });
  category !== PANT
    ? res.json({ msg: "Incorrect category" }).status(400)
    : newProduct.save();
  res.send(`Product added`).status(200);
});
module.exports = router;
