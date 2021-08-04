const express = require('express');
const router = express.Router();
const PantProduct = require('../schema/pantProductSchema');
const ShirtProduct = require('../schema/shirtProductSchema');
const authMiddleWare = require('./middleware');
router.get('/all-products', async (req, res) => {
  try {
    const shirtProducts = await ShirtProduct.find({});
    const pantProducts = await PantProduct.find({});
    const allProducts = [...shirtProducts, ...pantProducts];
    res.json(allProducts).status(200);
  } catch (error) {
    console.log(error);
  }
});

router.get('/test', authMiddleWare, async (req, res) => {
  const id = req.admin;
  try {
    res.json(req.admin);
  } catch (error) {
    console.log(error);
  }
});

router.get('/paginated-products/:start/:end', async (req, res) => {
  const start = parseInt(req.params.start);
  const end = parseInt(req.params.end);
  try {
    const shirtProducts = await ShirtProduct.find({});
    const pantProducts = await PantProduct.find({});
    const length = [...shirtProducts, ...pantProducts].length;
    const paginatedProducts = [...shirtProducts, ...pantProducts].slice(
      start,
      end
    );
    res.json({ paginatedProducts, length }).status(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
