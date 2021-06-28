//!Server dependecies
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
//!Import of Routes
const shirtProductRoutes = require("./routes/shirtProductsRoutes");
const pantProductRoutes = require("./routes/pantProductsRoutes");
const allProductRoutes = require("./routes/allProductsRoutes");
//!Import of database

const connectDb = require("./database/db");
//!Utilization
app.use(cors());
app.use(express.json());

connectDb();

app.use("/api", shirtProductRoutes, pantProductRoutes, allProductRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
