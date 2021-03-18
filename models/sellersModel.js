var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var Sellers = new Schema({
  
  sellerName: {
    type: String,
    required: true,
    max: 40,
    min: 6,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 40,
    min: 10,
    unique: true
  },
  password: {
    type: String,
    required: true,
    maxlength: 400,
    minlength: 6,
  },
  repeatedPassword: {
    type: String,
    required: true,
    maxlength: 400,
    minlength: 6,
  },
  name: { first: String, last: String },
  phone: String,
  category: String,
  logoImg: String,
  dateOfRegister: String,
  shortDesc: String,
  address: {
    postalCode: Number,
    street: String,
    state: String,
    city: String,
    country: String,
    geoMap: {
      latitude: Number,
      longitude: Number,
    },
    
  },provider:{
    type: String,
      enum:['','GOOGLE','FACEBOOK'],
      default:'',
  },
  
  
},{collection:"Sellers"});

Sellers.pre('save', async function (next) {
  try{
const salt = await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(this.password,salt)
const hashedRepeatedPassword=await bcrypt.hash(this.repeatedPassword,salt)
this.password=hashedPassword
this.repeatedPassword=hashedRepeatedPassword
next()
  }catch(err){
    next(err)
  }
});

Sellers.methods.comparePassword = function (myPlaintextPassword) {
  const sellerInstance = this;
  return bcrypt.compare(myPlaintextPassword, sellerInstance.password);
};

Sellers.pre('save', function (next) {
  var newSeller = this;
  Sellers.find({sellerName : newSeller.sellerName}, function (err, docs) {
      if (!docs.length){
          next();
      }else{                
          console.log('sellerName already exists!!: ',newSeller.sellerName);
          next(new Error("sellerName already exists!!"));
      }
  });
}) ;

Sellers.pre('save', function (next) {
  var newSeller = this;
  Sellers.find({email : newSeller.email}, function (err, docs) {
      if (!docs.length){
          next();
      }else{                
          console.log('this email is already registerd!!: ',newSeller.email);
          next(new Error("this email is already registerd!!"));
      }
  });
}) ;
//////////////////////update validation//////////////
////email validation//////////////
Sellers.pre('updateOne', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery())
  Sellers.find({email : docToUpdate.email}, function (err, docs) {
    if (!docs.length){
        next();
    }else{      
        next(new Error("this email is already registerd!!"));
    }
  });
}) ;

////sellerName validation//////////////
Sellers.pre('updateOne', async function(next) {
const docToUpdate = await this.model.findOne(this.getQuery())
Sellers.find({sellerName : docToUpdate.sellerName},  function (err, docs) {
  if (!docs.length){
      next();
  }else{                
      next(new Error("sellerName already exists!!"));
  }
}); 
})




var Sellers = mongoose.model("Sellers", Sellers);

module.exports = Sellers;
