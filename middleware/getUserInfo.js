const jwt = require('jsonwebtoken');
const cookie = require('cookie');

function get_token(req) {
	let cookies = {};
	cookies = cookie.parse(req.headers.cookie);
	if(cookies != undefined){
		//token = token.split("=")[1];		legacy: there could be more than 2 cookies. req.headers.cookie will return single string no matter how many of cookies are being.
	 	return cookies.login_access_token;
	} else{
		console.log('cookies are undefined. aka no token is being')
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
