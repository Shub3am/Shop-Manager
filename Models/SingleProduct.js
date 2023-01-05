const mongo = require("mongoose");
const { Schema, model } = require("mongoose");

const Product = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price can't be less than zero"],
  },
  category: {
    type: String,
    enum: ["vegatable", "fruits", "Non Veg"],
    required: true,
  },
  discount: Number,
});

const SingleProduct = new model("Products", Product);

module.exports = SingleProduct;
