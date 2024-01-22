const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class Genre extends Model {}
Genre.init({
    Name: {
        type: DataTypes.CHAR,
        allowNull: false
      },
        GenreID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        tableName: "Genre"
    });

module.exports = Genre;