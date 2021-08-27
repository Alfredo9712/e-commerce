//!Server dependecies
const express = require('express');
const cors = require('cors');
const app = express();
// const upload = require('express-fileupload');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const morgan = require('morgan');
//!Import of Routes
const shirtProductRoutes = require('./routes/shirtProductsRoutes');
const pantProductRoutes = require('./routes/pantProductsRoutes');
const allProductRoutes = require('./routes/allProductsRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoute = require('./routes/adminRoutes');
const uploadRoute = require('./routes/uploadRoute');

//!Import of database

const connectDb = require('./database/db');

//!Utilization
app.use(cors());
// app.use(upload());
app.use(express.json());

app.use(morgan('combined'));
//!Connection of database
connectDb();

app.use(
  '/api',
  shirtProductRoutes,
  pantProductRoutes,
  allProductRoutes,
  orderRoutes,
  adminRoute
);
app.use('/uploads', uploadRoute);
app.use('/create-payment-intent', paymentRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
  );
}

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
