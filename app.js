const express = require("express");
const app = express();
// const bodyParser = require("body-parser");

// Connect to the MongoDB cluster
const mongoose = require("mongoose");
const mongoAtlasUri =
  "mongodb+srv://AhmadEltobshy:A123456@amazonclone.qg5vp.mongodb.net/AmazonDB?retryWrites=true&w=majority";
try {
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
}

const port = process.env.PORT || 3000;

//middleware
app.use(express.json())
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); //if we use views but this project is for API only
/* app.use("/assets", express.static(__dirname + "/public")); */
app.set("view engine", "ejs"); //if we use views but this project is for API only

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

//Controllers
const sellersController = require("./controllers/sellersController");
const categorysController = require("./controllers/categoryController");
const ProductController = require("./controllers/ProductController");
const OrderController = require("./controllers/OrderController");
const reviewController = require("./controllers/reviewController");
const usersController = require("./controllers/usersController");
const shipmentsController = require("./controllers/shipmentsController");
const advertisementsContorller = require("./controllers/advertisementsController");
const resetPasswordContorller = require("./controllers/resetPasswordController");

const warehouseContorller = require("./controllers/warehouseController");
const paymentMethodContorller = require("./controllers/paymentMethodController");

sellersController(app);
categorysController(app);
usersController(app);
ProductController(app);
OrderController(app);
reviewController(app);
usersController(app);
shipmentsController(app);
advertisementsContorller(app);
resetPasswordContorller(app);
warehouseContorller(app);
paymentMethodContorller(app);

//error middleware
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(422).send({ err: err.message });
});


app.listen(port, () => console.log("server started at port 3000"));


app.get("/", (req, res) => {
  res.send("Welcome To backend");
});
