const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class Game extends Model {}
Game.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    image: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
   }, {
        sequelize,
        tablename: "Game"
});

module.exports = Game;