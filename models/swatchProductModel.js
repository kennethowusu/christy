
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./productsModel');


var SwatchProductSchema = new Schema({

product_id:{
   type: Schema.Types.ObjectId,
   ref: 'Product',
   required:true
  },

   color:{
   type:String,
  },

  swatch_status:{
  type:String,
  enum:['on','off'],
  required:true,
  default:'off'
  }


});



var SwatchProduct = mongoose.model('SwatchProduct',SwatchProductSchema);
module.exports = SwatchProduct;
