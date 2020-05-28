var express = require('express');
var router = express.Router();

/// dùng controller ///
var controller = require('../controllers/user.controller.js');
var validateUsers = require('../validate/validate.users.js');
/// dùng lowdb //////
var db = require('../db.js');

/////// dùng shortid ////////
var shortid = require('shortid');

//// dùng muler để upload file trong form //
var multer  = require('multer')
var upload = multer({ dest: './public/uploads/' })


router.get('/', controller.index );

router.get('/cookies', function(req,res,next) {
	res.cookie('userid',1234)
	res.send('Hello Bảo Tiến');
})

router.get('/search', controller.search ); 

router.get('/create', controller.create );

router.get('/:id', controller.view );

router.post('/create', upload.single('avatar'),  validateUsers.postValidateUser, controller.postCreate );	

router.get('/delete/:id', controller.delete );

router.get('/edit/:id', controller.edit);
router.post('/edit/:id', controller.postEdit);

module.exports = router;
