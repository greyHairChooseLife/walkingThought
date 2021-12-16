const db = require('../config/db.js').promise();
const diaryModel = require('../models/diaryModel.js');
//generate dummy data
const gen = require('../tester/test_data_generater.js');

//test data maker
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

//날짜별 요일 이름 말해주는 기능. 이런 공통 메소드는 나중에 밖으로 빼야 한다.
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
	const focused_index = [Number(req.query.year), Number(req.query.month), Number(req.query.date)];
	//시작일의 요일을 알아야 달력을 그릴 수 있다.
	const init_day = getDateName(focused_index[0], focused_index[1], focused_index[2]-focused_index[2]+1, 'number');
	//마지막 날짜를 알아야 총 몇일인지 알 수 있다.
	const last_date_of_month = new Date(focused_index[0], focused_index[1], 0).getDate();

	const index = [user_id, focused_index[0], focused_index[1], focused_index[2], init_day, last_date_of_month];

	let calendar_data;
	if(focused_index[2] < 4){		//익월 1, 2, 3일은 지난달 일기 쓸 차례
		calendar_data = await diaryModel.get_dailys_of_month(focused_index[0], focused_index[1]-1, user_id, last_date_of_month);
	}else{							//1, 2, 3일이 아니라면 그냥 이달의 월간생각 쓰는 것
		calendar_data = await diaryModel.get_dailys_of_month(focused_index[0], focused_index[1]-0, user_id, last_date_of_month);
	}

	const obj_ejs = {
		user_id: user_id,
		calender_index: [init_day, last_date_of_month],
		focused_index: focused_index,

		index: index,
		calendar_data: calendar_data,
	}

	res.render('../views/diary/monthly/pickup_game_monthly', obj_ejs);
}

const write_monthly = (req, res) => {
	const pickup_list = JSON.parse(req.body.pickup);

	const obj_ejs = {
		pickup_list: pickup_list,
	}
	res.render('../views/diary/monthly/write_monthly', obj_ejs);
}

const read_monthly = async (req, res) => {
	const user_id = res.locals.user.id;
	const today_index = [new Date().getFullYear(), new Date().getMonth()+1];
	const focused_index = [req.query.year, req.query.month]; 

	let diarys = [];
	for(var i=1; i<=12; i++){
		diarys.push(await diaryModel.get_monthly(focused_index[0], i, user_id));
	}
	
	//post_monthly에서 합쳐 놓은 것들 도로 쪼개기
	const key = '##@@##@@##';
	for(var i=0; i<diarys.length; i++){
		diarys[i].question = diarys[i].question.split(key);
		diarys[i].content = diarys[i].content.split(key);
		diarys[i].coment = diarys[i].coment.split(key);
	}

	//줄바꿈 변환
	const regex_for_decode = /<br>/g;
	for(var i=0; i<diarys.length; i++){
		for(var j=0; j<diarys[i].question.length; j++){
			diarys[i].question[j] = diarys[i].question[j].replace(regex_for_decode, '\n');
			diarys[i].content[j] = diarys[i].content[j].replace(regex_for_decode, '\n');
			diarys[i].coment[j] = diarys[i].coment[j].replace(regex_for_decode, '\n');
		}
	}

	const obj_ejs = {
		user_id: user_id,
		today_index: today_index,
		focused_index: focused_index,
		diarys: diarys,
	}
	res.render('../views/diary/monthly/read_monthly', obj_ejs);
}

const post_daily = (req, res) => {
	const { question, content, writing_datetime } = req.body;
	const user_id = res.locals.user.id;
	const redirect_index = [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()];

	diaryModel.post_daily(user_id, question, content, writing_datetime);

	//without first argument 307, redirect askes GET method. 307 make it POST method.
	res.redirect(307, `/diary/daily/${user_id}?year=${redirect_index[0]}&month=${redirect_index[1]}&date=${redirect_index[2]}`);
};

const post_monthly = (req, res) => {
	const { titles, contents, coments } = req.body;
	const user_id = res.locals.user.id;
	//1, 2, 3일 중에 쓴 월간일기는 지난달의 월간일기다.
	let redirect_index;
	if(new Date().getDate() <= 3)
		redirect_index = [new Date().getFullYear(), new Date().getMonth()];
	else
		redirect_index = [new Date().getFullYear(), new Date().getMonth()+1];

	diaryModel.post_monthly(user_id, titles, contents, coments);
	
	res.redirect(307, `/diary/read_monthly?year=${redirect_index[0]}&month=${redirect_index[1]}`);
};

//const annualy = (req, res) => {
//}
//
//const _delete = (req, res) => {
//}

module.exports = {
	dummy,

	read_and_write_daily,	//DAY

	pickup_game_monthly,	//MONTH
	write_monthly,			//MONTH
	read_monthly,			//MONTH

	post_daily,
	post_monthly,
}
