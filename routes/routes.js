var express= require ('express');
var router = express.Router();
var promise= require('bluebird');
var Cart = require('../models/cart');
var Product = require('../models/product');

promise.promisifyAll(Product);

router.get('/api/products', function(req, res) {
  Product.find()
  .then(function(data){
    res.json(data);
  }).catch(function(err){
    console.log(err);
    process.exit(1);
  });
  
});

router.post('/api/products', function(req, res) {
    var newProduct = new Product(req.body);
    newProduct.save()
    .then(function(data){
      res.send(data);
    }).catch(function(err){
    console.log(err);
    process.exit(1);
  });
});

router.get('/api/product', function(req, res){
  var product_id = req.query.product_id;
  Product.findOne({id:product_id})
  .then(function(data){
    res.json(data);
  }).catch(function(err){
    console.log(err);
    process.exit(1);
  });
});


router.get('/api/cart', function(req, res){
  Cart.find()
  .then(function(data){
    res.json(data);
  }).catch(function(err){
    console.log(err);
    process.exit(1);
  });
});

router.post('/api/cart', function(req, res) {
  var product_id = req.body.product_id;
   Cart.findOne({id:product_id})
   .then(function(cart){
      if(cart!=null){
          cart['quantity']+=1;
          cart.save()
          .then(function(){
              res.json({ message: 'Cart updated!' });
          }).catch(function(err){
              console.log(err);
              process.exit(1);
          });
      }else{
          Product.findOne({id:product_id})
          .then(function(product){
              addedProduct=null;
              addedProduct = {
                id: product.id,
                name: product.name,
                capacity: product.capacity,
                price: product.price,
                image: product.image,
                quantity:1
              }
              var cart = new Cart(addedProduct);
              cart.save()
              .then(function(cart){
                  res.json(cart);
              }).catch(function(){
                  console.log(err);
                  process.exit(1);
              });
          }).catch(function(err){
              console.log(err);
              process.exit(1);
          });
      }
   }).catch(function(err){
      console.log(err);
      process.exit(1);
   });
 });

router.delete('/api/cart', function(req, res) {
  var product_id = req.body.product_id;
  Cart.remove({id:product_id})
  .then(function(data){
    res.send(data);
  }).catch(function(err){
    console.log(err);
    process.exit(1);
  });
});

router.put('/api/cart', function(req, res) {
  var product_id = req.body.product_id;
  var operation = req.body.operation;
   Cart.findOne({id:product_id},function(err, cart) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    if(cart!=null){
      if(operation=="subtract"){
        if(cart.quantity==1)
          Cart.remove({id:product_id},function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            } )
        else
          cart['quantity']=cart.quantity-1;
      }
      else
        cart['quantity']=cart.quantity+1;
        cart.save(function(err) {
        if (err) {
          return res.send(err);
        }
        res.json({ message: 'Cart updated!' });
      });
    }
  });
 });
module.exports= router;