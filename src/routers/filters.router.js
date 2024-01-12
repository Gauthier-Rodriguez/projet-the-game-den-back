const { Router } = require('express');
const { controllerWrapper } = require("./utils");
const platformController = require('../controllers/platform.controller');
const genreController = require('../controllers/genre.controller');
const userController = require('../controllers/user.controller');



const filterRouter = Router();

filterRouter.get('/users/:id/genre', controllerWrapper(userController.getAllInfos));
filterRouter.post('/users/:id/genre', controllerWrapper(genreController.addGenreToUser));
filterRouter.delete('/users/:id/genre', controllerWrapper(genreController.deleteGenreToUser));

filterRouter.get('/users/:id/platform', controllerWrapper(userController.getAllInfos));
filterRouter.post('/users/:id/platform', controllerWrapper(platformController.addPlatformToUser));
filterRouter.delete('/users/:id/platform', controllerWrapper(platformController.deletePlatformToUser));

filterRouter.get('/genre', controllerWrapper(genreController.getAllGenres));
filterRouter.get('/platform', controllerWrapper(platformController.getAllPlatforms));

module.exports = filterRouter;