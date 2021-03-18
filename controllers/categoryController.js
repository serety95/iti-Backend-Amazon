var Category = require("../models/categoryModel");

module.exports = function (app) {
  app.post("/api/addCategory", function (req, res) {
    var newCateogry = {
      name: req.body.name,
      sub: req.body.sub,
    };

    Category.create(newCateogry, function (err, results) {
      res.send("Category Added");
    });
  });

  app.get("/api/categories", function (req, res) {
    Category.find({}, function (err, Categories) {
      if (err) throw err;

      res.send(Categories);
    });
  });

  app.get("/api/categories/name/:catName", function (req, res) {
    Category.find(
      {
        name: req.params.catName,
        // name: "Electronics",
      },
      function (err, categories) {
        if (err) throw err;

        res.send(categories);
      }
    );
  });

  app.get("/api/categories/id/:id", function (req, res) {
    Category.findById(
      {
        _id: req.params.id,
      },
      function (err, categories) {
        if (err) throw err;
        res.send(categories);
      }
    );
  });

  app.get("/api/subCategories/id/:id", function (req, res) {
    Category.findById(
      {
        _id: req.params.id,
      },
      function (err, categories) {
        if (err) throw err;
        res.send(categories.sub);
      }
    );
  });

  app.put("/api/categories", function (req, res) {
    if (req.body._id) {
      Category.findByIdAndUpdate(
        req.body.id,
        {
          name: req.body.name,
          sub: req.body.sub,
        },
        function (err, categories) {
          if (err) throw err;
          res.send(categories);
        }
      );
    }
  });

  app.delete("/api/categories/:id", function (req, res) {
    Category.findByIdAndRemove(req.params.id, function (err) {
      if (err) throw err;
      res.send("deleted");
    });
  });
};
