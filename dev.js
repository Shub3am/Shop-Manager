const mongo = require("mongoose");
const SingleProduct = require("./Models/SingleProduct");
mongo.set("strictQuery", true);
mongo.connect("mongodb://127.0.0.1:27017/Shop");

SingleProduct.insertMany([
  { name: "Grapes", price: 100, category: "fruits" },
  { name: "Eggs", price: 132, category: "nonVeg" },
  { name: "Pickle", price: 132, category: "vegatable" },
])
  .then((res) => console.log("Done"))
  .catch((err) => console.log("Err: ", err));
