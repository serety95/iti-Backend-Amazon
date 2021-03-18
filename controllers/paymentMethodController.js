const PaymentMethods = require("../models/paymentMethodModel");

module.exports = function (app) {
  app.get("/api/payment-methods", (req, res, next) => {
    PaymentMethods.find({})
      .then((paymentMethodDocuments) => {
        console.log(paymentMethodDocuments);
        res.status(200).json({
          message: "Payment Method fetched successfully",
          paymentMethods: paymentMethodDocuments,
        });
      })
      .catch(next);
  });

  app.post("/api/payment-methods", (req, res, next) => {
    const paymentMethod = new PaymentMethods({
      paymentMethodType: req.body.paymentMethodType,
      img: req.body.img,
    });
    paymentMethod
      .save()
      .then((createdPaymentMethod) => [
        res.status(201).json({
          message: "Payment Method added successfully",
          _id: createdPaymentMethod._id,
        }),
      ])
      .catch(next);
  });

  app.put("/api/payment-methods/:id", (req, res, next) => {
    const paymentMethod = new PaymentMethods({
      _id: req.body._id,
      paymentMethodType: req.body.paymentMethodType,
      img: req.body.img,
    });
    PaymentMethods.updateOne({ _id: req.body._id }, paymentMethod)
      .then(() => {
        res.status(200).json({ message: "Payment Method has been updated" });
      })
      .catch(next);
  });

  app.delete("/api/payment-methods/:id", (req, res, next) => {
    PaymentMethods.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({ message: "Payment Method has been deleted" });
      })
      .catch(next);
  });
};
