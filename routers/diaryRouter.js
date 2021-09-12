const express = require('express');
const diaryController = require('..//controllers/diaryController.js');
const diaryRouter = express.Router();

diaryRouter.post('/gen/:id', diaryController.dummy);

//read
diaryRouter.post('/daily/:id', diaryController.daily);
diaryRouter.post('/monthly/:id', diaryController.monthly);

//write
diaryRouter.post('/daily/post/:id/', diaryController.daily_post);
diaryRouter.post('/monthly/post/:id/', diaryController.monthly_post);



//diaryRouter.post('/annualy/:id', diaryController.annualy);
//diaryRouter.delete('/delete/:id', diaryCtrl.delete);

module.exports = diaryRouter;
