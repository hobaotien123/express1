module.exports.index = function(req,res){
	var page = parseInt(req.query.page) || 1;
	var perPage = 8;
	var start = (page - 1 ) * perPage;
	var end = page * perPage;
	res.render('product/product.pug',{
		products : db.get('product').value().slice(start,end)
	})
}