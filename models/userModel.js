const db = require('../config/db.js').promise();


class User {
	constructor(id, pw, nickname, created_date, mobile_number){
		this.user_id = id;
		this.pw = pw;
		this.nickname = nickname;
		this.created_date = created_date;
		this.mobile_number = mobile_number;
	}
	//period(){}
}

const get_user = async (given_mobile) => {
	const [user] = await db.query(`SELECT id, pw, nickname, created_date FROM user WHERE mobile_number=?`, [given_mobile]);

	if(user[0] == undefined){
		console.log('this mobile number is not registered');
		return false;
	}

	return new User(user[0].id, user[0].pw, user[0].nickname, user[0].created_date, given_mobile);
}

const check_betatest_agreement = async (user_id) => {
	const [is_agreed] = await db.query(`SELECT agreement FROM data_use_agreement WHERE user_id=?`, [user_id]);

	if(is_agreed[0] == undefined){
		return false;
	}else{
	if(is_agreed[0].agreement == 'Y')
		return true;
	}
}

const post_agreement = (user_id, agreement) => {
	db.query(`INSERT INTO data_use_agreement (user_id, agreement, created_date) VALUES(?,?,NOW())`, [user_id, agreement]);
	return;
}

const register_user = (mobile_number, password, nickname, birthdate, sex, address) => {
	db.query(`INSERT INTO user (mobile_number, pw, nickname, birthdate, sex, address, created_date) VALUES(?,?,?,?,?,?,NOW())`, [mobile_number, password, nickname, birthdate, sex, address]);
	return;
}

const edit_user_info = async (user_id, password, nickname, birthdate, sex, address) => {
	const edit_result = await db.query(`UPDATE user SET pw='${password}', nickname='${nickname}', birthdate='${birthdate}', sex='${sex}', address='${address}' WHERE id='${user_id}'`);
	return edit_result;
}

module.exports = {
	get_user,
	check_betatest_agreement,
	register_user,
	post_agreement,
	edit_user_info,
};
