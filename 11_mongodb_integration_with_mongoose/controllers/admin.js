const Product = require("../models/Product");

exports.getAddProduct = (req, res) => {
  res.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    editMode: false,
  });
};

exports.postAddProduct = (req, res) => {
  const { title, price, description, imageUrl } = req.body;

  const product = new Product({
    title,
    price,
    description,
    imageUrl,
    userId: req.user,
  });

  product
    .save()
    .then((result) => {
      console.log("result", result);
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

  Product.findById(productId)
    .then((product) => {
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

  Product.findById(productId)
    .then((product) => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;

      return product.save();
    })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
};

exports.getProducts = (req, res) => {
  Product.find()
    // .select("title price -_id")
    // .populate("userId", "name")
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
  Product.findByIdAndRemove(productId)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
};
