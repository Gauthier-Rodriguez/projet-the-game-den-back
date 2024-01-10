const {Router} = require('express');
const verify = require('../middlewares/verify');
const userController = require('../controllers/user.controller');
const { controllerWrapper } = require("./utils");

const userRouter = Router();

userRouter.get('/login', controllerWrapper(verify, userController.isAuthenticated));
userRouter.post('/register', controllerWrapper(userController.createUser));
userRouter.post('/login', controllerWrapper(userController.loginUser));

userRouter.get('/users/:id', controllerWrapper(userController.getAllInfos));
userRouter.patch('/users/:id', controllerWrapper(userController.updateInfos));


module.exports = userRouter;