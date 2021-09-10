const date_ob = new Date();
const db = require('../config/db.js').promise();


const home = (req, res) => {

	const year = date_ob.getFullYear();
	const month = date_ob.getMonth()+1;
	const date = date_ob.getDate();

	const user = res.locals.user;
	const isLogin = res.locals.isLogin;


	let obj_ejs = {
		index_year: year,
		index_month: month,
		index_date: date,
		user_id: user.id,
		user_nickname: user.nickname,
		checkLoggedIn: isLogin,

	};
	return res.render('home', obj_ejs);


}

module.exports = {
	home
};
