
var moongoose = require('mongoose');
var Schema = mongoose.Schema();


var SwatchImageSchema = new Schema(){

product_id: [{ type: Schema.Types.ObjectId, ref: 'SwatchProduct' }],


}



var SwatchImage = mongoose.model('SwatchImage',SwatchImageSchema);
module.exports = swatImage;
