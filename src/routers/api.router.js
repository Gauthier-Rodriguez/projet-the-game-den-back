const { Router } = require('express');
const apiController = require('../controllers/api.controller');
const { controllerWrapper } = require("./utils");


const apiRouter = Router();

//apiRouter.post('/ext/plaforms', controllerWrapper(apiController.getAllPlatforms));

//module.exports = favGameRouter;