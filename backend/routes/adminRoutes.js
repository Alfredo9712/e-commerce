const express = require('express');
const router = express.Router();
const Admin = require('../schema/adminSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware');
const path = require('path');
const saltRounds = 10;
const fs = require('fs');
const ShirtProduct = require('../schema/shirtProductSchema');
const PantProduct = require('../schema/pantProductSchema');

router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  !admin && res.json({ msg: 'Invalid credentials' }).status(400);
  const match = await bcrypt.compare(password, admin.password);
  !match && res.json({ msg: 'Invalid credentials' }).status(400);
  const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SECRET);
  res.header('x-auth-token', token).json({ token: token });

  res.send('login');

  res.send(error).status(400);
});

router.delete('/admin/:category/:id', authMiddleware, async (req, res) => {
  const { category, id } = req.params;
  if (category === 'pants') {
    await PantProduct.findByIdAndRemove(id);
    res.send('item removed').status(400);
  }
  await ShirtProduct.findByIdAndRemove(id);
  res.send('item removed').status(400);
});

// router.post('/admin', async (req, res) => {
//   const hash = await bcrypt.genSalt(saltRounds);
//   const hashedPassword = await bcrypt.hash("CSUSB2020/2021", hash);
//   try {
//     const admin = new Admin({
//       email: "ecommerce.react@gmail.com",
//       password: hashedPassword,
//     });
//     admin.save();
//     res.send("added");
//   } catch (err) {
//     console.log(err);
//   }
// });
module.exports = router;
