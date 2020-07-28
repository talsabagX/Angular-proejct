const joi = require("joi");

class Product {

    constructor(name, price, categoryId, path) {
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
        this.path = path;
    };

    static validate(productToValidate) {
        const validationSchema = {
            name: joi.string().required(),
            price: joi.number().required(),
            categoryId: joi.number().required(),
            path: joi.string().optional(),
            id: joi.number().optional(),
        };

        const error = joi.validate(productToValidate, validationSchema, { abortEarly: false }).error;

        if (error) {
            return error.details.map(err => err.message);
        }
        return null;

    };

};

module.exports = Product;