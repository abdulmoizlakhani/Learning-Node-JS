const Product = require("../models/Product");

exports.getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editMode: false,
  });
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  req.user
    .createProduct({
      title,
      imageUrl,
      price,
      description,
    })
    .then((result) => {
      console.log("Product Created!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
};

exports.getEditProduct = (req, res) => {
  const { edit } = req.query;

  if (!edit) {
    res.redirect("/");
  }

  const { productId } = req.params;

  req.user
    .getProducts({ where: { id: productId } })
    .then((products) => {
      const [product] = products;

      if (!product) {
        return res.redirect("/");
      }

      res.render("admin/edit-product", {
        docTitle: "Edit Product",
        path: "/admin/edit-product",
        editMode: edit,
        product,
      });
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
};

exports.postEditProduct = (req, res) => {
  const { productId, title, imageUrl, price, description } = req.body;
  Product.update(
    { title, imageUrl, price, description },
    { where: { id: productId } }
  )
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
};

exports.getProducts = (req, res) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/product-list", {
        products,
        docTitle: "All Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
};

exports.postDeleteProduct = (req, res) => {
  const { productId } = req.body;
  Product.destroy({ where: { id: productId } })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
};
