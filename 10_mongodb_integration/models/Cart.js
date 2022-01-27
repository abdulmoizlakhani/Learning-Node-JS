const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

class Cart extends Model {}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
  },
  { sequelize, modelName: "Cart" }
);

module.exports = Cart;
