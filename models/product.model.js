var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
	name : String,
	desciption : String,
	price : Number,
	image : String
});

var Product = mongoose.model('Product', productSchema, 'product');

module.exports = Product;