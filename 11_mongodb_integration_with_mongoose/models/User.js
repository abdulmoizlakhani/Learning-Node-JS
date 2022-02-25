const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,

          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

// Add Product to Cart
userSchema.methods.addToCart = function (product) {
  let cartProductIndex = -1;

  if (this.cart?.items?.length) {
    cartProductIndex = this.cart.items.findIndex(
      (cp) => cp.productId.toString() === product._id.toString()
    );
  }

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex !== -1) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  const updatedCart = {
    items: updatedCartItems,
  };

  this.cart = updatedCart;

  return this.save();
};

// Remove Product from Cart
userSchema.methods.removeProductFromCart = function (productId) {
  const updatedCart = this.cart.items.filter(
    (item) => item.productId.toString() !== productId
  );
  this.cart.items = updatedCart;
  return this.save();
};

// Add Order
userSchema.methods.addOrder = function () {
  const db = getDb();

  return this.getCart()
    .then((products) => {
      const newOrder = {
        items: products,
        user: {
          _id: this._id,
          fullName: this.fullName,
        },
      };
      return db.collection("orders").insertOne(newOrder);
    })
    .then((result) => {
      this.cart = { items: [] };

      return db
        .collection("users")
        .updateOne({ _id: this._id }, { $set: { cart: { items: [] } } });
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });
};

// Clear Cart
userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
