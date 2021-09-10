const jwt = require('jsonwebtoken');

function get_token(req) {
	let token = req.headers.cookie;
	if(token != undefined){
		token = token.split("=")[1];
		return token;
	} else{
		return false;
	}
}

function verify_token(token) {
	if(token != false){
		const answer = jwt.verify(token, process.env.JWT_SECREAT);
		return answer;
	}
}



const getUserInfo = (req, res, next) => {
	let token = get_token(req);
	if(verify_token(token) != undefined){
		res.locals.user = {
			id: 'verified',
			nickname: 'fied',
		}
		res.locals.isLogin = true;
	} else{
		res.locals.user = {
			id: 'not verified',
			nickname: 'nono no',
		}
		res.locals.isLogin = false;
	}

	next();
};

module.exports = getUserInfo;
