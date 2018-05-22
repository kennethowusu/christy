var express = require('express');
var router = express.Router();
var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
var Product = require('../models/productsModel');
var Description = require('../models/descriptionModel');
//get new product
router.get('/new', function(req, res, next) {
  res.render("newProduct");

});


//create new prodcut
router.post('/new',function(req,res,next){
  var product = new Product({
    name:req.body.name,
    price:req.body.price,
    main_category:req.body.main_category,
    cateogory:req.body.category,
    subcategory:req.body.subcategory,
    color:req.body.color
  })

  product.save(function(err,data){
    if(err){
      next(err)
    }else{
      var description  =  new Description({
        product_id : product._id,
        about: '',
        how_to_use : '',
        ingredients : ''
      });

      description.save(function(err,description){
        if(err){
          next(err)
        }else{
          res.render('description',{product:data});
        }
      });

    }
  })

});


//=============modify description fields==================//
//about
router.post('/new/description/about',function(req,res,next){
  Description.findOne({product_id:req.query.product_id},function(err,data){
     if(err){console.log(err)};
    data.set({about:req.body.data});
    data.save(function(err,updatedDescription){
      if(err) return handleError(err);
      res.send('description updated');
    })
  })


})

//how_to_use
router.post('/new/description/how_to_use',function(req,res,next){
  Description.findOne({product_id:req.query.product_id},function(err,data){
     if(err){console.log(err)};
    data.set({how_to_use:req.body.data});
    data.save(function(err,updatedDescription){
      if(err) return handleError(err);
      res.send('updated');
    })
  })


})

//ingredients
router.post('/new/description/ingredients',function(req,res,next){
  Description.findOne({product_id:req.query.product_id},function(err,data){
     if(err){console.log(err)};
    data.set({ingredients:req.body.data});
    data.save(function(err,updatedDescription){
      if(err) return handleError(err);
      res.send('updated');
    })
  })


})

var s3 = new aws.S3({
  apiVersion:'2006-03-01',
  endpoint:'https://s3.eu-west-2.amazonaws.com/',
  accessKeyId:process.env.s3_access_key_id,
  secretAccessKey:process.env.s3_secret_access_key,
  region:'eu-west-2'
});


var upload = multer({
 storage: multerS3({
   s3: s3,
   bucket: 'glammycare',
   metadata: function (req, file, cb) {
     cb(null, {fieldName: file.originalname});
   },
   key: function (req, file, cb) {
     cb(null, req.query.filename);
   }
 })
}).single('image');

router.get('/new/description', function(req, res, next) {
  res.render("description");

});
router.post('/new/description',function(req,res,next){
   upload(req,res,function(err){
     if(err){
       res.send(err);
     }else{
       res.send(req.file);
     }


   })



});



module.exports = router;
