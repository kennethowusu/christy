
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./productsModel');
var SwatchImage = require('./swatchImageModel');

var SwatchProductSchema = new Schema({

product:{
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
},
images:{
  type:[Schema.Types.ObjectId],
  ref:"SwatchImage"
}


});



var SwatchProduct = mongoose.model('SwatchProduct',SwatchProductSchema);
module.exports = SwatchProduct;
