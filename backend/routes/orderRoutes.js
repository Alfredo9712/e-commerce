const express = require("express");
const router = express.Router();
const Order = require("../schema/orderSchema");
router.post("/order", async (req, res) => {
  const { order, billingDetails } = req.body;
  try {
    const newOrder = new Order({
      order,
      billingDetails,
    });
    newOrder.save();
    res.send("Order added").status(200);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
