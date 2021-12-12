const jwt = require('jsonwebtoken');
const cookie = require('cookie');

function get_token(req) {
	let cookies = {};
	if(req.headers.cookie == undefined){
		console.log('there is no cookie')
		return false;
	}else{
		cookies = cookie.parse(req.headers.cookie);
	}
	if(cookies.login_access_token == undefined){
		console.log('there are cookie but not the right thing')
		return false;
	}else{
		return cookies.login_access_token;
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
