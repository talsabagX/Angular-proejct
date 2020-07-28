let connection = require("./connection");

async function addCart(id , start_time) {
    const sql = `INSERT INTO cart (user_id , start_time) Values (?,?)`;
    const parameters = [id , start_time];
    const response = await connection.executeWithParams(sql, parameters);
    return;
};


async function updateCart(cart) {
    const sql = "UPDATE cart SET user_id = ?, start_time = ? WHERE id = ?";
    const parameters = [cart.userId, cart.startTime, cart.id];
    await connection.executeWithParams(sql, parameters);
    return;
};

async function getAllCarts() {
    const sql = "SELECT * FROM cart";
    const getAllResult = await connection.execute(sql);
    return getAllResult;
};


async function getCartById(id) {
    const sql = "SELECT * FROM cart WHERE id=?";
    const parameters = [id]
    const response = await connection.executeWithParams(sql, parameters);
    return response;
};


async function getCartByUserId(id) {
    const sql = "SELECT * FROM cart WHERE user_id=?";
    const parameters = [id]
    const response = await connection.executeWithParams(sql, parameters);
    return response;
};

async function getUserOpenCartId(id) {
    let sql = "select id from cart where status='open' AND user_id=?"
    let parameters = id
    let cartId = await connection.executeWithParams(sql, parameters);
    // console.log(cartId)
    return cartId
}

// getUserOpenCartId(2)

// Cascadind Cart delete 
async function deleteCart(id) {
    let sql1 = "delete from cart_item where cart_id=?"
    let parameters1 = id
    await connection.executeWithParams(sql1, parameters1);

    let sql2 = "delete from orders where cart_id=?"
    let parameters2 = id
    await connection.executeWithParams(sql2, parameters2);

    let sql = "DELETE FROM cart where id=?"
    let parameters = id
    let deleteResponce = await connection.executeWithParams(sql, parameters);
    return deleteResponce
};

// function that close the status when order been made
async function closeCart(cartId) {
    let sql = "update cart set status='close' WHERE id=?"
    let parameters = cartId
    await connection.executeWithParams(sql, parameters);
}
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