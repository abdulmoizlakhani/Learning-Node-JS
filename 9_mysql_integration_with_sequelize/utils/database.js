const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "ecommerce-node",
  password: "admin@123",
});

module.exports = pool.promise();
