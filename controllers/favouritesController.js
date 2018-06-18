var express = require('express');
var app = express();

module.exports.addFavourite  = function(req,res,next){
  var user_id = req.query.user_id;
  var product_id = req.query.product_id;
  console.log(user_id);
  res.status(201).send({message:product_id});

}
