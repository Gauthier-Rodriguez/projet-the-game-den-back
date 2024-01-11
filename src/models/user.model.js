const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class User extends Model {}
User.init({
    Pseudo: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    LastName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    FirstName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Email: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    Password: {
      type: DataTypes.CHAR,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: "User"
});

module.exports = User;