var Sellers = require("../models/sellersModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = function (app) {
  /////////add new seller/////////
  app.post("/api/sellers/register", function (req, res, next) {
    console.log(req.body)
    var newSeller = new Sellers({
      sellerName: req.body.sellerName,
      email: req.body.email,
      password: req.body.password,
      repeatedPassword: req.body.repeatedPassword,
      phone: req.body.phone,
      provider: req.body.provider,
      /* name: {
        first: req.body.name.first,
        last: req.body.name.last,
      },
     
      category:req.body.category,
      logoImg: req.body.logoImg,
      dateOfRegister: req.body.dateOfRegister,
      shortDesc: req.body.shortDesc,

      address: {
        postalCode: req.body.address.postalCode,
        street: req.body.address.street,
        state: req.body.address.state,
        city: req.body.address.city,
        country: req.body.address.country,
        geoMap: {
          latitude: req.body.address.geoMap.latitude,
          longitude: req.body.address.geoMap.longitude,
        },
      }, */
    });
console.log(newSeller)
    if (newSeller.password !== newSeller.repeatedPassword) {
      throw new Error("Password don't Match");
    }

    newSeller.validate(function (err) {
      if (err) console.log(err);
      else {
        Sellers.create(newSeller)
          .then((seller) => res.status(201).send(seller))
          .then(console.log("seller added"))
          .catch(next);
      }
    });
  });

  /////////get all sellers/////////
  app.get("/api/sellers", function (req, res, next) {
    Sellers.find({})
      .then((sellers) => res.status(200).send(sellers))
      .catch(next);
  });

  /////////get seller by sellerName/////////
  app.get("/api/sellers/name/:sellerName", function (req, res, next) {
    Sellers.find({ sellerName: req.params.sellerName })
      .then((seller) => res.status(200).send(seller))
      .catch(next);
  });

  /////////login/////////
  app.post("/api/sellers/login", async (req, res) => {
    console.log(req)
    try {
      const seller = await Sellers.findOne({ email: req.body.email });
      console.log(seller);
      if (seller) {
        const match = await bcrypt.compare(req.body.password, seller.password);
        if (match) {
          const token = jwt.sign(
            { sellerId: seller._id },
            "RANDOM_TOKEN_SECRET",
            { expiresIn: "24h" }
          );
          res.status(200).json({
            seller: seller,
            token: token,
          });
        } else {
          res.status(401).send("Incorrect password!");
          
        }
      } else {
        res.status(404).send("this Email is not Registered!");
        
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error Occured");
    }
  });
  /////////get seller by ID/////////
  app.get("/api/sellers/id/:id", function (req, res, next) {
    Sellers.findById({ _id: req.params.id })
      .then((seller) => res.status(200).send(seller))
      .catch(next);
  });

  /////////update seller by ID/////////
  app.put("/api/sellers/:id", function (req, res, next) {
    const updatedSeller = new Sellers({
      _id: req.params.id,
      sellerName: req.body.sellerName,
      email: req.body.email,
      password: req.body.password,
      repeatedPassword: req.body.repeatedPassword,
      provider : req.body.provider,
      name: {
        first: req.body.name.first,
        last: req.body.name.last,
      },
      phone: req.body.phone,
      category: req.body.category,
      logoImg: req.body.logoImg,
      dateOfRegister: req.body.dateOfRegister,
      shortDesc: req.body.shortDesc,

      address: {
        postalCode: req.body.address.postalCode,
        street: req.body.address.street,
        state: req.body.address.state,
        city: req.body.address.city,
        country: req.body.address.country,
        geoMap: {
          latitude: req.body.address.geoMap.latitude,
          longitude: req.body.address.geoMap.longitude,
        },
      },
    });
    if (updatedSeller.password !== updatedSeller.repeatedPassword) {
      throw new Error("Password don't Match");
    }
    if (updatedSeller.password === updatedSeller.repeatedPassword) {
      const bcrypt = require("bcrypt");
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(updatedSeller.password, salt);
      const hashedRepeatedPassword = bcrypt.hashSync(
        updatedSeller.repeatedPassword,
        salt
      );
      updatedSeller.password = hashedPassword;
      updatedSeller.repeatedPassword = hashedRepeatedPassword;
    }

    updatedSeller.validate(function (err) {
      if (err) console.log(err);
      else {
        Sellers.updateOne({ _id: req.params.id }, updatedSeller)
          .then(() => Sellers.findById({ _id: req.params.id }))
          .then((seller) => res.status(200).send(seller))
          .then(console.log("seller updated"))
          .catch(next);
      }
    });
  });

  /////////delete seller by ID/////////
  app.delete("/api/sellers/:id", function (req, res, next) {
    Sellers.deleteOne({ _id: req.params.id })
      .then((seller) => res.status(204).send(seller))
      .then(console.log("Seller is deleted"))
      .catch(next);
  });

  ////////// login with google /////////
  app.post("/api/seller/google", function (req, res, next) {
    Sellers.findOne({ email: req.body.email })
      .then((seller) => {
        if (seller != null) {
          let sel = seller.toObject();
          if(sel.provider === "GOOGLE")
          {
            console.log("loged in")
            const token = jwt.sign(
              { sellerId: seller._id },
              "RANDOM_TOKEN_SECRET",
              { expiresIn: "1h" }
            );
            res.status(200).json({
              seller: seller,
              token: token,
            });
          }
          else{
            res.status(404).send("Provider Not Match");
          }
        } else {
          res.status(404).send("Email Not Found");
        }
      })
      .catch(next);
  });
  ////////// login with facebook /////////
  app.post("/api/seller/facebook", function (req, res, next) {
    Sellers.findOne({ email: req.body.email })
      .then((seller) => {
        if (seller != null) {
          let sel = seller.toObject();
          if(sel.provider === "FACEBOOK")
          {
          console.log("loged in")
          const token = jwt.sign(
            { sellerId: seller._id },
            "RANDOM_TOKEN_SECRET",
            { expiresIn: "1h" }
          );
          res.status(200).json({
            seller: seller,
            token: token,
          });
        }
        else{
          res.status(404).send("Provider Not Match");
        }
        } else {
          res.status(404).send("Email Not Found");
        }
      })
      .catch(next);
  });
};
