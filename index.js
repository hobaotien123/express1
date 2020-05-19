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


/// dùng lowdb 
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write();


/////// dùng shortid ////////
var shortid = require('shortid');


app.get('/',function(req,res){
	res.render('index.pug');
});

app.get('/users',function(req,res){
	res.render('users/users.pug',{
		users: db.get('users').value()
	});
});

app.get('/users/search',function(req,res){
	var q = req.query.q;

	var matchedUsers = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/users.pug',{
		users : matchedUsers
	})
})

app.get('/users/create',function(req,res){
	res.render('users/create.pug');
})

app.get('/users/:id',function(req,res){
	var id = parseInt(req.params.id);
	var user = db.get('users').find({ id : id }).value();
	res.render('users/view.pug',{
		user : user
	})
})

app.post('/users/create', function(req,res){
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('/users');
})

app.get('/users/delete/:id',function(req,res){
	var id = req.params.id;
	console.log(typeof id);
	var user = db.get('users').find({ id : id }).value();
	console.log(user);
	db.get('users').remove(user).write();
	res.redirect('/users');
})

app.listen(port,function(){
	console.log('Sever is start port');
});