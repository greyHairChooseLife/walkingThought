const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController.js');

router.post('/bugs', reportController.bugs);
router.post('/betatest_survey', reportController.betatest_survey);

module.exports = router;
