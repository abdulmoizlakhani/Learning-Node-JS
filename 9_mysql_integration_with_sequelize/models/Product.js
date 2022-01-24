const db = require("../utils/database");
const Cart = require("./Cart");

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const { title, description, price, imageUrl } = this;
    return db.execute(
      "INSERT INTO products (title, description, price, imageUrl) VALUES (?, ?, ?, ?)",
      [title, description, price, imageUrl]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
};
