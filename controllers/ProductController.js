const Products = require('../models/productModel');

module.exports = function (app) {
   
    // get all
    app.get('/api/products', function (req, res ,next) {

        Products.find({})
        .then(products => res.status(200).send(products))
        .catch(next)
    });

    //   find by name 
    app.get('/api/product/name/:prodName', function (req, res,next) {

        Products.find({productName: req.params.prodName})
        .then(product => res.status(200).send(product))
        .catch(next)
    });

    // find by id
    app.get('/api/product/id/:id', function (req, res,next) {
        Products.findById({_id: req.params.id})
        .then(product => res.status(200).send(product))
        .catch(next)
    })

    //  add new 
    app.post('/api/product/add', function (req, res , next) {
        console.log(req.body);
            Products.create(req.body)
            .then(product =>
                res.status(201).send(product))
            .catch(next)              
    })

    // edit
    app.put('/api/product/:id', function (req, res , next) {
        const prodId = req.params.id;
        const product = req.body;

        Products.findByIdAndUpdate({_id: prodId}, product)
        .then(() => Products.findById({_id: prodId}))
        .then(product => res.status(200).send(product))
        .catch(next);
    })

    // find by id and delete
    app.delete('/api/product/:id', function (req, res , next) {

        Products.findByIdAndRemove({_id: req.params.id})
        .then(product => res.status(204).send(product))
        .catch(next);
    })

    //get products by seller id
    app.get('/api/seller/products/:id', function(req,res,next){
        console.log(req.params.id)
        Products.find({productSales: req.params.id})
        .then(products => 
            {console.log(products);
            res.status(200).send(products)})
        .catch(next);
    })

    //get products by subCategory
    app.get('/api/products/sub/:sub', function(req,res,next){
        console.log(req.params.sub)
        Products.find({productSubCategory: req.params.sub})
        .then(products => 
            {console.log(products);
            res.status(200).send(products)})
        .catch(next);
    })
    //get products by Category
    app.get('/api/products/category/:category', function(req,res,next){
        console.log(req.params.category)
        Products.find({productCategory: req.params.category})
        .then(products => 
            {console.log(products);
            res.status(200).send(products)})
        .catch(next);
    })

}
