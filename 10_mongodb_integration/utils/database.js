const { MongoClient } = require("mongodb");

const { DB_USER, DB_PASS } = process.env;

const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@ecommerce-shop.4xzwy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const mongoConnect = (callback) => {
  MongoClient.connect(DB_URL)
    .then((client) => {
      callback(client);
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
};

module.exports = mongoConnect;
