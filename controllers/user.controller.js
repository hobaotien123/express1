var db = require('../db.js');
var shortid = require('shortid');


module.exports.index = function(req,res){
	res.render('users/users.pug',{
		users: db.get('users').value()
	});
}

module.exports.search = function(req,res){
	var q = req.query.q;

	var matchedUsers = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/users.pug',{
		users : matchedUsers
	})
}
module.exports.create = function(req,res){
	res.render('users/create.pug');
}

module.exports.postCreate = function(req,res){
	req.body.id = shortid.generate();
	var errors = [];
	if(!req.body.name){
		errors.push('Name is not define');
	}
	if(req.body.name.length > 30){
		errors.push('Name is not 30 ');
	}
	if(errors.length){
		res.render('users/create.pug',{
			errors : errors
		});
		return;
	}

	db.get('users').push(req.body).write();
	res.redirect('/users');
}

module.exports.view = function(req,res){
	var id = req.params.id;
	var user = db.get('users').find({ id : id }).value();
	res.render('users/view.pug',{
		user: user
	})
}
module.exports.delete = function(req,res){
	var id = req.params.id;
	var user = db.get('users').find({ id : id }).value();
	db.get('users').remove(user).write();
	res.redirect('/users');
};
module.exports.edit = function(req,res){
	var id = req.params.id;
	var user = db.get('users').find({ id : id }).value();
	res.render('users/edit.pug',{
		user: user
	})
}
module.exports.postEdit = function(req,res){
	console.log(req.body);
	var id = req.params.id;
	db.get('users').find({ id : id })
	.assign({ name : req.body.name })
	.write()
	res.redirect('/users');
	
}