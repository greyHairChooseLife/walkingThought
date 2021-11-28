const db = require('../config/db.js').promise();

const bugs = (req, res) => {

	const user_id = res.locals.user.id;
	const body = req.body;

	db.query(`INSERT INTO bug_report (user_id, page_id, screen_size, content, created_date) VALUES (?, ?, ?, ?, NOW())`, [user_id, body.page_id, body.screen_size, body.reporting_content]);

	return res.redirect('/');
}

const betatest_survey = (req, res) => {

	const user_id = res.locals.user.id;
	const body = req.body;

	db.query(`INSERT INTO betatest_survey (user_id, created_date, ) VALUES (?, NOW(), )`, [user_id, body.subject]);
	
	alert('1차 설문조사가 완료되었습니다.');

	return res.redirect('/');
}

module.exports = {
	bugs,
	betatest_survey,
};
