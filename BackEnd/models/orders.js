const joi = require("joi");

class Order {

    constructor(userId, cartId, totalPrice, city, address, shippingDate,orderTime, credit) {
        this.userId = userId;
        this.cartId = cartId;
        this.totalPrice = totalPrice;
        this.city = city;
        this.address = address;
        this.shippingDate = shippingDate;
        this.orderTime = orderTime;
        this.credit = credit;
    };

    static validate(orderToValidate) {
        const validationSchema = {
            userId: joi.number().required(),
            cartId: joi.number().required(),
            totalPrice: joi.number().optional(),
            city: joi.string().required(),
            address: joi.string().required(),
            shippingDate: joi.string().required(),
            orderTime: joi.string().optional(),
            credit: joi.number().required(),
            id: joi.number().optional(),
        };

        const error = joi.validate(orderToValidate, validationSchema, { abortEarly: false }).error;

        if (error) {
            return error.details.map(err => err.message);
        }
        return null;

    };

};

module.exports = Order;