var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var Favourite = require('./favouritesModel');
var Product = require('./productsModel');

var UserSchema = new Schema({

  firstname:{
    type:String,
    trim: true,
  },
  lastname:{
    type:String,
    required:true,
    trim: true,
  },
  email:  {
    type:String,
    required:true,
    trim: true,
    unique:true
  },
  password: {
    type:String,
    required:true
  },
  favourites:[{
    type:Schema.Types.ObjectId,
    ref:"Product"
  }],
})


UserSchema.pre('save',function(next){
  var user = this;
  bcrypt.hash(user.password,10,function(err,hash){
    if(err){console.log(err)}
  user.password = hash;
  next();
    })
});
var User = mongoose.model("User",UserSchema);
module.exports = User;
