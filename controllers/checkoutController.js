var bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');

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
  var baskets = req.cookies.basket;
   Date.prototype.dayNames = [
      "Sunday","Monday","Tuesday","Wednesday",
   "Thursday","Friday","Saturday",

 ];
 Date.prototype.monthNames = [
     "January", "February", "March",
     "April", "May", "June",
     "July", "August", "September",
     "October", "November", "December"
 ];

 Date.prototype.getMonthName = function() {
     return this.monthNames[this.getMonth()];
 };

 Date.prototype.getDayName = function(){
   return this.dayNames[this.getDay()];
 }
 Date.prototype.getShortMonthName = function () {
     return this.getMonthName().substr(0, 3);
 };

 Date.prototype.getShortDayName = function () {
     return this.getDayName().substr(0, 3);
 };

 // usage:
 var d = new Date();
 var date = `${d.getShortDayName()} ${d.getShortMonthName()} ${d.getDate()}`;
  // return res.render('checkout-confirm',{address:address});
  // res.send(address);

  return res.render('checkout-confirm',{address:address,date:date,baskets:baskets});
}


module.exports.confirmOrder = function(req,res,next){
  var basket = req.cookies.basket;
  var address = req.cookies.address;
  if(!address){
    return res.redirect('/checkout/shipping-address');
  }
  var baskets = req.cookies.basket;
   Date.prototype.dayNames = [
      "Sunday","Monday","Tuesday","Wednesday",
   "Thursday","Friday","Saturday",

 ];
 Date.prototype.monthNames = [
     "January", "February", "March",
     "April", "May", "June",
     "July", "August", "September",
     "October", "November", "December"
 ];

 Date.prototype.getMonthName = function() {
     return this.monthNames[this.getMonth()];
 };

 Date.prototype.getDayName = function(){
   return this.dayNames[this.getDay()];
 }
 Date.prototype.getShortMonthName = function () {
     return this.getMonthName().substr(0, 3);
 };

 Date.prototype.getShortDayName = function () {
     return this.getDayName().substr(0, 3);
 };

 // usage:
 var d = new Date();
 var date = `${d.getShortDayName()} ${d.getShortMonthName()} ${d.getDate()}`;
  // return res.render('checkout-confirm',{address:address});
  // res.send(address);
  if(!req.body.confirm_order){
    return res.render('checkout-confirm',{confirm_error:"Please agree by checking the box",address:address,baskets:baskets})
  }




// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
   var message =
            ` <h1 style="font-family:arial,sans-serif">hello this is so cool</h1>
            <table style="font-family:'open sans',verdana,arial,sans-serif">`;

            for(var product_id in basket){
             message +=
              `<tr>
                <td>
                  <img style="width:80px;display:block;" src="https://s3.eu-west-2.amazonaws.com/glammycare/${basket[product_id].image}"alt="">
                  <span>Quantity:</span><b>4</b>
                  <p><span>Price:</span><b>&#8373;${basket[product_id].price}</b></p>
                  <p><span>Total:</span><b>&#8373;180.00</b></p>
                </td>
                <td >
                  <b>Name:</b><span style="display:block">${basket[product_id].name}</span>
                  <b>Color:</b><span>${basket[product_id].color}</span>
                </td>
              </tr>`
            }
            message+= `</table> <table>`;


              message +=  `<tr>
                  <td style="font-weight:bold">Name:</td>
                  <td>${address.firstname} ${address.lastname}</td>
                </tr>
                <tr>
                  <td style="font-weight:bold">Region:</td>
                  <td>${address.region}</td>
                </tr>
                <tr>
                  <td style="font-weight:bold">City:</td>
                  <td>${address.city}</td>
                </tr>
                <tr>
                  <td style="font-weight:bold">Email:</td>
                  <td>${address.email}</td>
                </tr>
                <tr>
                  <td style="font-weight:bold">Contact:</td>
                  <td>${address.number}</td>
                </tr>`


            message+= `</table>`;
            // <table style="margin-top:30px">
            //   <tr>
            //     <td style="font-weight:bold">Shipping:</td>
            //     <td>0.00</td>
            //   </tr>
            //   <tr>
            //     <td style="font-weight:bold">
            //       Total Estimat
            //     </td>
            //     <td>&#8373; 180.00</td>
            //   </tr>
            // </table>
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'mail.privateemail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "admin@glammycare.com", // generated ethereal user
            pass: "[SDzU(Npz%a7P" // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <admin@glammycare.com>', // sender address
        to: 'keninchrist4eva@gmail.com, baz@example.com', // list of receivers
        subject: 'New Order Placed!', // Subject line
        // text: 'Hello world?', // plain text body
        html: message // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
}
