var express = require('express');
var router = express.Router();
var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
var Product = require('../models/productsModel');
var Description = require('../models/descriptionModel');
var Image = require('../models/imageModel');
var Swatch = require('../models/swatchProductModel');
var SwatchImage = require('../models/swatchImageModel');
// const { check, validationResult } = require('express-validator/check');
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
  req.checkBody('name','Name field must not be empty').isLength({ min: 1 });
  req.checkBody('price','Price field must not be empty').isLength({ min: 1 });
  req.checkBody('main_category','Please select product main category').isLength({ min: 1 });
  req.checkBody('category','Please select product category').isLength({ min: 1 });
  req.checkBody('subcategory','Please select product category').isLength({ min: 1 });

   var errors = req.validationErrors(true);
   if(errors){
    console.log(errors);
     return res.render('newProduct',{errors:errors,product:product});
   }




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
          res.redirect('/upload/new/description?product_id='+data._id);
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
      if(err) return console.log(err);
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
      if(err) return console.log(err);
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
      if(err) return console.log(err);
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
  if(!req.query.product_id){
    return res.send('<p>Please go back and click on the right product to continue uploading...</p>');
  }

  Description.findOne({product_id:req.query.product_id},function(err,product){
    if(err){console.log(err)}else{

    Image.find({product_id:req.query.product_id},function(err,images){
      if(err){console.log(err)
      }else{
        res.render("description",{product:product,images:images});
      }
    })

    }
  })




});

//UPLOAD IMAGES
router.post('/new/description',function(req,res,next){
   upload(req,res,function(err){
     if(err){
       res.send(err);
     }else{
       console.log(req.file);
       res.send(req.file);
     }
   })

});

//added uploaded image to product
router.post('/new/description/image',function(req,res,next){
   var image = new Image({
     product_id :req.body.product_id,
     image : req.body.keyname

   });

  image.save(function(err,data){
    if(err){console.log(err)
    }else{
      res.send('image added');
    }
  })
})



//SWATCH PRODUCT
router.get('/new/swatch',function(req,res,next){
  if(!req.query.product_id){
    return res.send('<p>Please go back and click on the right product to add new Swatch</p>');
  }


  var swatch = new Swatch({
    color: '',
    product_id:req.query.product_id
  });

  swatch.save(function(err,data){
    if(err){console.log(err)
    }else{
      res.redirect('/upload/new/swatch/description?product_id='+req.query.product_id+'&swatch_id='+swatch._id);
    }
  })

})

router.get('/new/swatch/description',function(req,res,next){
  if(!req.query.product_id){
    return res.send('<p>Please go back and click on the right product to add new Swatch</p>');
  }

  if(!req.query.product_id || !req.query.swatch_id){
    return res.send('<p>Please go back and click on the right product to add new Swatch</p>');
  }
  product_id = req.query.product_id;
  swatch_id = req.query.swatch_id;
  res.render('swatch',{product_id:product_id,swatch_id:swatch_id});
});


router.post('/new/swatch/description/swatch_color',function(req,res,next){
  product_id = req.query.product_id;
  swatch_id = req.query.swatch_id;
  Swatch.findOne({product_id:req.query.product_id,_id:swatch_id},function(err,data){
     if(err){console.log(err)};
    data.set({color:req.query.color});
    data.save(function(err,updatedSwatch){
      if(err) return console.log(err);
      res.send('description updated');
    })
  })


});

router.post('/new/swatch/descripiton',function(req,res,next){

})
module.exports = router;
