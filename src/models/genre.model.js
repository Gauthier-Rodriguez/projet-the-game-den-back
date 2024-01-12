const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class Genre extends Model {}
Genre.init({
    Name: {
        type: DataTypes.CHAR,
        allowNull: false
      },
    }, {
        sequelize,
        tableName: "Genre"
    });

module.exports = Genre;