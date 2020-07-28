let connection = require("./connection");

async function addProduct(product) {
    const sql = `INSERT INTO products (product_name, category_id, price, path) Values (?,?,?,?)`;
    const parameters = [product.product_name, product.category_id, product.price, product.path];
    const newProduct = await connection.executeWithParams(sql, parameters);
    return (newProduct);
};


async function updateProduct(product) {

    const sql = "UPDATE products SET product_name=?, price=?, path=? WHERE id=?";
    const parameters = [product.product_name, product.price, product.path, product.id];
    await connection.executeWithParams(sql, parameters);
    console.log("Changes : " + product.id);
    return;
};
// updateProduct({name:"Red onion" , price:10 , path:"abc.jpg" , id:1})

async function getAllProducts() {
    const sql = "SELECT * FROM products";
    const resonse = await connection.execute(sql);
    return resonse;
};


async function getProduct(id) {
    const sql = "SELECT * FROM products WHERE id=?";
    const parameters = id;
    const response = await connection.executeWithParams(sql, parameters);
    return response;
};

//join tabel between Products and Category
async function getAllProductsCategory(id) {
    const sql = "SELECT products.id, products.product_name, products.price, products.path, category.name" +
        "FROM products P Join category C on C.id = P.category_id WHERE C.id =?"
    const parameters = [id];
    const response = await connection.executeWithParams(sql, parameters);
    return response;
}


async function deleteProduct(id) {
    const sql = `DELETE FROM products WHERE id = ?`;
    const parameters = [id];
    await connection.executeWithParams(sql, parameters);
    console.log("Product number: " + id + " has been deleted");
    return;
};


module.exports = {
    addProduct,
    updateProduct,
    getAllProducts,
    getProduct,
    getAllProductsCategory,
    deleteProduct
};