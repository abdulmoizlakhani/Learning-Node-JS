const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const User = require("./models/User");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("620676c31dca8998f679bc0b")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

const { DB_USER, DB_PASS } = process.env;
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@ecommerce-shop.4xzwy.mongodb.net/shop?retryWrites=true&w=majority`;

mongoose
  .connect(DB_URL)
  .then(() => {
    return User.findOne();
  })
  .then((user) => {
    if (!user) {
      const user = new User({
        fullName: "Abdul Moiz Lakhani",
        email: "lakhaniabdulmoiz@gmail.com",
        cart: { items: [] },
      });
      user.save();
    }
    app.listen(4000);
  })
  .catch((err) => {
    console.log("ERR: ", err);
  });
