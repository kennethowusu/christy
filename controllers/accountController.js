

module.exports.getLoginForm = function(req,res,next){
  res.render('signin');
}


module.exports.getSignupForm = function(req,res,next){
  res.render('signup');
}
