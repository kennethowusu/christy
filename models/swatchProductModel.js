
var moongoose = require('mongoose');
var Schema = mongoose.Schema();


var SwatchProductSchema = new Schema(){

product_id: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
color:{
  type:String
}

}



var SwatchProduct = mongoose.model('SwatchProduct',SwatchProductSchema);
module.exports = SwatchProduct;
