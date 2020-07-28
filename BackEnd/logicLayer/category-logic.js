const categoriesDao = require("../daoLayer/category-dao");
const validations = require("./validtations");
const ServerError = require("../middleware/errors/server-error")
const ErrorType = require("../middleware/errors/error-type")
// not useable but works
async function addCategory(category) {
    await validations.categoryValidation(category);
    const categoryToAdd = categoriesDao.addCategory(category);
    category.id = category.insertId;
    return categoryToAdd;
};
// working function:
// addCategory({categoryName:"Fruits"})


async function getAllCategories() {
    const allCategories = await categoriesDao.getAllCategories();
    if (allCategories == null || allCategories.length == 0) {
        throw new ServerError(ErrorType.NO_CATEGORIES_IN_DB);
    }
    return allCategories;
};
// working function:
// getAllCategories()


async function getAllProductsCategory(id) {
    await validations.isValid(id);
    const allItemsByCategory = await categoriesDao.getAllProductsCategory(id);
    if (allItemsByCategory == null || allItemsByCategory.length == 0) {
        throw new ServerError(ErrorType.NO_CATEGORIES_IN_DB);
    }
    return allItemsByCategory;
};
// working function:
// getAllProductsCategory(7);

async function getCategory(id) {
    await validations.isIntValid(categoriesDao.getCategory(id));
    const requestedCategory = await categoriesDao.getCategory(id);
    if (requestedCategory == null || requestedCategory.length == 0) {
        throw new ServerError(ErrorType.NO_CATEGORIES_IN_DB);
    }
    return requestedCategory;
};
// working fucntion:
// getCategory(2)

async function updateCategory(category) {
    await validations.categoryValidation(category);
    const categoryToUpdate = await categoriesDao.updateCategory(category);
    return categoryToUpdate;
};
// working function:
// updateCategory({categoryName:"vegtebales", id:2})

async function deleteCategory(id) {
    await validations.isIntValid(categoriesDao.getCategory(id));
    await categoriesDao.deleteCategory(id);
};
// working function:
// deletes anything that connected to it
// deleteCategory(3)


module.exports = {
    addCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
    getAllProductsCategory,
};