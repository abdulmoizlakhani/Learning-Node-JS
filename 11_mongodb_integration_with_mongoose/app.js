const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
// const User = require("./models/User");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findById("61f960a81169156dd8fa24d3")
//     .then((user) => {
//       const { _id, fullName, email, cart } = user;
//       req.user = new User(fullName, email, cart, _id);
//       next();
//     })
//     .catch((err) => {
//       console.log("ERR: ", err);
//     });
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

const { DB_USER, DB_PASS } = process.env;
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@ecommerce-shop.4xzwy.mongodb.net/shop?retryWrites=true&w=majority`;

mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log("ERR: ", err);
  });
