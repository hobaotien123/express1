var shortid = require('shortid');
var Session = require('../models/session.model.js');

module.exports = async function(req,res,next){
	if(!req.signedCookies.sessionId){
		var sessionId = shortid.generate();
		res.cookie('sessionId', sessionId ,{
			signed : true
		});
		var sessionId = await Session({sessionId : sessionId}).save();
		// db.get('session').push({
		// 	id : sessionId
		// }).write();
	}
	next();
}