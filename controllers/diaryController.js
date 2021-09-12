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

		index_year: focused_year,
		index_month: focused_month,
		index_date: focused_date,
		user_id: user_id,
	}

	res.render('../views/diary/daily', db_obj_ejs);
}

function getDateName(year, month, day){
	var a;
	var b;
	var c = Number(month);
	var d = Number(day);
	if(c == 1){
		year = Number(year)-1;
		c = 13;
	} else if(c == 2){
		year = Number(year)-1;
		c = 14;
	}

	a = 0.25 * (21 * Number(String(year).substr(0,2)));
	b = 0.25 * (5 * Number(String(year).substr(String(year).length-2, 2)));
	c = (c+1)*26*0.1;
	
	if(a > 0)
		a = parseInt(a);
	else if(a < 0)
		a = parseInt(a*(-1))+1;
	if(b > 0)
		b = parseInt(b);
	else if(b < 0)
		b = parseInt(b*(-1))+1;
	if(c > 0)
		c = parseInt(c);
	else if(c < 0)
		c = parseInt(c*(-1))+1;

	answer = (a+b+c+d-1) % 7;

	return(answer);
	/*
	if(answer == 0)
		return("일요일");
	else if(answer == 1)
		return("월요일");
	else if(answer == 2)
		return("화요일");
	else if(answer == 3)
		return("수요일");
	else if(answer == 4)
		return("목요일");
	else if(answer == 5)
		return("금요일");
	else if(answer == 6)
		return("토요일");
	*/
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
	
	//get a name of day. the day of the first date of the month.
	const init_day = getDateName(focused_year, focused_month, focused_date-focused_date+1);
	const last_date_of_month = new Date(focused_year, focused_month, 0).getDate();

//make calendar
//////////	const calendar = await db.query(`SELECT created_date, content, question, score FROM diary WHERE (user_id=?)
//////////		AND (classes = 'd')
//////////		AND (YEAR(created_date) = ${focused_year})
//////////		AND (MONTH(created_date) = ${focused_month}) 
//////////		`, [user_id]);
//////////
//////////	let calendar_obj = [];
//////////	for(let i=1; i<=last_date_of_month; i++){
//////////		if(calendar[0][i] === undefined){
//////////			calendar[0][i] = {
//////////				date_of_created_date: i,
//////////				question: 'you missed it :<',
//////////				content: 'you missed it :<',
//////////			}
//////////		} else{
//////////			calendar[0][i] = {
//////////				date_of_created_date: calendar[0][i].created_date.getDate(),
//////////				question: calendar[0][i].question,
//////////				content: calendar[0][i].content,
//////////			}
//////////		}
//////////		calendar_obj.push(calendar[0][i]);
//////////	}


	//obj for ejs

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
		
		//calendar_obj: calendar_obj,

		index_year: focused_year,
		index_month: focused_month,
		index_date: focused_date,
		user_id: user_id,

		init_day: init_day,
		last_date_of_month: last_date_of_month,
	}

	res.render('../views/diary/monthly', db_obj_ejs);
}


const daily_post = (req, res) => {
	const { content, question, score, user_id, index_year, index_month, index_date } = req.body;
	const classes = 'd';
	const created_date = new Date();

	db.query(`INSERT INTO diary (classes, created_date, content, question, score, user_id) VALUES (?, ?, ?, ?, ?, ?)`, [classes, created_date, content, question, score, user_id]);

	//without first argument 307, redirect askes GET method. 307 make it POST method.
	res.redirect(307, `/diary/daily/${user_id}?year=${index_year}&month=${index_month}&date=${index_date}`);
};

const monthly_post = (req, res) => {
	const { content, question, user_id, index_year, index_month, index_date } = req.body;
	const classes = 'm';
	const created_date = new Date();

	db.query(`INSERT INTO diary (classes, created_date, content, question, user_id) VALUES (?, ?, ?, ?, ?)`, [classes, created_date, content, question, user_id]);
	
	//without first argument 307, redirect askes GET method. 307 make it POST method.
	res.redirect(307, `/diary/monthly/${user_id}?year=${index_year}&month=${index_month}&date=${index_date}`);
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

	daily_post,
	monthly_post,

}
