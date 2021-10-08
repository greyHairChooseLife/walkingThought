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
	const token = get_token(req);
	const decoded = verify_token(token);
	if(decoded != undefined){
		res.locals.user = {
			id: decoded.id,
			nickname: decoded.nickname,
		}
		res.locals.isLogin = true;
	} else{
		res.locals.user = {
			id: '',
			nickname: '',
		}
		res.locals.isLogin = false;
	}

	next();
};

module.exports = getUserInfo;
