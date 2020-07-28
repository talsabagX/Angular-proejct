let connection = require("./connection");

async function addOrder(order) {
    const sql = `INSERT INTO orders (user_id, cart_id, total_price, city, address, shipping_date,order_time,credit) Values (?,?,?,?,?,?,?,?)`;
    const parameters = [order.user_id, order.cart_id, order.total_price, order.city, order.address, order.shipping_date,order.order_time,order.credit];
    const info = await connection.executeWithParams(sql, parameters);
    return;
};


async function updateOrder(order) {
    const sql = "UPDATE orders SET user_id=?, cart_id=?, total_price=?, city=?, address=?, shipping_date=?, credit=? WHERE id=?";
    const parameters = [order.userId, order.cartId, order.totalPrice, order.city, order.address, order.shippingDate, order.credit, order.id];
    await connection.executeWithParams(sql, parameters);
    return;
};

// something dorin gave me but didnt use.
// supposed to be like join table.
async function getColumnValue(colName, tName, condition, id) {
    const sql = `select ${colName} from ${tName} where ${condition}=?`;
    const params = [id];
    const requestedValue = await connection.executeWithParams(sql, params);
    return requestedValue;
};


async function getAllOrders() {
    const sql = "SELECT * FROM orders";
    const response = await connection.execute(sql);
    return response;
};



async function getOrder(id) {
    const sql = "SELECT * FROM orders WHERE id=" + id;
    const response = await connection.execute(sql);
    return response;
};

//Get orders and status related to User, by Id.
async function getOrdersByUserId(id) {
    const sql = "select * from orders where user_id=?";
    const params = [id];
    const orderByUserId = await connection.executeWithParams(sql, params);
    return orderByUserId;
};

async function deleteOrder(id) {
    const sql = `DELETE FROM orders WHERE id = ?`;
    const parameters = [id];
    await connection.executeWithParams(sql, parameters);
    return;
};


module.exports = {
    addOrder,
    updateOrder,
    getAllOrders,
    getOrder,
    deleteOrder,
    getOrdersByUserId,
    getColumnValue,
};


