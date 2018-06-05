var express = require('express');
var router = express.Router();
var checkoutController = require('../controllers/checkoutController');






//get checkout signin page
router.get('/kkk/sign-in',checkoutController.getCheckoutSignIn);

module.exports = router;
