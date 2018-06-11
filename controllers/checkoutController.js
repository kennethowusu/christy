var bcrypt = require('bcryptjs');


//require models
var User = require('../models/userModel');

module.exports.getCheckoutSignIn = function(req,res,next){
  if(req.session && req.session.userId){
    return res.redirect('/checkout/shipping-address');
  }else{
  return res.render('checkout-signin');
  }
}


module.exports.storeAddress = function(req,res,next){
  var firstname = req.body.firstname,
      lastname = req.body.lastname,
      number = req.body.number,
      alt_num = req.body.alt_number,
      email = req.body.email,
      region = req.body.region,
      city = req.body.city,
      address = req.body.address;

  var user_address = {
    firstname : firstname,
    lastname : lastname,
    number : number,
    alt_num : alt_num,
    email : email,
    region : region,
    city : city,
    address : address
  };

  res.cookie('address',user_address);
  return res.redirect('/checkout/confirm-order');
}


module.exports.checkoutSignIn = function(req,res,next){

 //authenticate input against database documents


   User.findOne({email:req.body.email})
   .exec(function(err,user){
     if(err){ next(err)
    }else if(!user){
        return res.render('checkout-signin',{user:{'email':req.body.email,'password':req.body.password},email_Error:"Email does not exist."});
    }
    bcrypt.compare(req.body.password,user.password,function(error,result){
      if(result === false){
          return res.render('checkout-signin',{user:{'email':req.body.email,'password':req.body.password},email_Error:"Password is incorrect"});
      }else{
        req.session.userId = user._id;
        return res.redirect('/checkout/shipping-address');

    }//else
    })
   })

}
//get checkout confirm page
module.exports.getConfirmPage = function(req,res,next){
  var address = req.cookies.address;
  if(!address){
    return res.redirect('/checkout/shipping-address');
  }
  // return res.render('checkout-confirm',{address:address});
  // res.send(address);
  console.log(address);
  return res.render('checkout-confirm',{address:address});
}
