const Product = require("../models/Product");
const Cart = require("../models/Cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      products,
      docTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId, (product) => {
    res.render("shop/product-details", {
      product,
      docTitle: product?.title,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      products,
      docTitle: "My Shop",
      path: "/",
    });
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    docTitle: "My Orders",
    path: "/orders",
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    docTitle: "My Cart",
    path: "/cart",
  });
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect("/cart");
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/checkout",
  });
};
