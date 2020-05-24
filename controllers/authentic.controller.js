var db = require('../db.js');

module.exports.login = function (req,res,next) {
	res.render('../views/users/login.pug');
}
module.exports.postLogin = function(req,res,next){
	var email = req.body.email;
	var password = req.body.password;
	var user = db.get('users').find({ email : email }).value();
	if(!user){
		res.render('../views/users/login.pug',{
			errors : [
				'User is not exist'
			],
			value : req.body
		});
		return;
	}
	if(user.password !== password){
		res.render('../views/users/login.pug',{
			errors : [
				'Pass!'
			],
			values : req.body
		});
		return;
	}

	res.cookie('userId',user.id);
	res.redirect('/users');
}