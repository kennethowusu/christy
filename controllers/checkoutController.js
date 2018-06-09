
module.exports.getCheckoutSignIn = function(req,res,next){
  return res.render('checkout-signin');
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


//get checkout confirm page
module.exports.getConfirmPage = function(req,res,next){
  var address = req.cookies.address;
  // return res.render('checkout-confirm',{address:address});
  // res.send(address);
  return res.render('checkout-confirm');
}
