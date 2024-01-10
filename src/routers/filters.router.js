const {Router} = require('express');
const { controllerWrapper } = require("./utils");
const platformController = require('../controllers/platform.controller');
const genreController = require('../controllers/genre.controller');

const filterRouter = Router();

filterRouter.get('./users/:id/genre', controllerWrapper(genreController.getAllUserGenres));
filterRouter.post('./users/:id/genre', controllerWrapper(genreController.createGenre));
filterRouter.patch('./users/:id/genre', controllerWrapper(genreController.updateGenre));
filterRouter.delete('./users/:id/genre', controllerWrapper(genreController.deleteGenre));

filterRouter.get('./users/:id/platform', controllerWrapper(platformController.getAllUserPlatforms));
filterRouter.post('./users/:id/platform', controllerWrapper(platformController.createPlatform));
filterRouter.patch('./users/:id/platform', controllerWrapper(platformController.updatePlatform));
filterRouter.delete('./users/:id/platform', controllerWrapper(platformController.deletePlatform));

filterRouter.get('./genre', controllerWrapper(genreController.getAllGenres));
filterRouter.get('./platform', controllerWrapper(platformController.getAllPlatforms));

module.exports = filterRouter;