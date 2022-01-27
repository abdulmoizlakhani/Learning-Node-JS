const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
  },
  { sequelize, modelName: "Order" }
);

module.exports = Order;
