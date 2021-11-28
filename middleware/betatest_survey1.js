const db = require('../config/db.js').promise();

const is_surveyed = async (req, res, next) => {
	const user_id = res.locals.user.id;
	const data = await db.query(`SELECT id FROM betatest_survey where (user_id=?)`, [user_id]);

	console.log(data[0].id);
	if(data[0].id == undefined)
		return res.render('../views/public/betatest_survey1');


	next();
}

module.exports = is_surveyed;
