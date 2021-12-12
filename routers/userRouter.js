const express = require('express');
const userController = require('../controllers/userController.js');
const userRouter = express.Router();

userRouter.post('/register', userController.post_register);
userRouter.get('/setting', userController.get_setting);
userRouter.post('/setting', userController.post_setting);

userRouter.post('/login', userController.post_login);

userRouter.post('/agreement', userController.post_agreement);

userRouter.post('/logout', userController.post_logout);
userRouter.post('/delete', userController.post_delete);


module.exports = userRouter;
