const db = require('../config/db.js').promise();

const post_bugs = (req, res) => {

	const user_id = res.locals.user.id;
	const body = req.body;

	db.query(`INSERT INTO bug_report (user_id, page_id, screen_size, content, created_date) VALUES (?, ?, ?, ?, NOW())`, [user_id, body.page_id, body.screen_size, body.reporting_content]);

	return res.redirect('/');
}

const get_betatest_survey = (req, res) => {

	return res.render('../views/public/betatest_survey1')

}
const post_betatest_survey = (req, res) => {

	const user_id = res.locals.user.id;
	const body = req.body;

	db.query(`INSERT INTO betatest_survey (created_date, user_id, q1, q2, q3, q4, q5, q6, q7, q8) VALUES (NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ? )`, [user_id, body.q1, body.q2, body.q3, body.q4, body.q5, body.q6, body.q7, body.q8]);
	
	alert('1차 설문조사가 완료되었습니다.');

	return res.redirect('/');
}

module.exports = {
	post_bugs,
	get_betatest_survey,
	post_betatest_survey,
};
