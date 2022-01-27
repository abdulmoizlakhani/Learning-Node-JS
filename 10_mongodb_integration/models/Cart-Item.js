const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

class CartItem extends Model {}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    quantity: DataTypes.INTEGER.UNSIGNED,
  },
  { sequelize, modelName: "CartItem" }
);

module.exports = CartItem;
