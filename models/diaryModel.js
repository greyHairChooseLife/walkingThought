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

module.exports = {
	get_daily,
	get_monthly,
	get_dailys_of_month,

};
