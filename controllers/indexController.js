
var Image = require('../models/imageModel');
var Variant = require('../models/variantModel');
var User = require('../models/userModel');
var Product = require('../models/productsModel');
var Variant_Image = require('../models/variantImageModel');
var Description_Image = require('../models/descriptionModel');
var util = require('util');
var async = require('async');
var _ = require('lodash');

module.exports.getIndexPage = function(req,res,next){
  var savedBasket = req.cookies.basket;
  var prices = [];
  var no_items = [];
  var total = 0;
  var total_num_of_items = 0;
  for(var product_id in savedBasket){
    prices.push(parseInt(savedBasket[product_id].price) * parseInt(savedBasket[product_id].quantit));
    no_items.push(parseInt(savedBasket[product_id].quantity));
  }
  prices.forEach(function(price){
    total += price;

  });
  no_items.forEach(function(quantity){
   total_num_of_items += quantity;

  });
  var total_quantity = _.size(savedBasket);
  var result = {
    total : total,
    total_num_of_items : total_num_of_items,
    total_quantity : total_quantity
  }
  async.parallel({
   find_makeup:function(callback){
     Product.find({main_category:"makeup"}).populate('images').limit(4).exec(callback);
   },
   find_men:function(callback){
     Product.find({main_category:"men"}).populate('images').limit(4).exec(callback);
   },
  },function(err,results){
    if(err){console.log(err)};


     console.log(result);

    res.render('index', { title: 'Express',makeups:results.find_makeup,mens:results.find_men,basket:result });

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


module.exports.getMakeup = function(req,res,next){
  var currentPage = parseInt(req.query.page) || 1;
  var perPage = 2;
  var skip = (perPage * currentPage) - perPage;
  Product.find({main_category:"makeup"}).populate('images').
  skip(skip)
  .limit(perPage)
  .exec(function(err,makeups){
    Product.count({main_category:"makeup"}).exec(function(err,total_count){
      if(err){next(err)};
      var count = currentPage * perPage;
      var pages = Math.ceil(total_count/perPage);
      var nextPage = currentPage + 1;
      var previousPage = currentPage - 1;
      var pageName = "makeup";
        res.render('makeup', { title: 'Express',makeups:makeups,total_makeup:total_count,
        count:count,pages:pages,currentPage:currentPage,
        nextPage:nextPage,previousPage:previousPage,pageName:pageName

      });
    })
  });
}


module.exports.getBathAndBody = function(req,res,next){


  var currentPage = parseInt(req.query.page) || 1;
  var perPage = 2;
  var skip = (perPage * currentPage) - perPage;
  Product.find({main_category:"men"}).populate('images').
  skip(skip)
  .limit(perPage)
  .exec(function(err,makeups){
    Product.count({main_category:"men"}).exec(function(err,total_count){
      if(err){next(err)};
      var count = currentPage * perPage;
      var pages = Math.ceil(total_count/perPage);
      var nextPage = currentPage + 1;
      var previousPage = currentPage - 1;
      var pageName = "makeup";
        res.render('makeup', { title: 'Express',makeups:makeups,total_makeup:total_count,
        count:count,pages:pages,currentPage:currentPage,
        nextPage:nextPage,previousPage:previousPage,pageName:pageName

      });
    })
  });

}
