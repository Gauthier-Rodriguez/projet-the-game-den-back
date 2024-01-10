const { Router } = require('express');
const gameController = ('../controllers/game.controller');
const { controllerWrapper } = require("./utils");


const favGameRouter = Router();

favGameRouter.get('./users/:id/games', controllerWrapper(gameController.getAllGames));
favGameRouter.post('/users/:id/games', controllerWrapper(gameController.createGame));
favGameRouter.patch('./users/:id/games', controllerWrapper(gameController.UpdateGame));
favGameRouter.delete('./users/:id/games', controllerWrapper(gameController.DeleteGame));




module.exports = favGameRouter;