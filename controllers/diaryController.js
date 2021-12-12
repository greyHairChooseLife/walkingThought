const db = require('../config/db.js').promise();
const diaryModel = require('../models/diaryModel.js');
//generate dummy data
const gen = require('../tester/test_data_generater.js');

const dummy = (req, res) => {
	gen.gen(req, res);
	res.send('data settled');
}

//날짜 오버플로우 대응
function modify_overflow_dates(y, m, d){
	if(d === 0){
		m = m-1;
		d = new Date(y, m, d).getDate();
	}
	if(m === 0){
		y = y-1;
		m = 12;
	}
	return {y, m, d};
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
	const focused_index = [Number(req.query.year), Number(req.query.month), Number(req.query.date)]; 
	const today_index = [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()];

	//표시할 3년치 다이어리 가져오기
	const diary_obj = {_top:'', _mid:'', _bot:''};
	const modified_index = modify_overflow_dates(focused_index[0], focused_index[1], focused_index[2]);
	diary_obj['_top'] = await diaryModel.get_daily(modified_index.y-2, modified_index.m, modified_index.d, user_id)
	diary_obj['_mid'] = await diaryModel.get_daily(modified_index.y-1, modified_index.m, modified_index.d, user_id)
	diary_obj['_bot'] = await diaryModel.get_daily(modified_index.y-0, modified_index.m, modified_index.d, user_id)

	//오늘 일기 썼는지 안썼지 체크
	let is_written;
	let checker = await diaryModel.get_daily(today_index[0], today_index[1], today_index[2], user_id)
	if(checker.created_date == null)
		is_written = false;
	else
		is_written = true;

	//오늘의 일기 에디터 위치 선정
	let writing_board_index = null;
	function get_writing_board_index(focused_index, today_index) {
		if(focused_index[1] != today_index[1]){
			return null;
		}
		if(focused_index[2] != today_index[2]){
			return null;
		}
		const year_gap = focused_index[0] - today_index[0];
		switch (year_gap) {
			case 0 :
				return 3;
			case 1 :
				return 2;
			case 2 :
				return 1;
			default :
				return null;
		}
	}
	if(is_written == false){
		writing_board_index = get_writing_board_index(focused_index, today_index);
	}
	
	//읽기 쉬운 날짜 생성
	const dates = [];
	dates[0] = (focused_index[0] -0) + '. ' + focused_index[1] + '. ' + focused_index[2] + ' ' + getDateName(focused_index[0]-0, focused_index[1], focused_index[2], 'string');
	dates[1] = (focused_index[0] -1) + '. ' + focused_index[1] + '. ' + focused_index[2] + ' ' + getDateName(focused_index[0]-1, focused_index[1], focused_index[2], 'string');
	dates[2] = (focused_index[0] -2) + '. ' + focused_index[1] + '. ' + focused_index[2] + ' ' + getDateName(focused_index[0]-2, focused_index[1], focused_index[2], 'string');

	//db에서 가져온 데이터에 줄바꿈 적용
	const regex_operator = /<br>/g;
	diary_obj['_top'].content = diary_obj['_top'].content.replace(regex_operator, '\n');
	diary_obj['_mid'].content = diary_obj['_mid'].content.replace(regex_operator, '\n');
	diary_obj['_bot'].content = diary_obj['_bot'].content.replace(regex_operator, '\n');
	diary_obj['_top'].question = diary_obj['_top'].question.replace(regex_operator, '\n');
	diary_obj['_mid'].question = diary_obj['_mid'].question.replace(regex_operator, '\n');
	diary_obj['_bot'].question = diary_obj['_bot'].question.replace(regex_operator, '\n');

	const obj_ejs = {
		index_year: focused_index[0],
		index_month: focused_index[1],
		index_date: focused_index[2],

		user_id: user_id,
		today_index: today_index,
		is_written: is_written,
		writing_board_index: writing_board_index,

		dates : dates,
		top_content : diary_obj['_top'].content,
		mid_content : diary_obj['_mid'].content,
		bot_content : diary_obj['_bot'].content,
		top_question : diary_obj['_top'].question,
		mid_question : diary_obj['_mid'].question,
		bot_question : diary_obj['_bot'].question,
	}	

	res.render('../views/diary/daily/daily', obj_ejs);
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

	let calendar_data;
	if(focused_date < 4){
		calendar_data = await get_every_diary_of_month(focused_year, focused_month-1, user_id);
	}else{
		calendar_data = await get_every_diary_of_month(focused_year, focused_month, user_id);
	}
	calendar_data = await get_every_diary_of_month(focused_year, focused_month-1, user_id);		// 이번달만 이렇게 운영하고, 다음 월간일기부터는 이 줄 삭제
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

	res.render('../views/diary/monthly/pickup_game_monthly', db_obj_ejs);
}

const write_monthly = (req, res) => {
	//const index = 1;
	const pickup_list = JSON.parse(req.body.pickup);

	//obj for ejs
	const obj_ejs = {
		//index: index,
		pickup_list: pickup_list,
	}
	res.render('../views/diary/monthly/write_monthly', obj_ejs);
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
		raw_db_obj[i].coment = raw_db_obj[i].coment.split(key);
	}

	const regex_for_decode = /<br>/g;

	for(var i=0; i<raw_db_obj.length; i++){
		for(var j=0; j<raw_db_obj[i].question.length; j++){
			raw_db_obj[i].question[j] = raw_db_obj[i].question[j].replace(regex_for_decode, '\n');
			raw_db_obj[i].content[j] = raw_db_obj[i].content[j].replace(regex_for_decode, '\n');
			raw_db_obj[i].coment[j] = raw_db_obj[i].coment[j].replace(regex_for_decode, '\n');
		}
	}

	const obj_ejs = {
		db_obj: raw_db_obj,
		index: index,
		today_index: today_index,
	}
	res.render('../views/diary/monthly/read_monthly', obj_ejs);
}

const daily_post = (req, res) => {
	const { question, content, writing_datetime } = req.body;
	const classes = 'd';
	const user_id = res.locals.user.id;
	const redirect_index = [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()];

	const regex_for_encode1 = /\r\n/g;	//ms-window
	//const regex_for_encode2 = /\n/g;	//unix
	//const regex_for_encode3 = /\r/g;	//mac

	const touched_content = content.replace(regex_for_encode1, '<br>');
	const touched_question = question.replace(regex_for_encode1, '<br>');

	db.query(`INSERT INTO diary (classes, content, question, user_id, created_date) VALUES (?, ?, ?, ?, ?)`, [classes, touched_content, touched_question, user_id, writing_datetime]);

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
			str_titles += titles[i];
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

	const regex_for_encode1 = /\r\n/g;	//ms-window
	//const regex_for_encode2 = /\n/g;	//unix
	//const regex_for_encode3 = /\r/g;	//mac

	const touched_str_titles = str_titles.replace(regex_for_encode1, '<br>');
	const touched_str_contents = str_contents.replace(regex_for_encode1, '<br>');
	const touched_str_coments = str_coments.replace(regex_for_encode1, '<br>');

	//now로 하면 익월 1,2,3일에 쓴 것은 밀려서 기록된다. 이거 1,2,3일일 경우엔 전월로 기록되도록 수정해야한다.
	db.query(`INSERT INTO diary (classes, question, content, coment, user_id, created_date) VALUES (?, ?, ?, ?, ?, NOW())`, [classes, touched_str_titles, touched_str_contents, touched_str_coments, user_id]);
	
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
