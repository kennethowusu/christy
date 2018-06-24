var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController');
var async = require('async');
/* GET home page. */
router.get('/',indexController.getIndexPage);


/*GET makeup*/

router.get('/makeup',indexController.getMakeup);

/*GET Bath & Body*/

router.get('/bath-and-body',function(req,res,next){
  res.render('bath-and-body',{title:"Makeup Stuffs"});
})


/*GET makeup*/

router.get('/modaltest',function(req,res,next){
  res.render('modal',{title:"Makeup Stuffs"});
})
/*GET makeup*/

router.get('/men',function(req,res,next){
  res.render('men',{title:"Makeup Stuffs"});
})



//get a product
router.get('/:product/:id',indexController.getProductPage);


//get a variant
router.post('/variant',indexController.getVariant);

router.get('/cookies',function(req,res,next){
  console.log(req.cookies);
})

router.get('/destroy',function(req,res,next){
  res.clearCookie('basket');
  next();
  res.send('everything is ok');
})
module.exports = router;
