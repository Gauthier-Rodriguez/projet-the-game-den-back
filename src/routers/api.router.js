const { Router } = require('express');
const apiController = require('../controllers/api.controller');
const { controllerWrapper } = require("./utils");


const apiRouter = Router();

apiRouter.get('/ext/platforms', controllerWrapper(apiController.getAllApiPlatforms));
apiRouter.get('/ext/genres', controllerWrapper(apiController.getAllApiGenres));
apiRouter.get('/ext/search', controllerWrapper(apiController.searchResults));
apiRouter.get('/ext/popular', controllerWrapper(apiController.getAllPopularGames));
apiRouter.get('/ext/game/:id', controllerWrapper(apiController.getGameDetails));
apiRouter.get('/ext/recommendations', controllerWrapper(apiController.getGamesReco));

module.exports = apiRouter;