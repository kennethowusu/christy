var express = require('express');
var router = express.Router();
var checkoutController = require('../controllers/checkoutController');






//get checkout signin page
router.get('/sign-in',checkoutController.getCheckoutSignIn);

router.get('/shipping-address',function(req,res,next){
  return res.render('shipping-address');
})

//store address
router.post('/shipping-address',checkoutController.storeAddress);

router.get('/confirm-order',checkoutController.getConfirmPage);

module.exports = router;
