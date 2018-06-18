var _ = require('lodash');
function loggedOut(req,res,next){
  if(req.session && req.session.userId){
    return res.redirect('/');
  }
  next();
}


function requiresLogin(req,res,next){
  if(req.session && req.session.userId){
    return next();
  }else{
    //vhange this
    console.log('You must loggin');
  }
}

function checkEmptyBasket(req,res,next){
  var basket = req.cookies.basket;
  if(_.isEmpty(basket)){
    return res.redirect('/basket');
  }
}
function createBasketCookie(req,res,next){
  if(req.cookies.basket === undefined){
    res.cookie('basket',{});
  }
  next();
}
module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
module.exports.cookie = createBasketCookie;
module.exports.checkEmptyBasket = checkEmptyBasket;
