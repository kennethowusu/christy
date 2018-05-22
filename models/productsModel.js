
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({

  name:{
    type:String
  },
  price:{
    type:Number
  },
  main_category:{
    type:String
  },
  category:{
    type:String
  },
  subcategory:{
    type:String
  },
  created:{
    type:Date,
    default:Date.now,
    required:true
  },
  color:{
    type:String
  }

});



var Product = mongoose.model('Product',ProductSchema);
module.exports = Product;
