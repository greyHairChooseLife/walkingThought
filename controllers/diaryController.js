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

function getDateName(year, month, day, type){
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

	if(type == 'number')
		return answer;

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
}

const read_and_write_daily = async (req, res) => {

	const user_id = res.locals.user.id;
	const focused_year = Number(req.query.year);
	const focused_month = Number(req.query.month);
	const focused_date = Number(req.query.date);

	const focused_index = [focused_year, focused_month, focused_date];
	const today_index = [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()];

	let is_written;
	let checker = await get_daily_diary(today_index[0], today_index[1], today_index[2], user_id);

	if(checker[0][0] != undefined)
		is_written = true;
	else
		is_written = false;


	let db_obj = [];
	for(var j=0; j<3; j++){
		let temp = await get_daily_diary(focused_year-j, focused_month, focused_date, user_id);
		if(temp[0][0] == undefined){
			temp[0][0] = {
				created_date: null,
				content: ``,
				question: `기록이 없어요 :(`,

			}
		}
		db_obj.push(temp[0][0]);
	}
//사람이 읽기 편한게 날짜 표시방식을 바꿔준다.
	function convert_date(original) {
		if(original == null)
			return null;
		let converted = [];
		converted[0] = original.getFullYear();
		converted[1] = original.getMonth() + 1;
		converted[2] = original.getDate();
		converted[3] = original.getDay();
		if(converted[3] == 0)
			converted[3] = "일요일";
		else if(converted[3] == 1)
			converted[3] = "월요일";
		else if(converted[3] == 2)
			converted[3] = "화요일";
		else if(converted[3] == 3)
			converted[3] = "수요일";
		else if(converted[3] == 4)
			converted[3] = "목요일";
		else if(converted[3] == 5)
			converted[3] = "금요일";
		else if(converted[3] == 6)
			converted[3] = "토요일";
		return converted;
	}
	function call_converted_date(converted_date) {
		if(converted_date == null)
			return '';
		return converted_date[0]+'. '+converted_date[1]+'. '+converted_date[2]+'. '+converted_date[3];
	}

	let writing_board_index;
	function get_writing_board_index(focused_index, today_index) {
		if(focused_index[1] != today_index[1]){
			writing_board_index = null;
			return;
		}
		if(focused_index[2] != today_index[2]){
			writing_board_index = null;
			return;
		}
		const year_gap = focused_index[0] - today_index[0];
		switch (year_gap) {
			case 0 :
				writing_board_index = 3;
				break;
			case 1 :
				writing_board_index = 2;
				break;
			case 2 :
				writing_board_index = 1;
				break;
			default :
				writing_board_index = null;
		}
	}
	get_writing_board_index(focused_index, today_index);
	
	const dates = [];
	dates[0] = focused_year + '. ' + focused_month + '. ' + focused_date + ' ' + getDateName(focused_year, focused_month, focused_date, 'string');
	dates[1] = (focused_year-1) + '. ' + focused_month + '. ' + focused_date + ' ' + getDateName(focused_year-1, focused_month, focused_date, 'string');
	dates[2] = (focused_year-2) + '. ' + focused_month + '. ' + focused_date + ' ' + getDateName(focused_year-2, focused_month, focused_date, 'string');

	const regex_for_decode = /<br>/g;
	const touched_content = [];
	touched_content[0] = db_obj[0].content.replace(regex_for_decode, '\n');	//bot
	touched_content[1] = db_obj[1].content.replace(regex_for_decode, '\n');	//mid
	touched_content[2] = db_obj[2].content.replace(regex_for_decode, '\n');	//top


	const db_obj_ejs = {
		top_date : call_converted_date(convert_date(db_obj[2].created_date)),
		mid_date : call_converted_date(convert_date(db_obj[1].created_date)),
		bot_date : call_converted_date(convert_date(db_obj[0].created_date)),
 		
		dates : dates,

		top_content : touched_content[2],
		mid_content : touched_content[1],
		bot_content : touched_content[0],

		top_question : db_obj[2].question,
		mid_question : db_obj[1].question,
		bot_question : db_obj[0].question,

		index_year: focused_year,
		index_month: focused_month,
		index_date: focused_date,
		user_id: user_id,
		today_index: today_index,
		is_written: is_written,
		writing_board_index: writing_board_index,
	}	

	res.render('../views/diary/daily', db_obj_ejs);
}

const pickup_game_monthly = async (req, res) => {

	const user_id = res.locals.user.id;
	const focused_year = Number(req.query.year);
	const focused_month = Number(req.query.month);
	const focused_date = Number(req.query.date);
	//get a name of day. the day of the first date of the month.
	const init_day = getDateName(focused_year, focused_month, focused_date-focused_date+1, 'number');
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
				created_date: ``,
				content: ``,
				question: `기록이 없어요 :(`,
				coment: ``,
			}
		}
		raw_db_obj.push(temp[0][0]);
	}
	
	const key = '##@@##@@##';
//converting
	for(var i=0; i<raw_db_obj.length; i++){
		raw_db_obj[i].question = raw_db_obj[i].question.split(key);
		raw_db_obj[i].content = raw_db_obj[i].content.split(key);
		raw_db_obj[i].coment = raw_db_obj[i].coment.split(key);
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
	const user_id = res.locals.user.id;
	const redirect_index = [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()];

	const regex_for_encode1 = /\r\n/g;	//ms-window
	//const regex_for_encode2 = /\n/g;	//unix
	//const regex_for_encode3 = /\r/g;	//mac

	const touched_content = content.replace(regex_for_encode1, '<br>');

	db.query(`INSERT INTO diary (classes, content, question, user_id, created_date) VALUES (?, ?, ?, ?, NOW())`, [classes, touched_content, question, user_id]);

	//without first argument 307, redirect askes GET method. 307 make it POST method.
	res.redirect(307, `/diary/daily/${user_id}?year=${redirect_index[0]}&month=${redirect_index[1]}&date=${redirect_index[2]}`);
};

const monthly_post = (req, res) => {
	const key = '##@@##@@##';
	const classes = 'm';
	const user_id = res.locals.user.id;

	const { titles, contents, coments } = req.body;

	let str_titles = '';
	let str_contents = '';
	let str_coments = '';

	// 같은 name을 통해 받은 input data가 여럿이라면 배열로 받는다. 그런데 단 하나라면 string으로 받는다. 따라서 req.body로 가져온 input data의 length를 활용하고 싶다면, 가져온 데이터의 타입이 배열인지 문자열인지 확인하는 과정이 반드시 필요하다.
	if(Array.isArray(titles) == false)
		str_titles = titles;
	else{
		for(var i=0; i<titles.length; i++){
			//str_titles += '☞ ' + titles[i];     apply this act at reading section
			str_titles += '☞ ' + titles[i];
			if(i+1 != titles.length)
			str_titles += key;
		}
	}

	if(Array.isArray(contents) == false)
		str_contents = contents;
	else{
		for(var i=0; i<contents.length; i++){
			str_contents += contents[i];
			if(i+1 != contents.length)
			str_contents += key;
		}
	}

	if(Array.isArray(coments) == false)
		str_coments = coments;
	else{
		for(var i=0; i<coments.length; i++){
			str_coments += coments[i];
			if(i+1 != coments.length)
			str_coments += key;
		}
	}

	db.query(`INSERT INTO diary (classes, question, content, coment, user_id, created_date) VALUES (?, ?, ?, ?, ?, NOW())`, [classes, str_titles, str_contents, str_coments, user_id]);
	
	const redirect_index = [new Date().getFullYear(), new Date().getMonth()+1];
	
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
