const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class User extends Model {}
User.init({
    Pseudo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    LastName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    FistName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: "User"
});

module.exports = User;