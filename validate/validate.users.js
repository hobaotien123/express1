module.exports.postValidateUser = function(req,res,next) {
	var errors = [];
	if(!req.body.name){
		errors.push('Name is not define');
	}
	if(req.body.name.length > 30){
		errors.push('Name is not 30 ');
	}
	if(errors.length){
		res.render('users/create.pug',{
			errors : errors
		});
		return;
	}
	next();
}