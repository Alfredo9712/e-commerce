const express = require("express");
const router = express.Router();
const data = require("../db.json");

router.get("/", (req, res) => {
  res.json(data);
});

router.get("/shirts", (req, res) => {
  res.json(data.shirtProducts);
});
router.get("/pants", (req, res) => {
  res.json(data.pantProducts);
});

module.exports = router;
