var express = require('express');
var router = express.Router();


/// dùng lowdb //////
var db = require('../db.js');

/////// dùng shortid ////////
var shortid = require('shortid');

router.get('/',function(req,res){
	res.render('users/users.pug',{
		users: db.get('users').value()
	});
});

router.get('/search',function(req,res){
	var q = req.query.q;

	var matchedUsers = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/users.pug',{
		users : matchedUsers
	})
})

router.get('/create',function(req,res){
	res.render('users/create.pug');
})

router.get('/:id',function(req,res){
	var id = req.params.id;
	var user = db.get('users').find({ id : id }).value();
	res.render('users/view.pug',{
		user: user
	})
})

router.post('/create', function(req,res){
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('/users');
})	

router.get('/delete/:id',function(req,res){
	var id = req.params.id;
	var user = db.get('users').find({ id : id }).value();
	db.get('users').remove(user).write();
	res.redirect('/users');
})

router.get('/edit/:id',function(req,res){
	var id = req.params.id;
	var user = db.get('users').find({ id : id }).value();
	res.render('users/edit.pug',{
		user: user
	})
})
router.post('/edit/:id',function(req,res){
	console.log(req.body);
	db.get('users').find({ id : id })
	.assign({ id : req.body })
	.write()
	res.redirect('/users');
	
})

module.exports = router;
