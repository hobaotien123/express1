// var db = require('../db.js');
// var md5 = require('md5');
var User = require('../models/user.model.js');


const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';
// // const salt = bcrypt.genSaltSync(saltRounds);

module.exports.login = function (req,res,next) {
	res.render('../views/users/login.pug');
}
module.exports.postLogin = async function(req,res){
	var email = req.body.email;
	var password = req.body.password;

	var user = await User.findOne({email : email});
	console.log(user);
	
	// db.get('users').find({ email : email }).value();
	
	if(!user){
		res.render('../views/users/login.pug',{
			errors : [
				'User is not exist'
			],
			value : req.body
		});
		return;
	}
	var isCorrect = bcrypt.compareSync(req.body.password,user.password);
	if (!isCorrect){
		res.render('../views/users/login.pug',{
			errors : [
				'Pass!'
			],
			values : req.body
		});
		return;
	}
 

		
	// var hashPassword = md5(password)

	// if(user.password !== hash){
	// 	res.render('../views/users/login.pug',{
	// 		errors : [
	// 			'Pass!'
	// 		],
	// 		values : req.body
	// 	});
	// 	return;
	// }
	
	res.cookie('userId',user.id,{
		signed : true
	});

	res.redirect('/users');
}