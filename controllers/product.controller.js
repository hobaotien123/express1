var Session =  require('../models/session.model.js');
var Product =  require('../models/product.model.js');

module.exports.index = async function(req,res){
	// var allProduct = db.get('product').value().length;
	// var abc = db.get('session').find({ id : req.signedCookies.sessionId}).value().card;
	// var tong = 0;
	// for(var a in abc){
	// 	tong += abc[a];
	// }
	
	// var page = parseInt(req.query.page) || 1;
	// var perPage = 8;
	// var start = (page - 1 ) * perPage;
	// var end = page * perPage;
	// res.render('product/product.pug',{
	// 	products : db.get('product').value().slice(start,end),
	// 	pagination : Math.round(allProduct/8),
	// 	cart : tong
	// })


	//========================///
	// phân trang  ///
	var page = parseInt(req.query.page) || 1;
	var perPage = 8;
	var start = ( page - 1) * perPage;
	var end = page * perPage;
	var products = await Product.find();
	var allProduct = products.length;
	products = products.slice(start,end);
	console.log(allProduct);

	var allCart = {};
	if (req.signedCookies.sessionId) { // chekc neu session ton tai thi moi find
		var findCart = await Session.findOne({ sessionId : req.signedCookies.sessionId});
		allCart = findCart.cart;
	}

	var sumCart = 0;
	for( var a in allCart ){
		sumCart += allCart[a];
	}
	// console.log(sumCart);
	res.render('product/product.pug',{ 
		products : products,
		pagination : Math.ceil(allProduct/8),
		cart : sumCart
	});	
	
}