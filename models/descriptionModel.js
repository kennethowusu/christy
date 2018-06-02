
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./productsModel');
var escape = require('html-escape');
var decode = require('decode-html');

var DescriptionSchema = new Schema({
  product:{
   type: Schema.Types.ObjectId,
   ref: 'Product',
   required:true
  },
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


//virtuals
DescriptionSchema.virtual('escaped_about').get(function(){
  var about = escape(this.about);
  return about;

})

var Description = mongoose.model('Description',DescriptionSchema);
module.exports = Description;
