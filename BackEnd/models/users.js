const joi = require("joi")


class User {

    constructor(userName, password,name ,lastName) {
        this.userName = userName;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        
       
    };
    
    static validate(userToValidate) {
        const validationSchema = {
            userName: joi.string().required().regex(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/),
            password: joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,10})/),
            name: joi.string().required(),
            lastName: joi.string().required(),
            city: joi.string().optional(),
            address: joi.string().optional(),
            userType: joi.string().optional(),
            userId: joi.number().optional(),
        };

        const error = joi.validate(userToValidate, validationSchema, { abortEarly: false }).error;

        if (error) {
            return error.details.map(err => err.message);
        }
        return null;

    };

};

module.exports = User;