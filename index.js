var express = require('express');
var app = express();
var port = 3000;

// dùng pug 
 
app.set('view engine', 'pug')
app.set('views', './views')



app.get('/',function(req,res){
	res.render('index.pug');
});

app.get('/users',function(req,res){
	res.render('users/users.pug',{
		users: [
			{ id : 1, name : 'Thinh'},
			{ id : 2, name : 'Tánh'},
			{ id : 3, name : 'Phương'},
			{ id : 4, name : 'Linh'}
		]
	});
});

app.listen(port,function(){
	console.log('Sever is start port');
});