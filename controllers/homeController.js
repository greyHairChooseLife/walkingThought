const date_ob = new Date();
const db = require('../config/db.js').promise();
const checkLoggedIn = require('../middleware/checkLoggedIn.js');


const home = async (req, res) => {

	let loginStatus = false; 
	let user_id = false;
	let user_nickname = false;
	if(checkLoggedIn.check_loggedIn(req)[1] == true){
		user_id = checkLoggedIn.check_loggedIn(req)[0].id;
		user_nickname = checkLoggedIn.check_loggedIn(req)[0].nickname;
		loginStatus = true; 
	}

	const year = date_ob.getFullYear();
	const month = date_ob.getMonth()+1;
	const date = date_ob.getDate();

	let obj = await db.query(`SELECT * FROM user`);

	let user_list_id = {};
	let user_list_nickname = {};

	for(var i = 0; i < obj[0].length; i++){
		user_list_id[i] = obj[0][i].id;
	}
	for(var i = 0; i < obj[0].length; i++){
		user_list_nickname[i] = obj[0][i].nickname;
	}

	let obj_ejs = {
		user_list_id: user_list_id,
		user_list_nickname: user_list_nickname,
		index_year: year,
		index_month: month,
		index_date: date,
		checkLoggedIn: loginStatus,
		user_id: user_id,
		user_nickname: user_nickname,

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
