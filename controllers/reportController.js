const db = require('../config/db.js').promise();

const reported = (req, res) => {

	const user_id = res.locals.user.id;
	const body = req.body;

	db.query(`INSERT INTO bug_report (user_id, page_id, screen_size, content, created_date) VALUES (?, ?, ?, ?, NOW())`, [user_id, body.page_id, body.screen_size, body.reporting_content]);

	return res.redirect('/');


}

module.exports = {
	reported,
};
