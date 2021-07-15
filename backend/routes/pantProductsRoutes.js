const express = require("express");
const router = express.Router();
const PantProduct = require("../schema/pantProductSchema");
const PANT = "pants";

//* GET REQUEST
//* PUBLIC
router.get("/pants", async (req, res) => {
  const pants = await PantProduct.find({});
  res.json(pants).status(200);
});

router.get("/pants/:id", async (req, res) => {
  const _id = req.params.id;
  const product = await PantProduct.findById({ _id });
  res.json(product).status(200);
});

//* POST REQUEST
//* PRIVATE
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

//* PUT REQUEST
//* PRIVATE
// router.put("/pants/:id", async (req, res) => {
//   const _id = req.params.id;
//   const { category, product, image, sizes } = req.body;
//   const updatedPant = {
//     category,
//     product,
//     image,
//     sizes,
//   };
//   category !== PANT
//     ? res.json({ msg: "Incorrect category" }).status(400)
//     : await PantProduct.replaceOne({ _id }, updatedPant);
//   res.send("Updated").status(200);
// });

router.put("/pants/:id", async (req, res) => {
  const _id = req.params.id;
  // const key = req.params.key;
  // key !== process.env.KEY && res.json({ msg: "Not authorized" }).status(400);
  const { sizes } = req.body;
  const updatedPants = {
    sizes,
  };
  await PantProduct.updateOne({ _id }, updatedPants);
  res.send("Updated").status(200);
});
module.exports = router;
