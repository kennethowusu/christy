var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*GET makeup*/

router.get('/makeup',function(req,res,next){
  res.render('makeup',{title:"Makeup Stuffs"});
})

/*GET Bath & Body*/

router.get('/bath-and-body',function(req,res,next){
  res.render('bath-and-body',{title:"Makeup Stuffs"});
})

/*GET makeup*/

router.get('/men',function(req,res,next){
  res.render('men',{title:"Makeup Stuffs"});
})



module.exports = router;
