var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var token = jwt.sign({ foo: "bar" }, "shhhhh");

var Users = new Schema(
  {
    // _id: mongoose.Types.ObjectId,
    userName: {
      type: String,
      // required: true,
      max: 40,
      min: 6,
      // unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 40,
      min: 10,
      unique: true
    },
    name: { first: String, last: String },
    age: Number,
    phone: String,
    img: String,
    dateOfRegister: String,
    address: [
      {
        postalCode: Number,
        street: String,
        state: String,
        city: String,
        country: String,
        geoMap: {
          latitude: Number,
          longitude: Number,
        },
      },
    ],
    password: {
      type: String,
      required: true,
      // maxlength: 20,
      minlength: 6,
    },
    repeatedPassword: {
      type: String,
      // required: true,
      // maxlength: 20,
      minlength: 6,
    },

    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    provider:{
      type: String,
      enum:['','GOOGLE','FACEBOOK'],
      default:'',
    }
  },
  { collection: "Users" }
);

var Users = mongoose.model("Users", Users);

module.exports = Users;


