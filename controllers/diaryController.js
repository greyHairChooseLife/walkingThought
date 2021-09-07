const db = require('../config/db.js').promise();

//generate dummy data
const gen = require('../tester/test_data_generater.js');
const dummy = (req, res) => {
	gen.gen(req, res);
	res.send('data settled');
}

function get_daily_diary(y, m, d, user_id){
	if(d === 0){
		m = m-1;
		d = new Date(y, m, d).getDate();
	}
	if(m === 0){
		y = y-1;
		m = 12;
	}
		
	return db.query(`SELECT created_date, content, question FROM diary WHERE (user_id=?)
		AND (classes = 'd')
		AND (YEAR(created_date) = ${y})
		AND (MONTH(created_date) = ${m}) 
		AND (DAY(created_date) = ${d})
		`, [user_id]);
}

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

const daily = async (req, res) => {

	const user_id = req.params.id;
	const focused_year = Number(req.query.year);
	const focused_month = Number(req.query.month);
	const focused_date = Number(req.query.date);

	let db_obj = [];
	for(var i=0; i<2; i++){
		for(var j=0; j<4; j++){
			let temp = await get_daily_diary(focused_year-j, focused_month, focused_date-i, user_id);
			if(temp[0][0] == undefined){
				temp[0][0] = {
					created_date: `you missed this day`,
					content: `empty :<`,
					question: `empty :(`,
				}
			}
			db_obj.push(temp[0][0]);
		}
	}
	const db_obj_ejs = {
		L1_date : db_obj[7].created_date,
		L2_date : db_obj[6].created_date,
		L3_date : db_obj[5].created_date,
		L4_date : db_obj[4].created_date,
 
		L1_content : db_obj[7].content,
		L2_content : db_obj[6].content,
		L3_content : db_obj[5].content,
		L4_content : db_obj[4].content,

		L1_question : db_obj[7].question,
		L2_question : db_obj[6].question,
		L3_question : db_obj[5].question,
		L4_question : db_obj[4].question,

		R1_date : db_obj[3].created_date,
		R2_date : db_obj[2].created_date,
		R3_date : db_obj[1].created_date,
		R4_date : db_obj[0].created_date,
 
		R1_content : db_obj[3].content,
		R2_content : db_obj[2].content,
		R3_content : db_obj[1].content,
		R4_content : db_obj[0].content,

		R1_question : db_obj[3].question,
		R2_question : db_obj[2].question,
		R3_question : db_obj[1].question,
		R4_question : db_obj[0].question,

		//index : index,
		index_year: focused_year,
		index_month: focused_month,
		index_date: focused_date,
		user_id: user_id,
	}

	res.render('../views/diary/daily', db_obj_ejs);
}


const monthly = async (req, res) => {

	const user_id = req.params.id;
	const focused_year = Number(req.query.year);
	const focused_month = Number(req.query.month);
	const focused_date = Number(req.query.date);

	let db_obj = [];
	for(var i=0; i<2; i++){
		for(var j=0; j<4; j++){
			let temp = await get_monthly_diary(focused_year-j, focused_month-i, user_id);
			console.log(focused_year-j);
			console.log(focused_month-i);
			if(temp[0][0] == undefined){
				temp[0][0] = {
					created_date: `you missed this month`,
					content: `empty :<`,
					question: `empty :(`,
				}
			}
			db_obj.push(temp[0][0]);
		}
	}

	const db_obj_ejs = {
		L1_date : db_obj[7].created_date,
		L2_date : db_obj[6].created_date,
		L3_date : db_obj[5].created_date,
		L4_date : db_obj[4].created_date,
 
		L1_content : db_obj[7].content,
		L2_content : db_obj[6].content,
		L3_content : db_obj[5].content,
		L4_content : db_obj[4].content,

		L1_question : db_obj[7].question,
		L2_question : db_obj[6].question,
		L3_question : db_obj[5].question,
		L4_question : db_obj[4].question,

		R1_date : db_obj[3].created_date,
		R2_date : db_obj[2].created_date,
		R3_date : db_obj[1].created_date,
		R4_date : db_obj[0].created_date,
 
		R1_content : db_obj[3].content,
		R2_content : db_obj[2].content,
		R3_content : db_obj[1].content,
		R4_content : db_obj[0].content,

		R1_question : db_obj[3].question,
		R2_question : db_obj[2].question,
		R3_question : db_obj[1].question,
		R4_question : db_obj[0].question,

		index_year: focused_year,
		index_month: focused_month,
		index_date: focused_date,
		user_id: user_id,
	}

	res.render('../views/diary/monthly', db_obj_ejs);
}


const monthly_mode_B = async (req, res) => {

	const user_id = req.params.id;
	const focused_year = Number(req.query.year);
	const focused_month = Number(req.query.month);
	const focused_date = Number(req.query.date);

	const db_obj = await db.query(`SELECT created_date, content, question FROM diary WHERE user_id=?
		AND (classes = 'd')
		AND (YEAR(created_date)=?)
		AND (MONTH(created_date)=?)
		`, [user_id, focused_year, focused_month]);

	let db_obj_ejs = {};
	
	for(let i=1; i <= db_obj[0].length; i++){
		let key1 = 'D'+ i + '_date';
		let key2 = 'D'+ i + '_content';
		let key3 = 'D'+ i + '_question';
		db_obj_ejs[key1] = db_obj[0][i-1].created_date;
		db_obj_ejs[key2] = db_obj[0][i-1].content;
		db_obj_ejs[key3] = db_obj[0][i-1].question;
	}

	db_obj_ejs.index_year = focused_year;
	db_obj_ejs.index_month = focused_month;
	db_obj_ejs.index_date = focused_date;
	db_obj_ejs.user_id = user_id;

	console.log(db_obj_ejs);


//////////legacy code for calendar
//////////legacy code for calendar
//////////legacy code for calendar
//////////legacy code for calendar
//////////legacy code for calendar
//////////legacy code for calendar
//			var a = focused_year;
//			var b = focused_month;
//			var c = tools.switch_D_to_common_D(focused_date);
//
//			var calander = ``;
//			for(i=0; i < 42; i++){
//				var starting_point = tools.get_days_name(a,b,c);
//				if(i >= starting_point && i <= daily_diary.length+starting_point-1){
//					calander += `
//					<div class="days" id="day${i-starting_point+1}"><div>${i-starting_point+1}</div></div>
//					`;
//				}
//				else {
//					calander += `
//					<div class="days"><div></div></div>
//					`;
//				}
//			}

	res.render('../views/diary/monthly_mode_B', db_obj_ejs);
}

const daily_post = (req, res) => {
	console.log('routing success : daily_post');
};

const monthly_post = (req, res) => {
	console.log('routing success : monthly_post');
};



//const annualy = (req, res) => {
//}
//
//const _delete = (req, res) => {
//}

module.exports = {
	dummy,

	daily, 
	monthly,
	monthly_mode_B,

	daily_post,
	monthly_post,

}
