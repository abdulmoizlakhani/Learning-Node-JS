const { MongoClient } = require("mongodb");

const { DB_USER, DB_PASS } = process.env;

let _db;

const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@ecommerce-shop.4xzwy.mongodb.net/shop?retryWrites=true&w=majority`;

const mongoConnect = (callback) => {
  MongoClient.connect(DB_URL)
    .then((client) => {
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
