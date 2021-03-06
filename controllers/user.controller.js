var db = require('../db.js');
var shortid = require('shortid');

var User = require('../models/user.model.js');


const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

var nodemailer = require("nodemailer");
var hbs = require('nodemailer-express-handlebars');

module.exports.index = async function(req,res){
	// res.render('users/users.pug',{
	// 	users: db.get('users').value()
	// });
	var users = await User.find();
	res.render('users/users.pug',{
		users : users
	})
}

module.exports.search = async function(req,res){
	var q = req.query.q;

	// var matchedUsers = db.get('users').value().filter(function(user){
	// 	return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	// });
	var users = await User.find();
	var matchedUsers = users.filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	})
	res.render('users/users.pug',{
		users : matchedUsers
	})
}
module.exports.create = function(req,res){
	console.log(req.cookies);
	res.render('users/create.pug');
}

module.exports.postCreate = async function(req,res){
	req.body.id = shortid.generate();
	const fileUrl = '/uploads/' + req.file.filename;

	// var errors = [];
	// if(!req.body.name){
	// 	errors.push('Name is not define');
	// }
	// if(req.body.name.length > 30){
	// 	errors.push('Name is not 30 ');
	// }
	// if(errors.length){
	// 	res.render('users/create.pug',{
	// 		errors : errors
	// 	});
	// 	return;
	// }
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(req.body.password, salt);
	var cata = 12;
	req.body.password = hash;
	var password = req.body.password;
	var name = req.body.name;
	var email = req.body.email;
	req.body.avatar = fileUrl // cho nao xu li file dau ban  
	req.body.cata = cata;
	var user = await new User(req.body).save();
		
	//// tạo document trong table ko dùng await
	// User.create(req.body)
	// .then(function (jawbreaker) {
	// })

	// var transporter = nodemailer.createTransport({
	//   host: 'smtp.gmail.com',
	//   auth: {
	//     user: 'tienhbps07597@fpt.edu.vn',
	//     pass: 'Baotien9317'
	//   }
	// });
	// transporter.use('compile',hbs({
	// 	viewPath :'../views/sendMail',
	// 	extName : 'mail.ejs '

	// }))
	// transporter.sendMail({
	// 	from : 'tienhbps07597@fpt.edu.vn',
	// 	to : email,
	// 	subject : 'HOBAOTIEN',
	// 	template : 'mail.ejs',
	// 	context : {
	// 		name,
	// 		email,
	// 		password
	// 	}
	// },function(err,res){
	// 	if(err){
	// 		res.send('thai bai')
	// 	}else{
	// 		res.send('Thanh cong')
	// 	}
	// })

	//=========================

	// var transporter = nodemailer.createTransport({
	//   service: 'gmail',
	//   auth: {
	//     user: 'hobaotien123@gmail.com',
	//     pass: '931703870aA'
	//   }
	// });
	// var mailOptions = {
	//   from: 'hobaotien123@gmail.com',
	//   to: email,
	//   subject: 'Sending Email using Node.js',
	//   text:
	//   	'User Name : ' + name + "<br>" +
	//   	'password : ' + req.body.password
	// };
	// transporter.sendMail(mailOptions, function(error, info){
	//   if (error) {
	//     console.log(error);
	//   } else {
	//     console.log('Email sent: ' + info.response);
	//   }
	// });



	res.redirect('/users');
}

module.exports.view = function(req,res){
	var id = req.params.id;
	User.findById(id,function(err,user){
		if(err){
			console.log(err);
		}else{
			res.render('users/view.pug',{
				user: user
			})
		}
	});
	
	// var user = db.get('users').find({ id : id }).value();
	// res.render('users/view.pug',{
	// 	user: user
	// })
}
module.exports.delete = function(req,res){
	var id = req.params.id;
	User.findByIdAndRemove(id)
	.then(function(user){
		res.redirect('/users');
	})


	// var user = db.get('users').find({ id : id }).value();
	// db.get('users').remove(user).write();
	// res.redirect('/users');
};
module.exports.edit = function(req,res){
	var id = req.params.id;
	User.findById(id)
	.then(function(user){
		res.render('users/edit.pug',{
			user: user
		})
	})
	// var user = db.get('users').find({ id : id }).value();
	// res.render('users/edit.pug',{
	// 	user: user
	// })
}
module.exports.postEdit = function(req,res){
	var id = req.params.id;
	User.findByIdAndUpdate(id,{name : req.body.name})
	.then(function(){
		res.redirect('/users');
	})

	// db.get('users').find({ id : id })
	// .assign({ name : req.body.name })
	// .write()
	// res.redirect('/users');
	
}