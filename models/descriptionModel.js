
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./productsModel');

var DescriptionSchema = new Schema({
product_id:{
   type: Schema.Types.ObjectId,
   ref: 'Product' },
  about:{
    type:String
  },
  ingredients:{
    type:String
  },
  how_to_use:{
    type:String
  }


});



var Description = mongoose.model('Description',DescriptionSchema);
module.exports = Description;
