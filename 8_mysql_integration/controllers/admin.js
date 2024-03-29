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
  const product = new Product(null, title, imageUrl, price, description);
  product
    .save()
    .then(() => {
      res.redirect("/");
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

  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/edit-product", {
      docTitle: "Edit Product",
      path: "/admin/edit-product",
      editMode: edit,
      product,
    });
  });
};

exports.postEditProduct = (req, res) => {
  const { productId, title, imageUrl, price, description } = req.body;
  const updatedProduct = new Product(
    productId,
    title,
    imageUrl,
    price,
    description
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.getProducts = (req, res) => {
  Product.fetchAll()
    .then((response) => {
      const [products] = response;
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
  Product.deleteById(productId);
  res.redirect("/admin/products");
};
