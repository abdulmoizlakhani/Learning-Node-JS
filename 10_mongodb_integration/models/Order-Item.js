const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

class OrderItem extends Model {}

OrderItem.init(
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
  { sequelize, modelName: "OrderItem" }
);

module.exports = OrderItem;
