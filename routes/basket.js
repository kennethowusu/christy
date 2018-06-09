var express = require('express');
var router = express.Router();
var setCookie = require('set-cookie');
var basketController = require('../controllers/basketController');



//get basket page
router.get('/',basketController.getBasket);


//add to basket
router.post('/add/to/basket',basketController.addToBaset);


router.get('/get/basket/history',basketController.getBasketHistory);


router.get('/set',function(req,res,next){
  setCookie('test cookie','myvalue',{path:"",res:res});
  res.send('cookie sent');
})











module.exports = router;
