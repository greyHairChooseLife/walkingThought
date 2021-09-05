const express = require('express');
const diaryController = require('..//controllers/diaryController.js');
const diaryRouter = express.Router();

diaryRouter.post('/gen/:id', diaryController.dummy);


diaryRouter.post('/daily/:id', diaryController.daily);
diaryRouter.post('/monthly/:id', diaryController.monthly);



diaryRouter.post('/monthly_mode_B/:id', diaryController.monthly_mode_B);
//diaryRouter.post('/annualy/:id', diaryController.annualy);
//diaryRouter.delete('/delete/:id', diaryCtrl.delete);

module.exports = diaryRouter;
