var express = require('express');
var router = express.Router();
var checkoutController = require('../controllers/checkoutController');






//get checkout signin page
router.get('/sign-in',checkoutController.getCheckoutSignIn);

//login if not signed inspect
router.post('/sign-in',checkoutController.checkoutSignIn);

router.get('/shipping-address',function(req,res,next){
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
  return res.render('shipping-address',{date:date,baskets:baskets});
})

//store address
router.post('/shipping-address',checkoutController.storeAddress);



router.get('/confirm-order',checkoutController.getConfirmPage);

module.exports = router;
