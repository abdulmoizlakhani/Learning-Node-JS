const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("<h1 style='color: red;'>Abdul Moiz Lakhani!</h1>");
});

module.exports = router;
