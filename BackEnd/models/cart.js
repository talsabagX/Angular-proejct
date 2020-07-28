const joi = require("joi");

class Cart {

    constructor(userId) {
        this.userId= userId;
    };

    static validate(cartToValidate) {
        const validationSchema = {
            userId: joi.number().required(),
            startTime: joi.string().optional(),
            id: joi.number().optional(),
        };

        const error = joi.validate(cartToValidate, validationSchema, { abortEarly: false }).error;

        if (error) {
            return error.details.map(err => err.message);
        }
        return null;

    };

};

module.exports = Cart;