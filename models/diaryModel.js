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

module.exports = {
	get_daily,
	get_monthly,

};
