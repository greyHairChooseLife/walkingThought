const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController.js');

router.post('/bugs', reportController.post_bugs);
router.post('/betatest_survey', reportController.post_betatest_survey);

module.exports = router;
