var express = require('express');
var router = express.Router();
var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');


router.get('/somethingtoupload', function(req, res, next) {
  res.render("upload");

});

 //
 // var params = {
 //   Bucket:'glammycare',
 //   Key:req.body.file
 // }

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
})

router.post('/somethingtoupload',upload.single('image'),function(req,res,next){
  res.send(req.file);


});



module.exports = router;
