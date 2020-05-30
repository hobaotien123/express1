var express = require('express');
var router = express.Router();
var cart = require('../controllers/cart.controller.js');


router.get('/add/:productId', cart.addToCart);

module.exports = router;
