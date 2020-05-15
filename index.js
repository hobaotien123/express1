var express = require('express');
var app = express();
var port = 3000;

// dùng pug 
 
app.set('view engine', 'pug')
app.set('views', './views')

//// dùng req.body lấy dữ liệu từ client người dùng gửi lên server
const bodyParser = require('body-parser')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


var users = [
			{ id : 1, name : 'Thinh'},
			{ id : 2, name : 'Tánh'},
			{ id : 3, name : 'Phương'},
			{ id : 4, name : 'Linh'},
			{ id : 5, name : 'Nấu'},
			{ id : 6, name : 'Đi'},
			{ id : 7, name : 'Làm'}
		];

app.get('/',function(req,res){
	res.render('index.pug');
});

app.get('/users',function(req,res){
	res.render('users/users.pug',{
		users: users
	});
});

app.get('/users/search',function(req,res){
	var q = req.query.q;
	var matchedUsers = users.filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/users.pug',{
		users : matchedUsers
	})
})

app.get('/users/create',function(req,res){
	res.render('users/create.pug');
})

app.post('/users/create', function(req,res){
	users.push(req.body);
	res.redirect('/users');
})

app.listen(port,function(){
	console.log('Sever is start port');
});