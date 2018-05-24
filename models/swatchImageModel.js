
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Swatch = require('./swatchProductModel');

var SwatchImageSchema = new Schema({

 swatch:{
    type: Schema.Types.ObjectId,
    ref: 'Swatch',
    required:true
  },
  image:{
    type:'String',
    required:true
  }

});



var SwatchImage = mongoose.model('SwatchImage',SwatchImageSchema);
module.exports = SwatchImage;
