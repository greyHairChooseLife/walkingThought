const db = require('../config/db.js').promise();

const is_surveyed = async (req, res, next) => {
	const user_id = res.locals.user.id;
	const [data] = await db.query(`SELECT id FROM betatest_survey2 where (user_id=?)`, [user_id]);

	console.log(data[0]);
	if(data[0] == undefined)
		return res.render('../views/public/betatest_survey2');


	next();
}

module.exports = is_surveyed;
