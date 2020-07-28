const cartItemsDao = require("../daoLayer/cartItem-dao");
const validations = require("./validtations");
const cartDao = require("../daoLayer/cart-dao")
const productDao = require("../daoLayer/products-dao")
const ServerError = require("../middleware/errors/server-error")
const ErrorType = require("../middleware/errors/error-type")



// for adding cart item we need to get the open cart of the user 
// which i allow only once at a time 
// and after that we need details from the product itself like mini join table for the clinet side only
async function addCartItem(cartItem, id) {
    let cartId = await cartDao.getUserOpenCartId(id)
    let productPrice = await productDao.getProduct(cartItem.productId)
    cartItem.productName = productPrice[0].product_name
    cartItem.totalPrice = await productPrice[0].price * cartItem.amount
    cartItem.cartId = cartId[0].id
    if (cartItem == null || cartItem.length == 0) {
        throw new ServerError(ErrorType.MISSING_CART_DETAILS);
    }
    await cartItemsDao.addCartItem(cartItem)
    return cartItem
}
// working fucntion:
// addCartItem({productId:2 , amount:2 , totalPrice:40 , cartId:2})

async function updateCartItem(cartItem) {
    await validations.cartItemtValidation(cartItem);
    const cartItemToUpdate = await cartItemsDao.updateCartItem(cartItem);
    return cartItemToUpdate;
};

// working fucntion:
// updateCartItem({productId:1,amount:15 , totalPrice:75 , cartId:1 , id:1})

async function getAllCartItems(cartId){
    const allCartItems = await cartItemsDao.getAllCartItems(cartId);
    return allCartItems;
};
// working function:
// getAllCartItems(24)

async function getCartItem(id) {
    await validations.isIntValid(cartItemsDao.getCartItem(id));
    const requestedCart = await cartItemsDao.getCartItem(id);
    return requestedCart;
};
// working function:
// getCartItem(2);

async function deleteAllCartItems(id){
    if (id == null) {
        throw new ServerError(ErrorType.MISSING_CART_ID);
    }
    await cartItemsDao.deleteAllCartItems(id);
    console.log("Cart items deleted successfully.");
}

async function deleteCartItem(id) {
    if (id == null) {
        throw new ServerError(ErrorType.MISSING_CART_ITEM_ID);
    }
    await cartItemsDao.deleteCartItem(id);
    console.log("Cart items deleted successfully.");
};
// working function:
// deleteCartItem(7);

async function getTotalOrderSum(id) {
    let cartId = await cartDao.getUserOpenCartId(id)
    let totalSum = await cartItemsDao.getTotalOrderSum(cartId[0].id)

    return totalSum
}
// working function:
// getTotalOrderSum(12)
module.exports = {
    addCartItem,
    updateCartItem,
    getAllCartItems,
    getCartItem,
    deleteCartItem,
    getTotalOrderSum,
    deleteAllCartItems
};