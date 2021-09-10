const db = require('../config/db.js').promise();
const Joi = require('joi');
const jwt = require('jsonwebtoken');

//middleware
//const checkLoggedIn = require('../middleware/checkLoggedIn.js');


// 회원 가입
const post_register = async (req, res) => {
//	if(checkLoggedIn.check_loggedIn(req)[1] == true){
//		res.clearCookie('login_access_token');
//	}
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
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

    const { email, password, nickname, birthdate, sex, address } = req.body;

    const db_email = await db.query(`SELECT email FROM user WHERE email=?`, [email]);
        if (db_email[0].length > 0) { return res.status(409).send('이미 존재하는 이메일입니다.'); }
		else{
			db.query(`INSERT INTO user (email, pw, nickname, birthdate, sex, address, created_date) VALUES(?,?,?,?,?,?,NOW())`, [email, password, nickname, birthdate, sex, address]);
			res.redirect('/');
		}
}

// 회원 정보 수정
const get_setting = (req, res) => {
	const id = req.params.id;
	res.render('parts_user/setting', {id: id});
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

	//query uder this line dosn't work. i can't use '[ ]' and '?' syntax 
	//const user_info_edit_result = await db.query(`UPDATE user SET (pw=?, nickname=?, birthdate=?, sex=?, address=?) VALUES(?,?,?,?,?) WHERE id = '${req.params.id}'`, [password, nickname, birthdate, sex, address]);
	const user_info_edit_result = await db.query(`UPDATE user SET pw='${password}', nickname='${nickname}', birthdate='${birthdate}', sex='${sex}', address='${address}' WHERE id='${req.params.id}'`);
	if(user_info_edit_result != undefined)
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
	const { email, password } = req.body;

	try{
		const [db_taken] = await db.query(`SELECT id, email, pw, nickname, created_date FROM user WHERE email=?`, [email]);
		// not registered
		if(db_taken.length == 0)
			return res.send("this email isn't registered yet.");
		// password not match
		if(password != db_taken[0].pw)
			return res.send("this password you entered is NOT matched with the email.");
		// success login,
		// generate token
		const token = generate_token(db_taken[0].id, db_taken[0].nickname, db_taken[0].created_date);
		// send token as cookie(while there are various methods for different usages)
		res.cookie('login_access_token', token, {
			maxAge: 1000 * 60 * 60 * 24 * 30, //30days
			httpOnly: true
		});

		return res.redirect('/');
	}
	catch(err){
		console.log(err);
	}
}

// 로그아웃
const post_logout = (req, res) => {
//	if(checkLoggedIn.check_loggedIn(req)[1] == true){
//		res.clearCookie('login_access_token');
//		res.redirect('/');
//	}
//	else{
//		console.log(`logout err: it tried logout while it's not logged i`);
//	}
}

const post_delete = async (req, res) => { // 계정 삭제
	const delete_result = await db.query(`DELETE FROM user WHERE id='${req.params.id}'`);
	if(delete_result != undefined)
		res.redirect('/');
}


//////////////////////////// cookie generation test
//////////////////////////// cookie generation test
//////////////////////////// cookie generation test
//////////////////////////// cookie generation test
//////////////////////////// cookie generation test
//////////////////////////// cookie generation test
//////////////////////////// cookie generation test
const post_cookie_test = (req, res) => {
//	const user_obj = checkLoggedIn.check_loggedIn(req);
//	console.log(user_obj[0]);

	const msg = `Yes, your cookie is generated like you can see at console.log`

	let individualized_text = msg;
	for(var i=0; i<1000; i++)
		//individualized_text += String(user_obj[0].id);
		individualized_text += 1;

	res.send(individualized_text);
}


module.exports = {
	post_register,
	get_setting,
	post_setting,

	post_login,

	post_cookie_test,

	post_logout,
	post_delete,
};
