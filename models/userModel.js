const db = require('../config/db.js').promise();


class User {
	constructor(id, pw, nickname, created_date){
		this.user_id = id;
		this.pw = pw;
		this.nickname = nickname;
		this.created_date = created_date;
	}
	//period(){return something}
}

const get_user = async (given_mobile) => {
	const [user] = await db.query(`SELECT id, pw, nickname, created_date FROM user WHERE mobile_number=?`, [given_mobile]);

	if(user[0] == undefined){
		console.log('this mobile number is not registered');
		return false;
	}

	return new User(user[0].id, user[0].pw, user[0].nickname, user[0].created_date);
}

const check_betatest_agreement = async (user_id) => {
	const [is_agreed] = await db.query(`SELECT agreement FROM data_use_agreement WHERE user_id=?`, [user_id]);

	if(is_agreed[0].agreement == 'Y')
		return true;
	else
		return false;
}

module.exports = {
	get_user,
	check_betatest_agreement,
};
