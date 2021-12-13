const db = require('../config/db.js').promise();

function get_monthly_diary(y, m, user_id){
	if(m === 0){
		y = y-1;
		m = 12;
	}
	return db.query(`SELECT created_date, content, question FROM diary WHERE (user_id=?)
		AND (classes = 'm')
		AND (YEAR(created_date) = ${y})
		AND (MONTH(created_date) = ${m}) 
		`, [user_id]);
}

function get_M_period(y, m, d){
	const compare = new Date(y, m, 0).getDate();
	if(d == 1 || d == 2 || d == 3 || d == compare)
		return monthly_write_period = true;
	return monthly_write_period = false;
}
function get_A_period(y, m, d){
	const compare = new Date(y, m, d);
	const final_day = new Date(y+1, 0, 0);
	if(m == 12 || d == final_day)
		return annually_write_period = true;
	if(m == 1){
		if(d <= 14)
			return annually_write_period = true;
	}
	return annually_write_period = false;
}

const home = async (req, res) => {

	const year = new Date().getFullYear();
	const month = new Date().getMonth()+1;
	const date = new Date().getDate();

	const user = res.locals.user;
	const isLogin = res.locals.isLogin;


	const today_index = [new Date().getFullYear(), new Date().getMonth()+1];
	let is_monthly_written;
	let checker = await get_monthly_diary(today_index[0], today_index[1], user.id);
	if(checker[0][0] != undefined)
		is_monthly_written = true;
	else
		is_monthly_written = false;


	const monthly_write_period = get_M_period(year, month, date);

	const annually_write_period = get_A_period(year, month, date);


	let obj_ejs = {
		index_year: year,
		index_month: month,
		index_date: date,
		user_id: user.id,
		user_nickname: user.nickname,
		checkLoggedIn: isLogin,
		monthly_write_period: monthly_write_period,
		annually_write_period: annually_write_period,
		is_monthly_written: is_monthly_written,

	};
	return res.render('home', obj_ejs);


}

module.exports = {
	home
};
