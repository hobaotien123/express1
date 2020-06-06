// var db = require('../db.js')
var Session = require('../models/session.model.js');
// relative path, absolute path
// var Product = require('../models/product.model.js');

module.exports.addToCart = async function(req,res) {
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;
	if(!sessionId){
		res.redirect('/product');
		return
	}
	var path = 'cart.' + productId;
	var countCart = await Session.findOneAndUpdate({sessionId : sessionId }, { 
		$inc: {
			[path]: 1
		} 
	});
	console.log(countCart); // 
	// var addCart  = await Session.findOneAndUpdate({sessionId : sessionId },{$inc: { [path]: 1 } });

	// db.get('session').find({ id : sessionId  })
	// .get('card.' + productId, 0)
	// .value();

	// db.get('session')
	// 	.find({ id : sessionId })
	// 	.set('card.' + productId, countCard + 1)
	// 	.write();
	res.redirect('/product');

};