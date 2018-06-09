var bcrypt = require('bcryptjs');


//require models
var User = require('../models/userModel');

module.exports.getLoginForm = function(req,res,next){
  res.render('signin');
}


module.exports.getSignupForm = function(req,res,next){
  return res.render('signup');
}

module.exports.postLogin  = function(req,res,next){
  var returnUrl = req.query.returnUrl;
 //authenticate input against database documents

   User.findOne({email:req.body.email})
   .exec(function(err,user){
     if(err){ next(err)
    }else if(!user){
        return res.render('signin',{user:{'email':req.body.email,'password':req.body.password},email_Error:"Email does not exist."});
    }
    bcrypt.compare(req.body.password,user.password,function(error,result){
      if(result === false){
          return res.render('signin',{user:{'email':req.body.email,'password':req.body.password},email_Error:"Password is incorrect"});
      }else{
        req.session.userId = user._id;
        if(!returnUrl){
          return res.redirect('/');
        }else{
        return res.redirect(returnUrl);
      }
    }//else
    })
   })


}

module.exports.postForm = function(req,res,next){
  var returnUrl = req.query.returnUrl;
  var userData = new User({
    firstname :req.body.firstname,
    lastname :req.body.lastname,
    email: req.body.email,
    password : req.body.password
  });

  User.findOne({email:req.body.email},function(err,user){
    if(err){next(err)}
      else if(user){
      return res.render('signup',{email_Error:"Email already exist!",user:userData});
    }else{
      userData.save(function(error,user){
        if(error){
         console.log(error)
       }else{
         req.session.userId = user._id;
         if(!returnUrl){
           return res.redirect('/');
         }else{
         return res.redirect(returnUrl);
       }
       }
      })
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
