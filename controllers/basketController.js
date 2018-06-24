
var _ = require('lodash');
var favouritesController = require('./favouritesController');
var async = require('async');
var User = require('../models/userModel');
var util = require('util');
var Product = require('../models/productsModel');
module.exports.addToBaset = function(req,res,next){
  var product_id = req.body.product_id;
  var color = req.body.color;
  var price = req.body.price;
  var quantity = parseInt(req.body.quantity);
  var image = req.body.image;
  var name = req.body.name;
  var savedBasket = req.cookies.basket;


  if(product_id in savedBasket){

    savedBasket[product_id].quantity += parseInt(quantity);
    res.cookie('basket',savedBasket);


  }else{
     savedBasket[product_id] = {
       "name":name,
       "quantity": quantity,
       "color": color,
       "price":price,
       "image": image
     };
     res.cookie('basket',savedBasket);

  }
 res.send('yes');
}


module.exports.getBasketHistory = function(req,res,next){
  var savedBasket = req.cookies.basket;
  var prices = [];
  var no_items = [];
  var total = 0;
  var total_num_of_items = 0;
  for(var product_id in savedBasket){
    prices.push(parseInt(savedBasket[product_id].price) * parseInt(savedBasket[product_id].quantit));
    no_items.push(parseInt(savedBasket[product_id].quantity));
  }
  prices.forEach(function(price){
    total += price;

  });
  no_items.forEach(function(quantity){
   total_num_of_items += quantity;

  });
  var total_quantity = _.size(savedBasket);
  var result = {
    total : total,
    total_num_of_items : total_num_of_items,
    total_quantity : total_quantity
  }
  res.send(result);
}

module.exports.getBasket = function(req,res,next){
  var savedBasket = req.cookies.basket;
  var prices = [];
  var no_items = [];
  var total = 0;
  var total_num_of_items = 0;
  for(var product_id in savedBasket){
    prices.push(parseInt(savedBasket[product_id].price) * parseInt(savedBasket[product_id].quantity));
    no_items.push(parseInt(savedBasket[product_id].quantity));
  }
  prices.forEach(function(price){
    total += price;

  });
  no_items.forEach(function(quantity){
   total_num_of_items += quantity;

  });
  var total_quantity = _.size(savedBasket);
  var result = {
    total : total,
    total_num_of_items : total_num_of_items,
    total_quantity : total_quantity
  }


    var user_id = req.session.userId;
    var product_id = req.query.product_id;

    async.parallel({
      find_favourites:function(callback){
        User.findById(user_id).populate({path:"favourites",model:"Product",populate:{
          path:"images",model:"Image"
        }}).select('favourites').exec(callback);
      },
      find_favourites_total:function(callback){
       User.findById(user_id).populate('favourites').count().exec(callback);
      },
    },function(err,results){
      if(err){ next(err)}
        // res.send(results.find_favourites);
        res.render('basket',{items:savedBasket,basket:result,favs:results.find_favourites,total_favs:results.find_favourites_total});
    })
}
