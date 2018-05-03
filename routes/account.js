var express = require('express');
var router = express.Router();


//require controllers
var accountController = require('../controllers/accountController');

/* GET home page. */
router.get('/signin', accountController.getLoginForm);

/* GET home page. */
router.get('/signup', accountController.getSignupForm);


module.exports = router;
