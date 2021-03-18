const Users = require("../models/usersModel");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");

module.exports = function (app) {
  /////////add new User  (reg)/////////
  app.post("/user/register", async (req, res, next) => {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const hashedRepeatedPassword = await bcrypt.hash(
        req.body.repeatedPassword,
        salt
      );
      // console.log(salt);
      // console.log(hashedPassword);

      var newUser = new Users({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        repeatedPassword: hashedRepeatedPassword,
      });

      Users.find(
        {
          email: req.body.email,
        },
        function (err, USER) {
          if (USER[0] !== undefined) {
            if ((USER[0].email = req.body.email)) {
              res.status(500).send("email already exists");
            }
          } else {
            if (newUser.password !== newUser.repeatedPassword) {
              // throw new Error("Password don't Match");
              res.send("Password and repeated password don't Match");
            } else {
              newUser.save(function (err) {
                if (err) throw err;
                res.status(200).send("User Added");
              });
            }
          }
        }
      );
    } catch {
      res.status(500).send("an error occured");
    }
  });

  /////////login/////////
  app.post("/user/login", (req, res) => {
    Users.find(
      {
        email: req.body.email,
      },
      async function (err, USER) {
        if (err) throw err;

        try {
          if (
            (await bcrypt.compare(req.body.password, USER[0].password)) === true
          ) {
            console.log("Logged in Successfully");
            const accessToken = jwt.sign(
              USER[0].email,
              process.env.ACCESS_TOKEN_SECRET
            );
            const userId = USER[0]._id;
            // const UserName = USER[0].userName;
            // res.json({ accessToken: accessToken });

            res.status(200).json({
              USER,
              accessToken,
              userId,
            });
          } else {
            console.log("inCorrect password");
            res.status(500).send("inCorrect password");
          }
        } catch {
          res.status(500).send("Email not found");
          // console.log('error occurred');
        }
      }
    );
  });

  /////////get all users/////////
  app.get("/users", function (req, res) {
    Users.find({}, function (err, USERS) {
      if (err) throw err;
      console.log("ay7aga");
      res.send(USERS);
    });
  });

  /////////get user by name/////////
  app.get("/users/name/:userName", function (req, res) {
    Users.find(
      {
        userName: req.params.userName,
      },
      function (err, USERS) {
        if (err) throw err;

        res.send(USERS);
      }
    );
  });

  /////////get user by ID/////////

  app.get("/user/id/:id", function (req, res) {
    console.log(req.params.id);
    // let ID = req.params.id;
    Users.findById(
      {
        /* var ObjectId = require('mongoose').Types.ObjectId; 
  var query = { campaign_id: new ObjectId(campaign._id) }; */
        _id: new mongoose.Types.ObjectId(req.params.id),
      },
      function (err, USER) {
        if (err) throw err;
        console.log(USER);
        res.send(USER);
      }
    );
  });
  // app.get('/api/user/id/:id', function (req, res, next) {
  //   console.log('aaa');
  //   let ID = req.params.id;

  //   Users.findOne({
  //       ID
  //     })
  //     .then(USER => {
  //       console.log(USER);
  //       res.status(200).send(USER)
  //     })
  //     .catch(next)
  // })

  /////////get user by Email/////////
  app.get("/user/email/:email", function (req, res) {
    Users.find(
      {
        email: req.params.email,
      },
      function (err, USER) {
        if (err) throw err;

        res.send(USER);
      }
    );
  });

  /////////update user by ID/////////
  app.put("/user", async (req, res) => {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const hashedRepeatedPassword = await bcrypt.hash(
        req.body.repeatedPassword,
        salt
      );

      if (req.body._id) {
        Users.findByIdAndUpdate(
          req.body._id,
          {
            // _id: req.body.id,
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
            repeatedPassword: hashedRepeatedPassword,
            address: req.body.address,
          },
          function (err, USER) {
            if (err) throw err;
            res.send("updated successfully");
          }
        );
      }
    } catch {}
  });

  /////////delete user by ID/////////
  app.delete("/user/:id", function (req, res) {
    Users.findByIdAndRemove(req.params.id, function (err) {
      if (err) throw err;
      console.log("deleteddd");
      res.send("deleted");
    });
  });

  /////////login with Facebook/////////
  app.post("/user/login/facebook", (req, res) => {
    Users.findOne(
      {
        email: req.body.email,
      },
      function (err, USER) {
        if (err) throw err;

        if (USER === null || USER.length === 0) {
          res.status(404).send("Email Not Found");
        } else {
          let user = USER.toObject();
          if (user.provider == "FACEBOOK") {
            console.log("Logged in Successfully");
            const accessToken = jwt.sign(
              USER.email,
              process.env.ACCESS_TOKEN_SECRET
            );
            const userId = USER._id;

            res.status(200).json({
              USER,
              accessToken,
              userId,
            });
          } else {
            res.status(404).send("Provider Not Match");
          }
        }
      }
    );
  });

  /////////login with Google/////////
  app.post("/user/login/google", (req, res) => {
    Users.findOne(
      {
        email: req.body.email,
      },
      function (err, USER) {
        if (err) throw err;

        if (USER === null || USER.length === 0) {
          res.status(404).send("Email Not Found");
        } else {
          let user = USER.toObject();
          if (user.provider == "GOOGLE") {
            console.log("Logged in Successfully");
            const accessToken = jwt.sign(
              USER.email,
              process.env.ACCESS_TOKEN_SECRET
            );
            const userId = USER._id;

            res.status(200).json({
              USER,
              accessToken,
              userId,
            });
          } else {
            res.status(404).send("Provider Not Match");
          }
        }
      }
    );
  });
};

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}
