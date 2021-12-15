const express = require("express");

const router = express.Router();

const formTemplate = `
  <form action="/admin/add-product" method="POST">
    <input type="text" name="title" />
    <button type="submit">Add Product</button>
  </form>
`;

router.get("/add-product", (req, res) => {
  console.log("Adding a Product!");
  res.send(formTemplate);
});

router.post("/add-product", (req, res) => {
  console.log("BODY: ", req.body);
  res.redirect("/");
});

module.exports = router;
