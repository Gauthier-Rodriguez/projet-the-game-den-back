const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class Platform extends Model {}
Platform.init({
    name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    },{
        sequelize,
        tablename: "Platform"
    });

module.exports = Platform;