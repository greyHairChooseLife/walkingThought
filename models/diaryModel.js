const db = require('../config/db.js').promise();

const get_daily = async (y, m, d, user_id) => {
	const [result] = await db.query(`SELECT created_date, content, question FROM diary WHERE (user_id=?)
		AND (classes = 'd')
		AND (YEAR(created_date) = ${y})
		AND (MONTH(created_date) = ${m}) 
		AND (DAY(created_date) = ${d})
		`, [user_id]);

	//result[0] return undefined when there is no data with those conditions
	if(result[0] == undefined){
		return {
			created_date: null,
			content: ``,
			question: `기록이 없어요 :(`,
		}
	}else{
		return {
			created_date: result[0].created_date,
			content: result[0].content,
			question: result[0].question,
		}
	}
}

const get_monthly = async (y, m, user_id) => {
	const [result] = await db.query(`SELECT created_date, content, question, coment FROM diary WHERE (user_id=?)
		AND (classes = 'm')
		AND (YEAR(created_date) = ${y})
		AND (MONTH(created_date) = ${m}) 
		`, [user_id]);

	//result[0] return undefined when there is no data with those conditions
	if(result[0] == undefined){
		return {
			created_date: ``,
			content: ``,
			question: `기록이 없어요 :(`,
			coment: ``,
			is_written: false,
		}
	}else{
		return {
			created_date: result[0].created_date,
			content: result[0].content,
			question: result[0].question,

			created_date: result[0].created_date,
			content: result[0].content,
			question: result[0].question,
			coment: result[0].coment,
			is_written: true,
		}
	}
}

const get_dailys_of_month = async (y, m, user_id, last_date_of_month) => {
	//return db.query(`SELECT created_date, content, question FROM diary WHERE (user_id=?)
	const [result] = await db.query(`SELECT created_date, content, question FROM diary WHERE (user_id=?)
		AND (classes = 'd')
		AND (YEAR(created_date) = ${y})
		AND (MONTH(created_date) = ${m}) 
		`, [user_id]);

	//날짜순 정렬. 가끔 뒤죽박죽이더라
	result.sort(function(a, b){
		return a['created_date'] - b['created_date'];
	});

	const empty_filler = {
		created_date: `...`,
		content: ``,
		question: `기록이 없어요 :(`,
	}

	for(var i=0; i<last_date_of_month; i++){
		if(result[i] == undefined){				//if there is not enough data, it should return undefined before the loop finished. 
			result.splice(i, 0, empty_filler);
			continue;
		}
//		if(result[i].created_date.getDate().toString() != i+1){			//LEGACY code: Is toString() necessary?
		if(result[i].created_date.getDate() != i+1){					//it seems not so.
			result.splice(i, 0, empty_filler);
		}
	}
	return result;
}

const post_daily = (user_id, question, content, writing_datetime) => {
	const classes = 'd';
	const regex_for_encode1 = /\r\n/g;	//ms-window
	//const regex_for_encode2 = /\n/g;	//unix
	//const regex_for_encode3 = /\r/g;	//mac

	//'줄바꿈 문자'를 정규표현식으로 읽어서 하이퍼텍스트로 바꾸어 준다. db에 저장하려면 이렇게 바꿨다가 읽어올 대 다시 decode해줘야한다.
	const touched_content = content.replace(regex_for_encode1, '<br>');
	const touched_question = question.replace(regex_for_encode1, '<br>');

	db.query(`INSERT INTO diary (classes, content, question, user_id, created_date) VALUES (?, ?, ?, ?, ?)`, [classes, touched_content, touched_question, user_id, writing_datetime]);
}

const post_monthly = (user_id, titles, contents, coments) => {
	const classes = 'm';
	//titles, contents, coments는 같은 name으로 받은 2개 이상의 값일 수 있다. db에 넣을 땐 하나의 칼럼에 들어가야 하니까 이 key값으로 구분(encode)하여 저장하고, 나중에 이 key값을 이용하여 분리(decode)하면 된다.
	const key = '##@@##@@##';

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

	if(new Date().getDate() <= 3)	//1,2,3 일의 경우엔 지난달에 쓴 일기로 기록
		db.query(`INSERT INTO diary (classes, question, content, coment, user_id, created_date) VALUES (?, ?, ?, ?, ?, date_add(NOW(), interval -1 month))`, [classes, touched_str_titles, touched_str_contents, touched_str_coments, user_id]);
	else
		db.query(`INSERT INTO diary (classes, question, content, coment, user_id, created_date) VALUES (?, ?, ?, ?, ?, NOW())`, [classes, touched_str_titles, touched_str_contents, touched_str_coments, user_id]);
	return;
}

module.exports = {
	get_daily,
	get_monthly,
	get_dailys_of_month,
	post_daily,
	post_monthly,

};
