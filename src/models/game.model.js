const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class Game extends Model {}
Game.init({
    Name: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    Image: {
      type: DataTypes.CHAR,
      allowNull: false,
    }, 
    GameID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
   }, {
        sequelize,
        tableName: "Game"
});

module.exports = Game;