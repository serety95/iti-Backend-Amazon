const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentMethodSchema = new Schema(
  {
    paymentMethodType: { type: String, required: true },
    img: { type: String, required: true },
  },
  { collection: "PaymentMethods" }
);

const PaymentMethods = mongoose.model("PaymentMethods", paymentMethodSchema);

module.exports = PaymentMethods;
