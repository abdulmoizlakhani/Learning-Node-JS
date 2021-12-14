const express = require("express");

const app = express();

const PORT = 4000;

app.use("/", (req, res) => {
  console.log("App running on PORT: ", PORT);
  res.send("<h1 style='color: red;'>Abdul Moiz Lakhani!</h1>");
});

app.listen(PORT);
