
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Variant = require('./variantModel');

var Variant_Image = new Schema({

 variant:{
    type: Schema.Types.ObjectId,
    ref: 'Variant',
    required:true
  },
  image:{
    type:'String',
    required:true
  }

});



var Variant_Image = mongoose.model('Variant_Image',Variant_Image);
module.exports = Variant_Image;
