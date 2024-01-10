const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class Game extends Model {}
Game.init({
    name: {
        type: DataTypes.CHAR,
        allowNull: false
      },
    image: {
        type: DataTypes.CHAR,
        allowNull: false,
    },
   }, {
        sequelize,
        tablename: "Game"
});

module.exports = Game;