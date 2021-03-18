
 var Advertisments = require('../models/advertisementsModel');
 var bodyParser = require('body-parser');
 const {
     json
} = require('body-parser');
 


 module.exports = function (app) {

     app.use(bodyParser.json());
     app.use(bodyParser.urlencoded({
         extended: true
     }));



     //  app.get('/api/addadvertisement', function (req, res) {

     //      var setAd = [{
     //          _id: '5ff77bf22ee5cc15bcc44ebc',
     //          companyName: 'rowland Group',
     //          AdTitle: 'Self-enabling asynchronous capability',
     //          AdDescription: 'Self-enabling asynchronous capability decription...',
     //          date: {
     //              publishedDate: 'Wed Feb 26 2020 22:55:40',
     //              expirationDate: 'Fri Aug 19 2022 17:07:33'
     //          },
     //          websiteUrl: 'https://rowland.info',
     //          img: 'https://static.vecteezy.com/system/resources/previews/000/160/661/non_2x/vector-referrals-business-location-icons.jpg'
     //      }];

     //      Advertisments.create(setAd, function (err, results) {

     //          res.send(results);
     //      });
     //  });




     // get all
     app.get('/api/advertisements', function (req, res) {

         Advertisments.find({}, function (err, advertisements) {
             if (err) throw err;

             res.send(advertisements)
         });
     });

     //   find by name 
     app.get('/api/advertisements/:companyname', function (req, res) {

         Advertisments.find({
                 companyName: req.params.companyname
             },
             function (err, advertisements) {
                 if (err) throw err;

                 res.send(advertisements)
             });
     });

     // find by id
     app.get('/api/advertisement/:id', function (req, res) {
         console.log('aykalam');
         Advertisments.findById({
                 _id: req.params.id
             },
             function (err, advertisement) {
                 if (err) throw err;
                console.log(advertisement);
                 res.send(advertisement);
             })
     })

     // find and update & add new (if-else)
     app.post('/api/advertisement', function (req, res) {
         if (req.body._id) {
            //  console.log('ay7aga');
             Advertisments.findByIdAndUpdate(req.body._id, {

                     companyName: req.body.companyName,
                     AdTitle: req.body.AdTitle,
                     AdDescription: req.body.AdDescription,
                     date: req.body.date,
                     websiteUrl: req.body.websiteUrl,
                     img: req.body.img,

                 },
                 function (err, advertisement) {
                     if (err) throw err;
                     
                     console.log(advertisement); 
                     res.send(advertisement);
                 })
         } else {
               var newAdvertisement = Advertisments({
                   companyName: req.body.companyName,
                   AdTitle: req.body.AdTitle,
                   AdDescription: req.body.AdDescription,
                   date: req.body.date,
                   websiteUrl: req.body.websiteUrl,
                   img: req.body.img,
               });
          

               newAdvertisement.save(function (err) {
                   if (err) throw err;
                   res.send('Added');
               })
             

         }
     })

     // find by id and delete
     app.delete('/api/advertisement/:id', function (req, res) {

         Advertisments.findByIdAndRemove(req.params.id, function (err) {
             if (err) throw err;
             res.send('deleted');
         })
     })




 }