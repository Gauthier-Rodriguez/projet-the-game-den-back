const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class Platform extends Model {}
Platform.init({
    Name: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    PlatformID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
        sequelize,
        tableName: "Platform"
    });
    
    module.exports = Platform;