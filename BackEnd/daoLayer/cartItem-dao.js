let connection = require("./connection");

async function addCartItem(cartItem) {
    const sql = `INSERT INTO cart_item ( product_id, amount ,total_price, cart_id , productName) Values (?,?,?,?,?)`;
    const parameters = [cartItem.productId, cartItem.amount, cartItem.totalPrice, cartItem.cartId , cartItem.productName];
    const newCartItem = await connection.executeWithParams(sql, parameters);
    // console.log(newCartItem);
    return;
};
// addCartItem({productId:2 , amount:2 , totalPrice:40 , cartId:2})

//join table that sends back the info about cart item and the product itself
async function getAllCartItemsById(cartId) {
    let sql = "SELECT cart_item.*, products.product_name,products.path"+
    " FROM cart_item"+
    " INNER JOIN products ON cart_item.product_id=products.id"+
    " where cart_item.cart_id=?"
    let parameters = cartId;
    cartItems = await connection.executeWithParameters(sql,parameters);
    return cartItems;
}

async function updateCartItem(item) {
    const sql = "UPDATE cart_item SET product_id=?,amount = ?, total_price = ?, cart_id = ? WHERE id = ?";
    const parameters = [item.productId,item.amount, item.totalPrice, item.cartId, item.id];
    await connection.executeWithParams(sql, parameters);
    return;
};


async function getAllCartItems() {
    const sql = "SELECT * FROM cart_item";
    const response = await connection.execute(sql);
    return response;
};


async function getCartItem(id) {
    const sql = "SELECT * FROM cart_item WHERE id=?";
    const parameters = [id];
    const response = await connection.executeWithParams(sql, parameters);
    return response;
};


async function deleteCartItem(id) {
    const sql = `DELETE FROM cart_item WHERE id=?`;
    const parameters = [id];
    await connection.executeWithParams(sql, parameters);
    return;
};

async function deleteAllCartItems(id) {
    const sql = `DELETE FROM cart_item WHERE cart_id=?`;
    const parameters = [id];
    await connection.executeWithParams(sql, parameters);
    return;
};

// getting the final sum of the cart each time a cartItem added to it
async function getTotalOrderSum(cartId) {
    let sql = "select sum(total_price) as sumTotal from cart_item where cart_id=?"
    let parameters = cartId
    let totalSum = await connection.executeWithParams(sql, parameters);
    return totalSum[0].sumTotal
}
module.exports = {
    addCartItem,
    updateCartItem,
    getAllCartItemsById,
    getAllCartItems,
    getCartItem,
    deleteCartItem,
    getTotalOrderSum,
    deleteAllCartItems
};