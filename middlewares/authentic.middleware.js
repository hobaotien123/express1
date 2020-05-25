var db = require('../db.js');
module.exports.requireAuth = function (req,res,next) {
	if(!req.cookies.userId){
		res.redirect('/login');
		return;
	}

	var cookieDb = db.get('cookies').find({ cookieId: req.cookies.userId }).value();
	if (!cookieDb) {
		db.get('cookies').push({ cookieId: req.cookies.userId, count: 1 }).write();
	} else {
		console.log(cookieDb.cookieId);
		db.get('cookies').find({ cookieId: req.cookies.userId }).assign({ count: cookieDb.count + 1 }).write();
	}
	//cookieDb.cookieId
	// cho minh xem docs nha ban 
	
	
	var user = db.get('users').find({ id : req.cookies.userId}).value();
	if(!user){
		res.redirect('/login');
		return;
	}
	
	next();
};

// ban cu viet vao authentic.middleware.js roi minh sua lai sau, ok ban