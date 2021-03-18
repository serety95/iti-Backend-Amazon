var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Categories = new Schema(
  {
    // _id: String,
    name: String, 
    sub: [],
  },
  { collection: "Categories" }
);

var Categories = mongoose.model("Categories", Categories);

module.exports = Categories;
