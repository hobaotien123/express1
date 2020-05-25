var db = require('../db.js');
module.exports.requireAuth = function (req,res,next) {
	if(!req.signedCookies.userId){
		res.redirect('/login');
		return;
	}
	console.log(req.signedCookies);
	var cookieDb = db.get('cookies').find({ cookieId: req.cookies.userId }).value();
	if (!cookieDb) {
		db.get('cookies').push({ cookieId: req.cookies.userId, count: 1 }).write();
	} else {
		db.get('cookies').find({ cookieId: req.cookies.userId }).assign({ count: cookieDb.count + 1 }).write();
	}
	//cookieDb.cookieId
	// cho minh xem docs nha ban 
	
	
	var user = db.get('users').find({ id : req.signedCookies.userId}).value();
	if(!user){
		res.redirect('/login');
		return;
	}

	res.locals.user = user;
	
	next();
};

// ban cu viet vao authentic.middleware.js roi minh sua lai sau, ok ban