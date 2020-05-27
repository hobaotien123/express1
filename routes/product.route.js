var express = require('express');
var router = express.Router();
var product = require('../controllers/product.controller.js');


router.get('/', product.index);

module.exports = router;
