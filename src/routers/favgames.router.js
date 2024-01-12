const { Router } = require('express');
const gameController = require('../controllers/game.controller');
const { controllerWrapper } = require("./utils");


const favGameRouter = Router();

favGameRouter.get('/users/:id/games', controllerWrapper(gameController.getAllGames));
favGameRouter.post('/users/:id/games', controllerWrapper(gameController.addGameToUser));
favGameRouter.delete('/users/:id/games', controllerWrapper(gameController.deleteGame));

module.exports = favGameRouter;