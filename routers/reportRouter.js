const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController.js');

router.post('/', reportController.reported);

module.exports = router;
