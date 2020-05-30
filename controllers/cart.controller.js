var db = require('../db.js')
module.exports.addToCart = function(req,res,next) {
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;
	if(!sessionId){
		res.redirect('/product');
		return
	}
	var countCard = db.get('session').find({ id : sessionId  })
	.get('card.' + productId, 0)
	.value();
	db.get('session')
		.find({ id : sessionId })
		.set('card.' + productId, countCard + 1)
		.write();
	res.redirect('/product');

};