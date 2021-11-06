const express = require("express");
const router = express.Router();
const Order = require("../schema/orderSchema");
const authMiddleware = require("./middleware");

router.post("/order", async (req, res) => {
  const { order, billingDetails, amount } = req.body;
  try {
    const newOrder = new Order({
      order,
      billingDetails,
      amount,
    });
    newOrder.save();
    res.send("Order added").status(200);
  } catch (error) {
    console.log(error);
  }
});

router.put("/order/:id", async (req, res) => {
  const _id = req.params.id;
  const { complete } = req.body;
  const updatedOrder = {
    complete,
  };
  await Order.updateOne({ _id }, updatedOrder);
  res.send("Updated").status(200);
});

router.get("/order", async (req, res) => {
  const orders = await Order.find({});
  try {
    res.send(orders).status(200);
  } catch (error) {
    res.send(error).status(400);
  }
});
module.exports = router;
