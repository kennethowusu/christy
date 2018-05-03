


//require models
var User = require('../models/userModel');

module.exports.getLoginForm = function(req,res,next){
  res.render('signin');
}


module.exports.getSignupForm = function(req,res,next){
  res.render('signup');
}

 module.exports.postLogin  = function(req,res,next){
   User.authenticate(req.body.email,req.body.password,function(err,user){
     if(err || !user){
       return next(err);
     }else{
       req.session.userId = user._id;
       return res.redirect('/profile');
     }
   })
 }

module.exports.postForm = function(req,res,next){
  var userData = new User({
    firstname :req.body.firstname,
    lastname :req.body.lastname,
    email: req.body.email,
    password : req.body.password
  });
  userData.save(function(error,user){
    if(error){
     console.log(error)
   }else{
     res.redirect('/profile');
   }
  })
}

//logout user
module.exports.logout = function(req,res,next){
  if(req.session){
    //delete session object
    req.session.destroy(function(err){
      if(err){
        return next(err);
      }else{
        return res.redirect('/');
      }
    });
  }
}
