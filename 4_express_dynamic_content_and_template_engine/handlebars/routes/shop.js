const express = require("express");

const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  const { products } = adminData;
  res.render("shop", {
    products,
    docTitle: "My Shop",
    path: "/",
    hasProducts: !!products.length,
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;
