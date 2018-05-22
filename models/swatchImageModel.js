
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Swatch = require('./swatchProductModel');

var SwatchImageSchema = new Schema({

 swatch_id:{
    type: Schema.Types.ObjectId,
    ref: 'Swatch',
    required:true
  },
  images:{
    type:'String',
    required:true
  }

});



var SwatchImage = mongoose.model('SwatchImage',SwatchImageSchema);
module.exports = SwatchImage;
