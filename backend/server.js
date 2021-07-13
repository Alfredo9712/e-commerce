//!Server dependecies
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
//!Import of Routes
const shirtProductRoutes = require('./routes/shirtProductsRoutes');
const pantProductRoutes = require('./routes/pantProductsRoutes');
const allProductRoutes = require('./routes/allProductsRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
//!Import of database

const connectDb = require('./database/db');
//!Utilization
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
//!Connection of database
connectDb();

app.use('/api', shirtProductRoutes, pantProductRoutes, allProductRoutes);
app.use('/create-payment-intent', paymentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
