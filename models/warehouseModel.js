var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var warehouseSchema = new Schema({
  // _id: String,
  name: { type: String, required: true },
  location: { type: String, required: true },
  totalOrders: { type: Number, required: true },
  totalProducts: { type: Number, required: true },
  isFull: { type: Boolean, required: true },
});

var TestWarehouse = mongoose.model("TestWarehouse", warehouseSchema);

module.exports = TestWarehouse;
