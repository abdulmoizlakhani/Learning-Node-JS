const Product = require("../models/Product");

exports.getAddProduct = (req, res) => {
  res.render("admin/add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render("admin/product-list", {
      products,
      docTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
