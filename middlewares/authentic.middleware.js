// var db = require('../db.js');
var User = require('../models/user.model.js');

module.exports = async function (req,res,next) {
	if(!req.signedCookies.userId){
		res.redirect('/login');
		return;
	}
	// var cookieDb = db.get('cookies').find({ cookieId: req.cookies.userId }).value();
	// if (!cookieDb) {
	// 	db.get('cookies').push({ cookieId: req.cookies.userId, count: 1 }).write();
	// } else {
	// 	db.get('cookies').find({ cookieId: req.cookies.userId }).assign({ count: cookieDb.count + 1 }).write();
	// }
	 
	
	
	var user = await User.findById(req.signedCookies.userId);
	// db.get('users').find({ id : req.signedCookies.userId}).value();
	if(!user){
		res.redirect('/login');
		return;
	}

	res.locals.user = user;
	
	next();
};

// ban cu viet vao authentic.middleware.js roi minh sua lai sau, ok ban