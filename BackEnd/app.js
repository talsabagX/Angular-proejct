const express = require("express");
const usersController = require("./controllerLayer/users-controller");
const productsController = require("./controllerLayer/products-controller");
const categoryController = require("./controllerLayer/category-controller");
const ordersController = require("./controllerLayer/orders-controller");
const cartItemController = require("./controllerLayer/cartItem-controller");
const cartController = require("./controllerLayer/cart-controller");
const loginFilter = require('./middleware/login-filter');
const errorHandler = require('./middleware/errors/error-handler');


const server = express();
server.use(loginFilter());

server.use(express.json());

server.use("/users", usersController);
server.use("/products", productsController);
server.use("/categories", categoryController);
server.use("/orders", ordersController);
server.use("/cartItem", cartItemController);
server.use("/cart", cartController);


server.use(errorHandler);

server.listen(3200, () => console.log("Listening on http://localhost:3200"));

