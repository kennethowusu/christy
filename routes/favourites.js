var express = require('express');
var router = express.Router();
var favouritesController = require('../controllers/favouritesController');


//add favourites
router.post('/',favouritesController.addFavourite);












module.exports = router;
