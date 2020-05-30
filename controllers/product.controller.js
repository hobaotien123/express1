module.exports.index = function(req,res){
	var allProduct = db.get('product').value().length;
	var abc = db.get('session').find({ id : req.signedCookies.sessionId}).value().card;
	var tong = 0;
	for(var a in abc){
		tong += abc[a];
	}
	
	var page = parseInt(req.query.page) || 1;
	var perPage = 8;
	var start = (page - 1 ) * perPage;
	var end = page * perPage;
	res.render('product/product.pug',{
		products : db.get('product').value().slice(start,end),
		pagination : Math.round(allProduct/8),
		cart : tong
	})
}