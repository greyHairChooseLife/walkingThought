const db = require('../config/db.js').promise();
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel.js');


// 회원 가입
const post_register = async (req, res) => {
//check login status and if it is true then force to logged out as taking login_access_token away.
	if(res.locals.isLogin === true){
		res.clearCookie('login_access_token');
	}

    const schema = Joi.object().keys({
        mobile_number: Joi.string().required(),
        password: Joi.string().required(),
        password_check: Joi.string().required(),
        nickname: Joi.string().required(),
        sex: Joi.string().valid('M', 'F').required(),
        address: Joi.string().required(),
        birthdate: Joi.date().required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
		console.log(result.error);
        res.status(400);
        res.send(result.error.details[0].message);
        return;
    }

	if(req.body.password != req.body.password_check)
		return res.send('비밀번호 확인이 틀렸어요xD');

    const { mobile_number, password, nickname, birthdate, sex, address } = req.body;

	const get_user = await userModel.get_user(mobile_number);
	if(get_user == false){
		userModel.register_user(mobile_number, password, nickname, birthdate, sex, address);
		return res.redirect('/');
	}
	else{
		return res.status(409).send('이미 가입된 전화번호입니다.');
	}
}

// 회원 정보 수정
const get_setting = (req, res) => {
	return res.send('this is blocked temperally');

	const id = res.locals.user.id;
	res.render('user/setting', {id: id});
}

const post_setting = async (req, res) => {
    const schema = Joi.object().keys({
        password: Joi.string().required(),
        password_check: Joi.string().required(),
        nickname: Joi.string().required(),
        sex: Joi.string().valid('M', 'F').required(),
        address: Joi.string().required(),
        birthdate: Joi.date().required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
		console.log(result.error);
        res.status(400);
        res.send(result.error.details[0].message);
        return;
    }

	if(req.body.password != req.body.password_check)
		return res.send('"check your password!!"');

    const { password, nickname, birthdate, sex, address } = req.body;
	const user_id = res.locals.user.id;

	if(await userModel.edit_user_info(user_id, password, nickname, birthdate, sex, address) != undefined)
		res.redirect('/');
}

//token generator
function generate_token(id, nickname, created_date){
    const token = jwt.sign(
        {
            id: id,
            nickname: nickname,
			created_date: created_date,
        },
        process.env.JWT_SECREAT,
        {
            expiresIn: '30d',
        }
    )
    return token;
};

const post_login = async (req, res) => {
	const { mobile_number, password } = req.body;
	try{
		const get_user = await userModel.get_user(mobile_number);
		if(get_user == false)
			return res.send("가입되지 않은 전화번호입니다.");
		if(get_user.pw != password)
			return res.send("틀린 비밀번호입니다.");
		const token = generate_token(get_user.user_id, get_user.nickname, get_user.created_date);
		// send token as cookie(while there are various methods for different usages)
		res.cookie('login_access_token', token, {
			maxAge: 1000 * 60 * 60 * 24 * 30, //30days
			httpOnly: true
		});
		if(await userModel.check_betatest_agreement(get_user.user_id) == true){
			return res.redirect('/');
		}else
			return res.render('../views/parts_home/user_agreement')
	}
	catch(err){
		console.log(err);
	}
}

//정보제공이용동의
const post_agreement = (req, res) => {
	const user_id = res.locals.user.id;
	const agreement = 'Y';
	userModel.post_agreement(user_id, agreement);
	return res.redirect('/');
}

// 로그아웃
const post_logout = (req, res) => {
	const isLogin = res.locals.isLogin;
	if(isLogin == true){
		res.clearCookie('login_access_token');
		res.redirect('/');
	}
	else{
		console.log(`logout err: it tried logout while it's not logged in`);
		res.redirect('/');
	}
}

const post_delete = async (req, res) => { // 계정 삭제
	return res.send('this is blocked temperally');
	
	//check login status and if it is true then force to logged out as taking login_access_token away.
	if(res.locals.isLogin === true)
		res.clearCookie('login_access_token');
	
	const user_id = res.locals.user.id;

	const delete_result = await db.query(`DELETE FROM user WHERE id=?`, [user_id]);
	if(delete_result != undefined)
		res.redirect('/');
}



module.exports = {
	post_register,
	get_setting,			//inactive temperally
	post_setting,			//inactive temperally

	post_login,
	post_agreement,
	post_logout,
	post_delete,			//inactive temperally
};
