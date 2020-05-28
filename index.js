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


//// dùng lowdb //
// var db = require('routes/db.js');


/////// dùng shortid ////////
var shortid = require('shortid');

//// dùng Route ..
var useRoutes = require('./routes/user.route.js');
var useAuthentic = require('./routes/authentic.route.js');
/// dùng cookie-parser ///
var cookieParser = require('cookie-parser');
app.use(cookieParser('gasdqw1241fasd12312412asd'))
app.use(express.static('public'))

//// dùng midllewareAuthentic ///

var authenticMidlleware = require('./middlewares/authentic.middleware.js');

var useProduct = require('./routes/product.route.js');


app.get('/',function(req,res){
	res.render('index.pug');
});

app.use('/users', useRoutes);
// 
app.use('/login',  useAuthentic);

app.use('/product',  useProduct);




// app.get('/users',function(req,res){
// 	res.render('users/users.pug',{
// 		users: db.get('users').value()
// 	});
// });

// app.get('/users/search',function(req,res){
// 	var q = req.query.q;

// 	var matchedUsers = db.get('users').value().filter(function(user){
// 		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
// 	});
// 	res.render('users/users.pug',{
// 		users : matchedUsers
// 	})
// })

// app.get('/users/create',function(req,res){
// 	res.render('users/create.pug');
// })

// app.get('/users/:id',function(req,res){
// 	var id = req.params.id;
// 	var user = db.get('users').find({ id : id }).value();
// 	res.render('users/view.pug',{
// 		user: user
// 	})
// })

// app.post('/users/create', function(req,res){
// 	req.body.id = shortid.generate();
// 	db.get('users').push(req.body).write();
// 	res.redirect('/users');
// })	

// app.get('/users/delete/:id',function(req,res){
// 	var id = req.params.id;
// 	var user = db.get('users').find({ id : id }).value();
// 	db.get('users').remove(user).write();
// 	res.redirect('/users');
// })

// app.get('/users/edit/:id',function(req,res){
// 	var id = req.params.id;
// 	var user = db.get('users').find({ id : id }).value();
// 	res.render('users/edit.pug',{
// 		user: user
// 	})
// })
// app.post('users/edit/:id',function(req,res){
// 	console.log(req.body);
// 	db.get('users').find({ id : id })
// 	.assign({ name : req.body.name })
// 	.write()
// 	res.redirect('/users');
	
// })


app.listen(port,function(){
	console.log('Sever is start port');
});