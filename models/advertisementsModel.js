var mongoose = require('mongoose');

var Schema = mongoose.Schema;


        var advertisementsSchema = new Schema({

            //    _id: String,
               companyName: String,
               AdTitle: String,
               AdDescription: String,
               date: {
                   publishedDate: String,
                   expirationDate: String,
               },
               websiteUrl: String,
               img: String,

        }, {
             collection: "Advertisments" 
        })

var Advertisments = mongoose.model('Advertisments', advertisementsSchema);

module.exports = Advertisments;