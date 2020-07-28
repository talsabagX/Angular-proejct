let connection = require("./connection");

async function addCategory(category) {
    const sql = `INSERT INTO category ( name ) Values (?)`;
    const parameters = [category.categoryName];
    const newCategory = await connection.executeWithParams(sql, parameters);

};


async function updateCategory(category) {
    const sql = "UPDATE category SET name=? WHERE id=?";
    const parameters = [category.categoryName, category.id];
    await connection.executeWithParams(sql, parameters);
    return;
};


async function getAllCategories() {
    const sql = "SELECT * FROM category";
    const response = await connection.execute(sql);
    return response;
};


async function getCategory(id) {
    const sql = "SELECT * FROM category WHERE id=?";
    const parameters = [id];
    const response = await connection.executeWithParams(sql, parameters);
    return response;
};

// join table of category and products
async function getAllProductsCategory(id) {
    let sql = "select p.product_name ,p.price ,p.path ,p.id  ,c.name from category c join products p on p.category_id=c.id where c.id=?"
    let parameters = id
    let products = await connection.executeWithParams(sql, parameters);
    return products
}
// getAllProductsCategory(7)

// cascading Category delete
async function deleteCategory(id) {
    const params = [id];

    const sql = "delete from products where category_id=?";
    await connection.executeWithParams(sql, params);
    
    const sql1 = "delete from category where id=?";
    await connection.executeWithParams(sql1, params);
};



module.exports = {
    addCategory,
    updateCategory,
    getAllCategories,
    getCategory,
    deleteCategory,
    getAllProductsCategory
};