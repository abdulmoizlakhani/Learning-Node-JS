// const mongodb = require("mongodb");
// const getDb = require("../utils/database").getDb;

// const { ObjectId } = mongodb;
// class User {
//   constructor(fullName, email, cart, id) {
//     this.fullName = fullName;
//     this.email = email;
//     this.cart = cart;
//     this._id = id ? new ObjectId(id) : null;
//   }

//   // Save or Update User
//   save() {
//     const db = getDb();
//     let dbOp;

//     if (this._id) {
//       dbOp = db
//         .collection("users")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection("users").insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         console.log("RESULT: ", result);
//       })
//       .catch((err) => {
//         console.log("ERR: ", err);
//       });
//   }

//   // Add Product to Cart
//   addToCart(product) {
//     let cartProductIndex = -1;

//     if (this.cart?.items?.length) {
//       cartProductIndex = this.cart.items.findIndex(
//         (cp) => cp.productId.toString() === product._id.toString()
//       );
//     }

//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductIndex !== -1) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         productId: new ObjectId(product._id),
//         quantity: newQuantity,
//       });
//     }

//     const updatedCart = {
//       items: updatedCartItems,
//     };

//     const db = getDb();
//     return db
//       .collection("users")
//       .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
//   }

//   // Get Cart
//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map((item) => item.productId);

//     return db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         return products.map((product) => {
//           return {
//             ...product,
//             quantity: this.cart.items.find((item) => {
//               return item.productId.toString() === product._id.toString();
//             }).quantity,
//           };
//         });
//       })
//       .catch((err) => {
//         console.log("ERROR: ", err);
//       });
//   }

//   // Remove Product from Cart
//   removeProductFromCart(productId) {
//     const db = getDb();
//     const updatedCart = this.cart.items.filter(
//       (item) => item.productId.toString() !== productId
//     );

//     return db
//       .collection("users")
//       .updateOne({ _id: this._id }, { $set: { cart: { items: updatedCart } } });
//   }

//   // Add Order
//   addOrder() {
//     const db = getDb();

//     return this.getCart()
//       .then((products) => {
//         const newOrder = {
//           items: products,
//           user: {
//             _id: this._id,
//             fullName: this.fullName,
//           },
//         };
//         return db.collection("orders").insertOne(newOrder);
//       })
//       .then((result) => {
//         this.cart = { items: [] };

//         return db
//           .collection("users")
//           .updateOne({ _id: this._id }, { $set: { cart: { items: [] } } });
//       })
//       .catch((err) => {
//         console.log("ERROR: ", err);
//       });
//   }

//   // Get Orders
//   getOrders() {
//     const db = getDb();
//     return db.collection("orders").find({ "user._id": this._id }).toArray();
//   }

//   // Find User by ID
//   static findById(userId) {
//     const db = getDb();
//     return db.collection("users").findOne({ _id: new ObjectId(userId) });
//   }
// }

// module.exports = User;
