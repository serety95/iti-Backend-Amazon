var Shipments = require("../models/shipmentsModel");

module.exports = function (app) {
  /////////add new Shipment/////////
  app.post("/api/shipments", function (req, res, next) {
    var newShipment = new Shipments({
      userID: req.body.userID,
      ordersID: req.body.ordersID,
      deliveryFees: req.body.deliveryFees,
      totalPrice: req.body.totalPrice,
      shipmentAddress: {
        postalCode: req.body.shipmentAddress.postalCode,
        street: req.body.shipmentAddress.street,
        state: req.body.shipmentAddress.state,
        city: req.body.shipmentAddress.city,
        country: req.body.shipmentAddress.country,
      },
      deliveryDate: req.body.deliveryDate,
      paymentMethod: req.body.paymentMethod,
      shippingCompany: req.body.shippingCompany,
    });

    newShipment.validate(function (err) {
      if (err) console.log(err);
      else {
        Shipments.create(newShipment)
          .then((shipments) => res.status(201).send(shipments))
          .then(console.log("shipment added"))
          .catch(next);
      }
    });
  });

  /////////get all shipments/////////
  app.get("/api/shipments", function (req, res, next) {
    Shipments.find({})
      .then((shipments) => res.status(200).send(shipments))
      .catch(next);
  });

  /////////get shipment by company/////////
  app.get("/api/shipments/company/:shippingCompany", function (req, res, next) {
    Shipments.find({ shippingCompany: req.params.shippingCompany })
      .then((shipments) => res.status(200).send(shipments))
      .catch(next);
  });

  /////////get shipment by ID/////////
  app.get("/api/shipments/id/:id", function (req, res, next) {
    Shipments.findById({ _id: req.params.id })
      .then((shipments) => res.status(200).send(shipments))
      .catch(next);
  });

  /////////update shipment by ID/////////
  app.put("/api/shipments/:id", function (req, res, next) {
    const updatedShipment = new Shipments({
      _id: req.params.id,
      userID: req.body.userID,
      ordersID: req.body.ordersID,
      deliveryFees: req.body.deliveryFees,
      totalPrice: req.body.totalPrice,
      shipmentAddress: {
        postalCode: req.body.shipmentAddress.postalCode,
        street: req.body.shipmentAddress.street,
        state: req.body.shipmentAddress.state,
        city: req.body.shipmentAddress.city,
        country: req.body.shipmentAddress.country,
        geoMap: {
          latitude: req.body.shipmentAddress.geoMap.latitude,
          longitude: req.body.shipmentAddress.geoMap.longitude,
        },
      },
      deliveryDate: req.body.deliveryDate,
      paymentMethod: req.body.paymentMethod,
      shippingCompany: req.body.shippingCompany,
    });

    updatedShipment.validate(function (err) {
      if (err) console.log(err);
      else {
        Shipments.updateOne({ _id: req.params.id }, updatedShipment)
          .then(() => Shipments.findById({ _id: req.params.id }))
          .then((updatedShipment) => res.status(200).send(updatedShipment))
          .then(console.log("shipment updated"))
          .catch(next);
      }
    });
  });
  /////////delete shipment by ID/////////
  app.delete("/api/shipments/:id", function (req, res) {
    Shipments.deleteOne({ _id: req.params.id })
      .then((shipments) => res.status(204).send(shipments))
      .then(console.log("shipment deleted"));
  });
};
