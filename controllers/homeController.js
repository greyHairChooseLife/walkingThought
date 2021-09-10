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



// 			LEGACY code below with call back. in this case, db shouldn't be a promised object. is callback bad anytime?
// 			LEGACY code below with call back. in this case, db shouldn't be a promised object. is callback bad anytime?
// 			LEGACY code below with call back. in this case, db shouldn't be a promised object. is callback bad anytime?
// 			LEGACY code below with call back. in this case, db shouldn't be a promised object. is callback bad anytime?
// 			LEGACY code below with call back. in this case, db shouldn't be a promised object. is callback bad anytime?
// 			LEGACY code below with call back. in this case, db shouldn't be a promised object. is callback bad anytime?
// 			LEGACY code below with call back. in this case, db shouldn't be a promised object. is callback bad anytime?
//	db.query(`SELECT * FROM user`, function(err, user){
//
//		let user_list_id = {};
//		let user_list_nickname = {};
//	
//		for(var i = 0; i < user.length; i++){
//			user_list_id[i] = user[i].id;
//		}
//		for(var i = 0; i < user.length; i++){
//			user_list_nickname[i] = user[i].nickname;
//		}
//
//		let obj_ejs = {
//			user_list_nickname: user_list_nickname,
//			user_list_id: user_list_id,
//			index_year: index_year,
//			index_month: index_month,
//			index_date: index_date,
//
//		};
//		
//		return res.render('home', obj_ejs);
//	});
}

module.exports = {
	home
};
