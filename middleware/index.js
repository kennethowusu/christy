function loggedOut(req,res,next){
  if(req.session && req.session.userId){
    return res.redirect('/userspage');
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

function createBasketCookie(req,res,next){
  if(req.cookies.basket === undefined){
    res.cookie('basket',{});
  }
  next();
}
module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
module.exports.cookie = createBasketCookie;
