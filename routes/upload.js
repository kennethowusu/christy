
var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
var util = require('util');
var async = require('async');
var Product = require('../models/productsModel');
var Description = require('../models/descriptionModel');
var Image = require('../models/imageModel');
var Variant = require('../models/variantModel');
var Variant_Image = require('../models/variantImageModel');
var express = require('express');
var router = express.Router();
// const { check, validationResult } = require('express-validator/check');
//get new product
router.get('/uploads', function(req, res, next) {
  // res.render("newProduct");
  async.parallel({
    count_products:function(callback){
      Product.find().count().exec(callback);
    },
    products:function(callback){
       Product.find().populate('images').populate({
         path:'variants',
         model:"Variant",
         populate:{
           path:'images',
           model:"Variant_Image"
         }
       }).populate('description').exec(callback);
    },
    // images:function(callback){
    //    Image.find().populate('product').exec(callback);
    // },

  },function(err,results){
    if(err){return next(err);}
    console.log(util.inspect(results.products, false, null));
    // console.log(results.images);
    res.render('uploads',{count:results.count_products,products:results.products})
  }


)

});



router.get('/new',function(req,res,next){
  res.render('newProduct');
})
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
        product: product._id,
        about: '',
        how_to_use : '',
        ingredients : ''
      });

      description.save(function(err,description){
        if(err){
          next(err)
        }else{
          product.description = description._id;
          product.save(function(err,updatedProduct){
            if(err){return next(err)};
            res.redirect('/upload/new/description?product_id='+data._id);

          })
        }
      });

    }
  })

});


router.get('/new/description', function(req, res, next) {
  if(!req.query.product_id){
    return res.send('<p>Please go back and click on the right product to continue uploading...</p>');
  }

  Description.findOne({product:req.query.product_id},function(err,product){
    if(err){console.log(err)}else{

    Image.find({product:req.query.product_id},function(err,images){
      if(err){console.log(err)
      }else{
        res.render("description",{product:product,images:images});
      }
    })

    }
  })

});


//=============modify description fields==================//
//about
router.post('/new/description/about',function(req,res,next){
  Description.findOne({product:req.query.product_id},function(err,data){
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
  Description.findOne({product:req.query.product_id},function(err,data){
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
  Description.findOne({product:req.query.product_id},function(err,data){
     if(err){console.log(err)};
    data.set({ingredients:req.body.data});
    data.save(function(err,updatedDescription){
      if(err) return console.log(err);
      res.send('updated');
    })
  })


})



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
      product:req.body.product_id,
     image : req.body.keyname

   });

  image.save(function(err,image){
    if(err){console.log(err)
    }else{
      Product.findById(req.body.product_id).exec(function(err,product){
        product.images.push(image._id);
        product.save(function(err,returnedData){
          if(err){return next(err)}
        })
      })
      res.send('image added');
    }
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






//SWATCH PRODUCT
router.get('/new/swatch',function(req,res,next){
  if(!req.query.product_id){
    return res.send('<p>Please go back and click on the right product to add new Swatch</p>');
  }


  var variant = new Variant({
    color: '',
    product:req.query.product_id
  });

  variant.save(function(err,data){
    if(err){console.log(err)
    }else{
      Product.findById(req.query.product_id).exec(function(err,product){
        product.variants.push(variant._id);
        product.save(function(err,returnedData){
          if(err){return next(err)}
        })
      })
      res.redirect('/upload/new/swatch/description?product_id='+req.query.product_id+'&swatch_id='+variant._id);
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
  variant_id = req.query.swatch_id;
  Variant.findOne({product:req.query.product_id,_id:variant_id},function(err,data){
     if(err){console.log(err)};
    data.set({color:req.query.color});
    data.save(function(err,updatedVariant){
      if(err) return console.log(err);
      res.send('description updated');
    })
  })


});

//upload image to swatch
router.post('/new/swatch/description',function(req,res,next){

  upload(req,res,function(err){
    if(err){
      return console.log(err)
    }



  var swatch_id = req.query.swatch_id;
  var product_id = req.query.product_id;
  var filename = req.query.filename;


  var variant_image = new Variant_Image({
    variant:swatch_id,
    image:filename
  });

  variant_image.save(function(err,image){
    if(err){return console.log(err)}

    Variant.findById(swatch_id,function(err,variant){
      if(err){return console.log(err)}
      variant.images.push(variant_image._id);
      variant.save(function(err,updatedVariant){
        if(err){return console.log(err)}
      })
    })


  })
  res.send(req.file);

    })

})



router.post('/new/swatch/description/image',function(req,res,next){
  var image = new SwatchImage({
    product:req.body.swatch_id,
    image : req.body.keyname

  });

 image.save(function(err,image){
   if(err){console.log(err)
   }else{
     Swatch.findById(req.body.swatch_id).exec(function(err,swatch){
       swatch.images.push(image._id);
       swatch.save(function(err,returnedData){
         if(err){return next(err)}
       })
     })
     res.send('image added');
   }
 })
})


//delete image
router.post('/delete/image',function(req,res,next){
  var key =  req.body.image_key;

  var params = {
    Bucket: 'glammycare',
    Key: key
  }

  s3.deleteObject(params, function(err, data) {
       if(err){
         return console.log(err);
       }
       return res.send(data);
    });
})


//see all variants
router.get('/variants',function(req,res,next){
  if(!req.query.product_id){
  return  res.redirect('/upload/uploads')
  };

  Variant.find({product:req.query.product_id}).populate('images').populate('product','name').exec(function(err,data){
    if(err){return console.log(err)}
    console.log(util.inspect(data,false,null));

    res.render('variants',{variants:data});
  })



})
//
// //delete image
// router.post('/delete/image',function(req,res,next){
//   var key =  req.query.image_key;
//   var product_id = req.query.product_id;
//   var image_id = req.query.image_id;
//   var params = {
//     Bucket: 'glammycare',
//     Key: key
//   }
//
//   s3.deleteObject(params, function(err, data) {
//        if(err){
//          return console.log(err);
//        }
//        Image.deleteOne(_id:image_id,function(err){
//          if(err){ return console.log(err)}
//
//          Product.update({_id:product_id},{$pull:{image:image_id}}
//          ).then(function(err){
//            if(err){return console.log(err)};
//          });
//
//        })
//
//        return res.send(data);
//     });
//
// });

module.exports = router;
