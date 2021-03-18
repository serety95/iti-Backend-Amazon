const Warehouse = require("../models/warehouseModel");

module.exports = function (app) {
  // get all
  app.get("/api/warehouse", function (req, res, next) {
    Warehouse.find({})
      .then((Warehouse) => res.status(200).send(Warehouse))
      .catch(next);
  });

  // find by id
  app.get("/api/warehouse/id/:id", function (req, res, next) {
    Warehouse.findById({ _id: req.params.id })
      .then((warehouse) => res.status(200).send(warehouse))
      .catch(next);
  });

  //  add new
  app.post("/api/warehouse/add", function (req, res, next) {
    console.log(req.data);
    Warehouse.create(req.body)
      .then((warehouse) => res.status(201).send(warehouse))
      .catch(next);
  });

  // edit
  app.put("/api/warehouse/:id", function (req, res, next) {
    const warehouseId = req.params.id;
    const warehouse = req.body;

    Warehouse.findByIdAndUpdate({ _id: warehouseId }, warehouse)
      .then(() => Warehouse.findById({ _id: warehouseId }))
      .then((warehouse) => res.status(200).send(warehouse))
      .catch(next);
  });

  // find by id and delete
  app.delete("/api/warehouse/:id", function (req, res) {
    Warehouse.findByIdAndRemove({ _id: req.params.id }).then((warehouse) =>
      res.status(204).send(warehouse)
    );
  });
};
