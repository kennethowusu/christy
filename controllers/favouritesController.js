var express = require('express');
var app = express();
var User = require('../models/userModel');
var async = require('async');
//find all favourites of a user

module.exports.findFavourites = function(req,res,next){
  var user_id = req.session.userId;
  var product_id = req.query.product_id;

  async.parallel({
    find_favourites:function(callback){
      User.findById(user_id).populate({path:"favourites",model:"Product",populate:{
        path:"images",model:"Image"
      }}).exec(callback);
    },
    find_favourites_total:function(callback){
     User.findById(user_id).populate('favourites').count().exec(callback);
    },
  },function(err,results){
    if(err){ next(err)}
    return "haha this is ok";
  })
}

module.exports.addFavourite  = function(req,res,next){
  var user_id = req.session.userId;
  var product_id = req.query.product_id;
 //find user and store favourite product in favourites field
  User.update({_id:user_id},{$push:{favourites:product_id}},function(err,update){
    if(err){next(err)}
    return res.status(201).send(update);
  })
}


//delete favourites
module.exports.deleteFavourite = function(req,res,next){
  var user_id = req.session.userId;
  var product_id = req.body.product_id;
  console.log(product_id);
  //find user and delete favourite product in favourites field
  User.update({_id:user_id},{$pull:{favourites:product_id}},function(err,deletedfav){
    if(err){next(err)}
    return res.status(204).send(deletedfav);
  })

}
