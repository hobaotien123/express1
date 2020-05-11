var express = require('express');
var app = express();
var port = 3000;

app.get('/',function(req,res){
	res.send('Hello Tiến');
});

app.get('/todos',function(req,res){
	res.send('<ul><li>Đi chợ</li><li>Đi chợ</li><li>Đi chợ</li><li>Đi chợ</li></ul>');
});

app.listen(port,function(){
	console.log('Sever is start port');
});