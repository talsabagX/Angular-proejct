const productsDao = require("../daoLayer/products-dao");
const validations = require("./validtations");
const ServerError = require("../middleware/errors/server-error")
const ErrorType = require("../middleware/errors/error-type")

async function addProduct(product) {
    // await validations.productValidtation(product);
    if (product == null || product.length == 0) {
        throw new ServerError(ErrorType.PRODUCT_NOT_VALID);
    }
    const productToAdd = await productsDao.addProduct(product);
    return productToAdd;
};
// working Function:
// addProduct({ name: "Blue-wine", price: 35, categoryId: 3 , path: "Blue-wine.jpg"});



async function getAllProducts() {
    const allProducts = await productsDao.getAllProducts();
    if(allProducts.length==0){
        throw new ServerError(ErrorType.PRODUCT_NOT_FOUND);
    }
    return allProducts;
};

// working function:
// getAllProducts();

async function getProduct(id) {
    await validations.isIntValid(productsDao.getProduct(id));
    if (id == null) {
        throw new ServerError(ErrorType.PRODUCT_NOT_FOUND);
    }
    const requestedProduct = await productsDao.getProduct(id);
    return requestedProduct;
};
// working function:
// getProduct(2);


async function updateProduct(product) {
 
    await validations.productValidtation(product);
    if (product == null || product.length == 0) {
        throw new ServerError(ErrorType.PRODUCT_NOT_VALID);
    }
    const productToUpdate = await productsDao.updateProduct(product);
    // return productToUpdate;
};
// working Function:
// updateProduct({ name: "Blue-wine", price: 45, categoryId: 3 , path: "Blue-wine.jpg" , id:7});

async function deleteProduct(id) {
    await validations.isIntValid(productsDao.getProduct(id));
    await productsDao.deleteProduct(id);
};

// working function:
// deleteProduct(7);

module.exports = {
    addProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};