const Product = require("../models/Product");

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  Product.findByPk(productId)
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
  Product.findAll()
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
    .then((cart) => {
      return cart.getProducts();
    })
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
  let fetchedCart;
  let productQty = 1;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length) {
        product = products[0];
      }
      if (product) {
        const { quantity } = product.CartItem;
        productQty = quantity + 1;
        return product;
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: {
          quantity: productQty,
        },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const [product] = products;
      return product.CartItem.destroy();
    })
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
