var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({

  firstname:{
    type:String,
    required:true,
    trim: true,
    unique:true
  },
  lastname:{
    type:String,
    required:true,
    trim: true,
    unique:true
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
})

//authenticate input against database documents
UserSchema.statics.authenticate = function(email,password,callback){
  User.findOne({email:email})
  .exec(function(err,user){
    if(err){ return callback(err);
   }else if(!user){
     console.log("User not found!");
     return callback(err);
   }
   bcrypt.compare(password,user.password,function(error,result){
     if(result === true){
       return callback(null,user)
     }
   })
  })
}
UserSchema.pre('save',function(next){
  var user = this;
  bcrypt.hash(user.password,10,function(err,hash){
    if(err){console.log(err)
      return;
    }
  user.password = hash;
  next();
    })
});
var User = mongoose.model("User",UserSchema);
module.exports = User;
