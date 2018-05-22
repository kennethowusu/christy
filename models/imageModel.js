
var moongoose = require('mongoose');
var Schema = mongoose.Schema();


var ImageSchema = new Schema(){

product_id: [{ type: Schema.Types.ObjectId, ref: 'Person' }],

  about:{
    type:String
  },
  ingredients:{
    type:String
  },
  how_to_use:{
    type:String
  }


}



var Image = mongoose.model('Image',ImageSchema);
module.exports = Image;
