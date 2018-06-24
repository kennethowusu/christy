var express = require('express');
var router = express.Router();
var favouritesController = require('../controllers/favouritesController');


//create favourites
router.post('/',favouritesController.addFavourite);


//delete favourites
router.delete('/',favouritesController.deleteFavourite);









module.exports = router;
