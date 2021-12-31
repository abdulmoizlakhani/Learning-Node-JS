const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");

const dataPath = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, price) {
    // Fetch the previous Cart
    fs.readFile(dataPath, (err, fileContent) => {
      let cart = { products: [], totolPrice: 0 };

      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // Analyze the Cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];

      // Add new product / increase quantity
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products.push(updatedProduct);
      }
      cart.totolPrice += +price;
      fs.writeFile(dataPath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
