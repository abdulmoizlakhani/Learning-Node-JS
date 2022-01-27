const path = require("path");
const express = require("express");
require("dotenv").config();

// const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const mongoConnect = require("./utils/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// app.use("/admin", adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404Page);

mongoConnect((client) => {
  console.log("CLIENT: ", client);
  app.listen(4000);
});
