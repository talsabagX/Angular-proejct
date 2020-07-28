let OrdersLogic = require("../logicLayer/Orders-logic");
const express = require("express");
const router = express.Router();
const mapUser = require("../middleware/map")
const cartLogic =require("../logicLayer/cart-logic")

//Create new Order
router.post("/", async (request, response, next) => {
    let token = request.headers.authorization
    let id = await mapUser.checkMapForUserId(token)
    let order = request.body;
    order.user_id = id
    order.order_time=new Date();
    if (order.city=="") {
        let userInfo = mapUser.getUserInfo(token)
        order.city = userInfo[0].city
        order.address = userInfo[0].address
    }
    try {
        await OrdersLogic.addOrder(order);
        response.status(200).json("Thanks for buying Shopping-App !")

    }  catch (error) {
        return next(error);
    } 
});




//Update Order 
router.put("/", async (request, response) => {
    let thisUserUpdateOrder = request.body;
    try {
        await OrdersLogic.updateOrder(thisUserUpdateOrder);
        response.json("Order successfully updated " + thisUserUpdateOrder)

    } catch (error) {
        response.status(404).send(error)
    }  
});

router.get("/amountOfOrders", async (request, response) => {
    try {
        let countOfOrders = await OrdersLogic.getCountAllOrders();
        response.json(countOfOrders);

    } catch (error) {
        response.status(404).json("No orders in database");
    }
});
router.get("/userLastOrder", async (request, response, next) => {
    let token = request.headers.authorization
    let id = mapUser.checkMapForUserId(token)

    try {
        let userOrder = await OrdersLogic.getOrdersByUserId(id);
        response.json(userOrder);

    }  catch (error) {
        return next(error);
    }
});
//Get all Orders 
router.get("/admin", async (request, response, next) => {
    try {
        let getOrders = await OrdersLogic.getAllOrders();
        response.status(200).send(getOrders);
        
    }  catch (error) {
        return next(error);
    }
});

router.get("/", async (request , response , next) => {
    try {
        let getOrdersByUser = await OrdersLogic.getOrdersByUserId(userId);
        response.status(200).send(getOrdersByUser);
        
    }  catch (error) {
        return next(error);
    }
});

// delete Order 
router.put("/" , async (request , response) =>{
    let id = +request.params.id
    try{
        await OrdersLogic.deleteOrder(id);
        response.status(200).send("Order has been deleted successfuly !");
    }
    catch(error){
        response.status(404).send(error);
    }
})


router.get("/all-orders" , async (request , response, next) =>{
    let token = request.headers.authorization
    let id = mapUser.checkMapForUserId(token)
    
    try{
       let order = await OrdersLogic.getOrdersByUserId(id);
        response.status(200).send(order);
    }
  catch (error) {
    return next(error);
}
})



// User delete 
router.put("/:id" , async (request , response) =>{
    let id = +request.params.id
    try{
        await OrdersLogic.deleteOrder(id);
        response.status(200).json("Order has been removed from our system successfuly");
    }
    catch(error){
        response.status(400).send(error);
    }
})


module.exports = router;
