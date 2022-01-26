const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  { sequelize, modelName: "User" }
);

module.exports = User;
