
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./productsModel');
var User = require('./userModel');
var escape = require('html-escape');
var decode = require('decode-html');

var FavouriteSchema = new Schema({
  product: {
    type:Schema.Types.ObjectId,
    ref:"Product"
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
})


var Favourite = mongoose.model("Favourite",FavouriteSchema);

module.exports = Favourite;
