var express = require('express');
var router = express.Router();
var middlewares = require('../controllers/authentic.controller.js');


router.get('/', middlewares.login);
router.post('/', middlewares.postLogin);

module.exports = router;
