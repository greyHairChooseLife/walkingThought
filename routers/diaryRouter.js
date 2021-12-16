const express = require('express');
const diaryController = require('..//controllers/diaryController.js');
const diaryRouter = express.Router();

diaryRouter.post('/gen/:id', diaryController.dummy);

diaryRouter.post('/daily/:id', diaryController.read_and_write_daily);
diaryRouter.post('/daily/post/:id/', diaryController.post_daily);

diaryRouter.post('/pickup_game_monthly/:id', diaryController.pickup_game_monthly);
diaryRouter.post('/write_monthly', diaryController.write_monthly);
diaryRouter.post('/monthly/post', diaryController.post_monthly);
diaryRouter.post('/read_monthly', diaryController.read_monthly);


//diaryRouter.post('/annualy/:id', diaryController.annualy);
//diaryRouter.delete('/delete/:id', diaryCtrl.delete);

module.exports = diaryRouter;
