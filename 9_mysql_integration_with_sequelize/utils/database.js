const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ecommerce-node", "root", "admin@123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
