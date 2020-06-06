var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	email : String,
	password : String,
	name : String,
	avatar : String,
	cata : Number
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;