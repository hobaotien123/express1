var express = require('express');
var router = express.Router();

/// dùng controller ///
var controller = require('../controllers/user.controller.js');
var validateUsers = require('../validate/validate.users.js');
/// dùng lowdb //////
var db = require('../db.js');

/////// dùng shortid ////////
var shortid = require('shortid');

router.get('/', controller.index );

router.get('/search', controller.search ); 

router.get('/create', controller.create );

router.get('/:id', controller.view );

router.post('/create', validateUsers.postValidateUser, controller.postCreate );	

router.get('/delete/:id', controller.delete );

router.get('/edit/:id', controller.edit);
router.post('/edit/:id', controller.postEdit);

module.exports = router;
