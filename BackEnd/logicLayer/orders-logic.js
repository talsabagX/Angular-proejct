const ordersDao = require("../daoLayer/orders-dao");
const validations = require("./validtations");
const cartDao =require("../daoLayer/cart-dao")
const ServerError = require("../middleware/errors/server-error")
const ErrorType = require("../middleware/errors/error-type")

async function addOrder(order) {
    let cartId = await cartDao.getUserOpenCartId(order.user_id)
    order.cart_id = cartId[0].id
    // await validations.orderValidation(order)
    if (order == null || order.length == 0) {
        throw new ServerError(ErrorType.MISSING_ORDER_DETAILS);
    }
    await ordersDao.addOrder(order)
    await cartDao.closeCart(order.cart_id)


}



//working function : 
// addOrder({userId:12 , cartId:2 , totalPrice:50 , city:"Yerhuam" , address:"Neve-Emek" , shippingDate:"03/31/2020",orderTime:"16:30",credit:4567})

async function getAllOrders() {
    const allOrders = await ordersDao.getAllOrders();
    await validations.isValid(allOrders);
    return allOrders;
};
// working Function: 
// getAllOrders()

async function getOrder(id) {
    await validations.isIntValid(ordersDao.getOrder(id));
    const requestedOrder = await ordersDao.getOrder(id);
    return requestedOrder;
};
// Working Function: 
// getOrder(3)

async function getOrdersByUserId(id) {
    if (id == null) {
        throw new ServerError(ErrorType.USER_HAVE_NO_ORDER);
    }
    const oredrByUserId = await ordersDao.getOrdersByUserId(id)
    return oredrByUserId;
    
};
// Working Function:
// getOrdersByUserId(2)

async function updateOrder(order) {
    await validations.cartValidation(order);
    const orderToUpdate = await ordersDao.updateOrder(order);
    return orderToUpdate;
};
// working function:
// updateOrder({userId:12 , cartId:2 , totalPrice:35 , city:"Netivot" , address:"Neve-Emek" , shippingDate:"03/27/2020", orderTime:"16:30",credit:4567 ,id:3})

async function deleteOrder(id) {
    const orderToDelete = await validations.isIntValid(ordersDao.getOrder(id));
    await ordersDao.deleteOrder(id);
    return console.log("Purchase deleted successfully: " + orderToDelete);
};

// working Function:
// deleteOrder(3)


// counting all orders 
// somthing i took from Gil but never used.
async function getCountAllOrders() {
    let orders = await ordersDao.getAllOrders();

    let countOfOrders = 0
    for (let index = 0; index < orders.length; index++) {
        countOfOrders++
    }

    return countOfOrders;
}
module.exports = {
    addOrder,
    getAllOrders,
    getOrder,
    updateOrder,
    deleteOrder,
    getOrdersByUserId,
    getCountAllOrders
};