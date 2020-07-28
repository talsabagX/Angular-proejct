const cartsDao = require("../daoLayer/cart-dao");
const validations = require("./validtations");

async function addCart(id) { 
    if (id == null) {
        throw new ServerError(ErrorType.MISSING_CART_DETAILS);
    }
    const start_time = new Date()
    const cartToAdd = await cartsDao.addCart(id , start_time);
    // cart.id = cart.insertId;
    return cartToAdd;
};
// working function:
// addCart(24);

async function getUserOpenCartId(id) {
    // await validations.isIntValid(cartsDao.getCartById(id));
        let cartId = await cartsDao.getUserOpenCartId(id);
        // console.log(cartId)
    return cartId;
}
// working function: 
// getUserOpenCartId(2);

async function updateCart(cart) {
    await validations.cartValidation(cart);
    const cartToUpdate = await cartsDao.updateCart(cart);
    return cartToUpdate;
};
// working fucntion:
// updateCart({userId:2, startTime:"01/04/2020" ,id:5})

async function getAllCarts() {
    const allCarts = await cartsDao.getAllCarts();
    await validations.isValid(allCarts);
    return allCarts;
};
// working function:
// getAllCarts()


async function getCartById(id) {
    await validations.isIntValid(cartsDao.getCart(id));
    const requestedCart = await cartsDao.getCart(id);
    return requestedCart;
};
// working function:
// getCart(2)

async function getCartByUserId(userId) {
    await validations.isIntValid(cartsDao.getCartByUserId(userId));
    const cartByUserId = await cartsDao.getCartByUserId(userId);
    // console.log(cartByUserId)
    return cartByUserId;
};
// working function:
// getCartByUserId(2)

async function deleteCart(id) {
    await validations.isIntValid(cartsDao.getCartById(id));
    await cartsDao.deleteCart(id);
    console.log("Cart deleted successfully.");
};
// working function:
// deleteCart(4);

async function closeCart(id) {
    await validations.isIntValid(cartsDao.getCartById(id));
    const closeCart = await cartsDao.closeCart(id);
    return closeCart;
};

module.exports = {
    addCart,
    updateCart,
    getAllCarts,
    getCartById,
    getCartByUserId,
    deleteCart,
    getUserOpenCartId,
    closeCart,
};