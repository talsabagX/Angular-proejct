const joi = require("joi");

class CartItem {

    constructor(productId, amount, totalPrice, cartId) {
        this.productId = productId;
        this.amount = amount;
        this.totalPrice = totalPrice;
        this.cartId = cartId;
    };

    static validate(cartItemToValidate) {
        const validationSchema = {
            productId: joi.number().required(),
            amount: joi.number().required(),
            totalPrice: joi.number().optional(),
            cartId: joi.number().required(),
            id: joi.number().optional(),

        };

        const error = joi.validate(cartItemToValidate, validationSchema, { abortEarly: false }).error;

        if (error) {
            return error.details.map(err => err.message);
        }
        return null;

    };

};

module.exports = CartItem;