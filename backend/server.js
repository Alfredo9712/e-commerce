//!Server dependecies
const express = require("express");
const cors = require("cors");
const app = express();
//!Import of Routes
const shirtProductRoutes = require("./routes/shirtProductRoutes");
//!Utilization
app.use(cors());
app.use(express.json());
app.use("/products", shirtProductRoutes);
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
