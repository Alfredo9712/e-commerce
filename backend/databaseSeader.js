const Product = require("./schema/productSchema");
const data = require("./prductsData");
const connectDB = require("./database/db");

require("dotenv").config();

connectDB();

const importData = async () => {
  try {
    // await Product.deleteMany();
    await Product.insertMany(data);
    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.log(`${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
