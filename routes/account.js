var express = require('express');
var router = express.Router();

//middleware
var mid = require('../middleware/index');
//require controllers
var accountController = require('../controllers/accountController');

/* Gget sign in form */
router.get('/signin',mid.loggedOut, accountController.getLoginForm);

/* get signin form. */
router.get('/signup',mid.loggedOut, accountController.getSignupForm);



/* Post signup*/

router.post('/signup',accountController.postForm);

/* Post login*/
router.post('/signin',accountController.postLogin);


/* Get logout */
router.get('/logout',accountController.logout);
module.exports = router;
