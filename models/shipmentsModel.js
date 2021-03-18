var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Shipments = new Schema(
  {
    userID: String,
    ordersID: String,
    deliveryFees: Number,
    totalPrice: Number,
    shipmentAddress: {
      postalCode: Number,
      street: String,
      state: String,
      city: String,
      country: String,
    },
    deliveryDate: String,
    paymentMethod: String,
    shippingCompany: String,
  },
  { collection: "Shipments" }
);

var Shipments = mongoose.model("Shipments", Shipments);

module.exports = Shipments;
