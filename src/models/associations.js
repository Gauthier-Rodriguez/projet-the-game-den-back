const User = require('./user.model');
const Game = require('./game.model');
const Platform = require('./platform.model');
const Genre = require('./genre.model');

User.belongsToMany(Platform, {
  as: "platforms",
  through: "UserHasPlatform", 
  foreignKey: "UserID",
  otherKey: "PlatformID"
});

Platform.belongsToMany(User, {
    as:"users",
    through: "UserHasPlatform",
    foreignKey: "PlatformID",
    otherKey: "UserID"
});

User.belongsToMany(Genre, {
  as: "genres", 
  through: "UserHasGenre",
  foreignKey: "UserID",
  otherKey: "GenreID"
});

Genre.belongsToMany(User, {
  as: "users",
  through: "UserHasGenre",
  foreignKey: "GenreID", 
  otherKey: "UserID"
});

User.belongsToMany(Game, {
  as: "games", 
  through: "UserHasGame",
  foreignKey: "UserID",
  otherKey: "GameID"
});

Game.belongsToMany( User, {
    as: "users",
    through: "UserHasGame",
    foreignKey: "GameID",
    otherKey: "UserID"
});

module.exports = {User, Platform, Game, Genre};