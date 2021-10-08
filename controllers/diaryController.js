const db = require('../config/db.js').promise();
//generate dummy data
const gen = require('../tester/test_data_generater.js');


const dummy = (req, res) => {
	gen.gen(req, res);
	res.send('data settled');
}

//contents for daily page. it need a proper function naming
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

//contents for monthly page. it need a proper function naming 
function get_every_diary_of_month(y, m, user_id){
	if(m === 0){
		y = y-1;
		m = 12;
	}
		
	return db.query(`SELECT created_date, content, question FROM diary WHERE (user_id=?)
		AND (classes = 'd')
		AND (YEAR(created_date) = ${y})
		AND (MONTH(created_date) = ${m}) 
		`, [user_id]);
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

const read_and_write_daily = async (req, res) => {

	const user_id = res.locals.user.id;
	const focused_year = Number(req.query.year);
	const focused_month = Number(req.query.month);
	const focused_date = Number(req.query.date);

	const today_index = [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()];

	let is_written;
	let checker = await get_daily_diary(today_index[0], today_index[1], today_index[2], user_id);

	if(checker[0][0] != undefined)
		is_written = true;
	else
		is_written = false;


	let db_obj = [];
	let index = 0;
	for(var i=0; i<2; i++){
		let a = '작년의 ';
		let b = '2년 전 ';
		let c = '3년 전 ';
		let A = '어제';
		let B = '오늘';
		for(var j=0; j<4; j++){
			let temp = await get_daily_diary(focused_year-j, focused_month, focused_date-i, user_id);
			let indi;
			switch(index) {
				case 0:
					indi = B;
					break;
				case 1:
					indi = a + B;
					break;
				case 2:
					indi = b + B;
					break;
				case 3:
					indi = c + B;
					break;
				case 4:
					indi = A;
					break;
				case 5:
					indi = a + A;
					break;
				case 6:
					indi = b + A;
					break;
				case 7:
					indi = c + A;
					break;
			}
			index++;

			if(temp[0][0] == undefined){
				temp[0][0] = {
					created_date: indi,
					content: ``,
					question: `기록이 없어요 :(`,

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
		today_index: today_index,
		is_written: is_written,
	}

	res.render('../views/diary/daily', db_obj_ejs);
}

const pickup_game_monthly = async (req, res) => {

	const user_id = res.locals.user.id;
	const focused_year = Number(req.query.year);
	const focused_month = Number(req.query.month);
	const focused_date = Number(req.query.date);
	//get a name of day. the day of the first date of the month.
	const init_day = getDateName(focused_year, focused_month, focused_date-focused_date+1);
	const last_date_of_month = new Date(focused_year, focused_month, 0).getDate();

	const index = [user_id, focused_year, focused_month, focused_date, init_day, last_date_of_month];

	let calendar_data = await get_every_diary_of_month(focused_year, focused_month, user_id);
	calendar_data = calendar_data[0];

	//sorting by order
	const sorting_field = "created_date";
	calendar_data.sort(function(a, b){
		return a[sorting_field] - b[sorting_field];
	});

	const missing_filler = {
		created_date: `기록이 없어요 :(`,
		content: ``,
		question: `기록이 없어요 :(`,
	}

	for(var i=0; i<last_date_of_month; i++){
		if(calendar_data[i] == undefined){				//if there is not enough data, it should return undefined before the loop finished. 
			calendar_data.splice(i, 0, missing_filler);
			continue;
		}
		if(calendar_data[i].created_date.getDate().toString() != i+1){
			calendar_data.splice(i, 0, missing_filler);
		}
	}

	//obj for ejs
	const db_obj_ejs = {
		index: index,
		calendar_data: calendar_data,
	}

	res.render('../views/diary/pickup_game_monthly', db_obj_ejs);
}

const write_monthly = (req, res) => {
	//const index = 1;
	const pickup_list = JSON.parse(req.body.pickup);

	//obj for ejs
	const obj_ejs = {
		//index: index,
		pickup_list: pickup_list,
	}
	res.render('../views/diary/write_monthly', obj_ejs);
}

const read_monthly = async (req, res) => {
	const user_id = res.locals.user.id;
	const index_year = req.query.year;
	const index_month = req.query.month;

	const today_index = [new Date().getFullYear(), new Date().getMonth()+1];
	const index = [user_id, index_year, index_month];

	let raw_db_obj = [];
	for(var i=0; i<12; i++){
		let temp = await db.query(`SELECT * FROM diary WHERE (user_id=?)
			AND (classes = 'm')
			AND (YEAR(created_date) = ${index_year})
			AND (MONTH(created_date) = ${i+1})
			`, [user_id]);
		
		if(temp[0][0] == undefined){
			temp[0][0] = {
				created_date: `기록이 없어요 :(`,
				content: ``,
				question: `기록이 없어요 :(`,
				forgot: true,
			}
		}
		raw_db_obj.push(temp[0][0]);
	}
	
	const key = '##@@##@@##';
//converting
	for(var i=0; i<raw_db_obj.length; i++){
		raw_db_obj[i].question = raw_db_obj[i].question.split(key);
		raw_db_obj[i].content = raw_db_obj[i].content.split(key);
	}

	const obj_ejs = {
		db_obj: raw_db_obj,
		index: index,
		today_index: today_index,
	}
	res.render('../views/diary/read_monthly', obj_ejs);
}

const daily_post = (req, res) => {
	const { question, content } = req.body;
	const classes = 'd';
	const created_date = new Date();
	const user_id = res.locals.user.id;
	const redirect_index = [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()];

	db.query(`INSERT INTO diary (classes, content, question, user_id, created_date) VALUES (?, ?, ?, ?, NOW())`, [classes, content, question, user_id]);

	//without first argument 307, redirect askes GET method. 307 make it POST method.
	res.redirect(307, `/diary/daily/${user_id}?year=${redirect_index[0]}&month=${redirect_index[1]}&date=${redirect_index[2]}`);
};

const monthly_post = (req, res) => {
	const key = '##@@##@@##';
	const classes = 'm';
	const created_date = new Date();
	const user_id = res.locals.user.id;

	const { titles, contents } = req.body;
	let str_titles = '';
	let str_contents = '';

	for(var i=0; i<titles.length; i++){
		str_titles += titles[i];
		if(i+1 != titles.length)
		str_titles += key;
	}
	for(var i=0; i<contents.length; i++){
		str_contents += contents[i];
		if(i+1 != contents.length)
		str_contents += key;
	}

	db.query(`INSERT INTO diary (classes, question, content, user_id, created_date) VALUES (?, ?, ?, ?, NOW())`, [classes, str_titles, str_contents, user_id]);
	
	const redirect_index = [new Date().getFullYear(), new Date().getMonth()+1];
	
	//without first argument 307, redirect askes GET method. 307 make it POST method.
	res.redirect(307, `/diary/read_monthly?year=${redirect_index[0]}&month=${redirect_index[1]}`);
};




//const annualy = (req, res) => {
//}
//
//const _delete = (req, res) => {
//}

module.exports = {
	dummy,

	read_and_write_daily, 
	daily_post,

	pickup_game_monthly,
	write_monthly,
	read_monthly,
	monthly_post,
}
