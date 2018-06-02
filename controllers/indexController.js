
var Image = require('../models/imageModel');
var Variant = require('../models/variantModel');
var User = require('../models/userModel');
var Product = require('../models/productsModel');
var Variant_Image = require('../models/variantImageModel');
var Description_Image = require('../models/descriptionModel');
var util = require('util');
var async = require('async');


module.exports.getIndexPage = function(req,res,next){
  async.parallel({
   find_makeup:function(callback){
     Product.find({main_category:"makeup"}).populate('images').limit(4).exec(callback);
   },
   find_men:function(callback){
     Product.find({main_category:"men"}).populate('images').limit(4).exec(callback);
   },
  },function(err,results){
    if(err){console.log(err)};

    console.log(util.inspect(results.find_men.images,false,null));
    res.render('index', { title: 'Express',makeups:results.find_makeup,mens:results.find_men });

  })


}

//get product page
module.exports.getProductPage = function(req,res,next){
  var product_id = req.params.id;
  Product.findById(product_id).populate('description')
  .populate('images')
  .populate({
         path:'variants',
         model:"Variant",
         populate:{
           path:'images',
           model:"Variant_Image"
         }
       })
   .exec(function(err,data){
    if(err){return next(err)}
      // res.send(data);
     res.render('product',{product:data});

  })

}


//get variant
module.exports.getVariant = function(req,res,next){
  var variant_id = req.query.variant_id;
  Variant.findById(variant_id).populate('images').exec(function(err,results){
     if(err){console.log(err)}
     console.log(results);
     return res.send(results);
  })
}
