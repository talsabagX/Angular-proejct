let ErrorType = {
    
    GENERAL_ERROR : {id: 1, httpCode: 600, message : "A big fuck up which we'll never tell you of had just happend. And now : A big fat lie....'A general error ....'", isShowStackTrace: true},
    USER_NAME_ALREADY_EXIST : {id: 2, httpCode: 601, message : "User name already exist", isShowStackTrace: false},
    UNAUTHORIZED : {id: 3, httpCode: 401, message : "Login failed, invalid user name or password", isShowStackTrace: false},
    PRODUCT_NOT_VALID : {id:4 , httpCode:603 , message : "Product is invalid" , isShowStackTrace:false},
    PRODUCT_NOT_FOUND : {id:5 ,  httpCode:605 , message : "No products in DB" , isShowStackTrace:false},
    ORDER_NOT_VALID : {id:6, httpCode:604 , message : "Order is invalid" , isShowStackTrace:false},
    MISSING_ORDER_DETAILS: {id:7 , httpCode:606 , message: "Order details are missing" , isShowStackTrace:false},
    USER_HAVE_NO_ORDER : {id:8 , httpCode:607 , message:"This user got no orders" , isShowStackTrace:false},
    NO_CATEGORIES_IN_DB:{id:9,httpCode:608 , message:"There are no categories" , isShowStackTrace:false},
    MISSING_CART_DETAILS: {id:10 , httpCode:609, message: "Cart details are missing" , isShowStackTrace:false},
    MISSING_CART_ID : {id:11 , httpCode:610 , message:"No such cart in DB" , isShowStackTrace:false},
    MISSING_CART_ITEM_ID : {id:12 , httpCode:611 , message:"No such cart item in DB" , isShowStackTrace:false},
    



}

module.exports = ErrorType;