const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class Genre extends Model {}
Genre.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    },{
        sequelize,
        tablename: "Genre"
    });

module.exports = Genre;