const mongodb = require("mongodb");
const getDb = require("../utils/database").getDb;

const { ObjectId } = mongodb;

class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new ObjectId(id) : null;
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
    return dbOp
      .then((result) => {
        console.log("RESULT: ", result);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  }

  // Fetch All Products
  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log("PRODUCTS: ", products);
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
        console.log("PRODUCT: ", product);
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
