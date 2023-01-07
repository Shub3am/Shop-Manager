const express = require("express");
require("dotenv").config();
const App = express();
const method = require("method-override");
const path = require("path");
const mongo = require("mongoose");
const SingleProduct = require("./Models/SingleProduct");
mongo.set("strictQuery", true);

mongo
  .connect("mongodb://127.0.0.1:27017/Shop")
  .then((res) => console.log("Connected"))
  .catch((err) => console.log("error from mongo connect"));

App.use(method("_method"));
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.set("view engine", "ejs");
App.set("views", path.join(__dirname + "/views"));
App.use(express.static(path.join(__dirname + "/public")));

App.get("/", async (req, res) => {
  const { category } = req.query;

  if (category) {
    try {
      const Data = await SingleProduct.find({ category: category });
      Data
        ? res.render("Shop", {
            Products: Data,
          })
        : res.send("No Product in this Category or Category doesnt exists");
    } catch (err) {
      res.send(`Error ${err}`);
    }
  } else {
    try {
      const Data = await SingleProduct.find({});
      res.render("Shop", {
        Products: Data,
      });
    } catch (err) {
      res.send(`Error ${err}`);
    }
  }
});

App.get("/products/:name/edit", async (req, res) => {
  try {
    const Valid = await SingleProduct.findOne({ name: req.params.name });
    Valid
      ? res.render("edit", { Product: Valid })
      : res.send("Product Not Found!");
  } catch (err) {
    res.status(404).send("Database Error");
  }
});

App.get("/products", (res, req) => req.redirect("/"));

App.delete("/products/:name", async (req, res) => {
  const Delete = await SingleProduct.findOneAndDelete({
    name: req.params.name,
  });
  Delete != null ? res.redirect("/") : res.send("Product Not Found");
});

App.patch("/products/:name/edit", async (req, res) => {
  const { Name, Price, Category } = req.body;
  try {
    const Valid = await SingleProduct.findOneAndUpdate(
      { name: req.params.name },
      { $set: { name: Name, price: Price, category: Category } },
      { runValidators: true, new: true }
    );
    Valid ? res.redirect("/") : res.send("Error Failed");
  } catch (err) {
    res.status(404).send(err);
  }
});

App.get("/products/create", (req, res) => {
  res.render("create");
});

App.get("/products/:name", async (req, res) => {
  try {
    const Product = await SingleProduct.findOne({ name: req.params.name });
    Product ? res.render("SingleProduct", { Product }) : res.send("Not Found");
  } catch (err) {
    res.status(404).send("Error Occured");
  }
});

App.post("/products/create", async (req, res) => {
  const { name, price, category } = req.body;
  const Validator = await SingleProduct.find({
    name: name.toLowerCase(),
  });
  if (Validator.length != true) {
    try {
      const NewProduct = await new SingleProduct({
        name,
        price,
        category,
      }).save();
      res.redirect(`/products/${NewProduct.name}`);
    } catch (err) {
      res.send("Error Adding Product");
    }
  } else {
    res.send("Product already Exists!");
  }
});

App.listen(process.env.PORT || 3000, () => {
  console.log(process.env.PORT);
});
