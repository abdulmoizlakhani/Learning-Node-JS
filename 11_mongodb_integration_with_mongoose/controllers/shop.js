const Product = require("../models/Product");
const Order = require("../models/Order");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        products,
        docTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then((product) => {
      res.render("shop/product-details", {
        product,
        docTitle: product?.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        products,
        docTitle: "My Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      console.log("USER", user);
      const products = user.cart.items.map((item) => ({
        quantity: item.quantity,
        product: { ...item.productId._doc },
      }));
      const order = new Order({
        user: {
          fullName: req.user.fullName,
          userId: req.user,
        },
        products,
      });
      return order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        docTitle: "My Orders",
        path: "/orders",
        orders,
      });
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        docTitle: "My Cart",
        path: "/cart",
        products,
      });
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;

  Product.findById(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body;

  req.user
    .removeProductFromCart(productId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/checkout",
  });
};
