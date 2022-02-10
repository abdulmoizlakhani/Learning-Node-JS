const mongodb = require("mongodb");
const getDb = require("../utils/database").getDb;

const { ObjectId } = mongodb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new ObjectId(id) : null;
    this.userId = userId;
  }

  // Save or Update Product
  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp;
  }

  // Fetch All Products
  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  }

  // Fetch Single Product
  static findById(productId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new ObjectId(productId) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  }

  // Delete Product
  static deleteById(productId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new ObjectId(productId) })
      .then((result) => {
        console.log("DELTED PRODUCT: ", result);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  }
}

module.exports = Product;
