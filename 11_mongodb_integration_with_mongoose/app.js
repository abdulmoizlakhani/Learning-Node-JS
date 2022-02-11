const path = require("path");
const express = require("express");
require("dotenv").config();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const mongoConnect = require("./utils/database").mongoConnect;
const User = require("./models/User");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("61f960a81169156dd8fa24d3")
    .then((user) => {
      const { _id, fullName, email, cart } = user;
      req.user = new User(fullName, email, cart, _id);
      next();
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

mongoConnect(() => {
  app.listen(4000);
});
