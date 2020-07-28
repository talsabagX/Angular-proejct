const User = require("../models/users");
const Order = require("../models/orders");
const Product = require("../models/product");
const Cart = require("../models/cart")
const CartItem = require("../models/cart-item");
const Category = require("../models/category");

// Validate the object's length:
async function isValid(object) {
    if (object.length === 0) {
        throw new Error("No existing match in Data base. (users_logic)");
    };
};
async function categoryValidation(category) {
    const errorDetails = Category.validate(category);
    if (errorDetails) {
        throw new Error("Invalid category details (logic)");
    };
    return;
    // return category;
};
// User to validate:
async function userValidation(user) {
    const errorDetails = User.validate(user);
    if (errorDetails) {
        throw new Error("Invalid details .(users_logic)");
    };
};

// Is int valid: works
async function isIntValid(moduleName) {
    const intToValidate = await moduleName;
    if (intToValidate.length === 0) {
        throw new Error("No existing match in data base. (purchases_logic)");
    };
    return;
};

async function cartItemtValidation(item) {
    const errorDetails = CartItem.validate(item);
    if (errorDetails) {
        throw new Error("Invalid item details (logic)");
    };
    return;
};
// Item to validate:
async function productValidtation(product) {
    const errorDetails = Product.validate(product);
    if (errorDetails) {
        throw new Error("Invalid item details (items_logic)");
    };
};

// isIntValid(usersDao.getUserId(1));


// Cart to validate:
async function cartValidation(cart) {
    const errorDetails = Cart.validate(cart);
    if (errorDetails) {
        throw new Error("Invalid cart details (carts_logic)");
    };
};
async function orderValidation(order) {
    const errorDetails = Order.validate(order);
    if (errorDetails) {
        throw new Error("Invalid purchase details (logic)");
    };
};
async function cartValidation(id) {
    const errorDetails = Cart.validate(id);
    if (errorDetails) {
        throw new Error("Invalid cart details (logic)");
    };
};


module.exports = {
    isValid,
    userValidation,
    isIntValid,
   orderValidation,
    productValidtation,
    cartValidation,
    cartItemtValidation,
    categoryValidation,
};