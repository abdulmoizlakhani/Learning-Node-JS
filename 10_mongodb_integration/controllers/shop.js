const Product = require("../models/Product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
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
  Product.fetchAll()
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
  let products = [];

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((prod) => {
      products = prod;
      return req.user.createOrder();
    })
    .then((order) => {
      const updatedProducts = products.map((product) => {
        product.OrderItem = { quantity: product.CartItem.quantity };
        return product;
      });
      return order.addProducts(updatedProducts);
    })
    .then(() => {
      return fetchedCart.setProducts(null);
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["Products"] })
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
    .getCart()
    .then((products) => {
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
