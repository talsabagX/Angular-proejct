let cartItemLogic = require("../logicLayer/cartItem-logic");
const express = require("express");
const router = express.Router();
const mapUser = require("../middleware/map")
let cartLogic = require("../logicLayer/cart-logic")

//add new cart item
router.post("/", async (request, response , next) => {
    let cartItem = request.body;
    let token = request.headers.authorization
    let id = mapUser.checkMapForUserId(token)
    try {
        await cartItemLogic.addCartItem(cartItem, id)
        response.status(200).json("item was added")

    }
    catch (error) {
      return next(error);
  }
})

router.get("/totalOrderSum", async (request, response, next) => {
    let token = request.headers.authorization
    let id = mapUser.checkMapForUserId(token)
    try {
        let sumTotal = await cartItemLogic.getTotalOrderSum(id)
        response.status(200).json(sumTotal)
    }
    catch (error) {
      return next(error);
  }
})
// Update item
router.put("/", async (request, response) => {
    let updateCartItem = request.body;
    try {
        await cartItemLogic.updateCartItem(updateCartItem);
        response.status(200).send("Item successfully updated in the cart" + updateCartItem)
    }
        catch (error) {
            return next(error);
        } 
});


router.get("/", async (request, response) => {
    
    try {
        let getCartItems = await cartItemLogic.getCartItem(id);
        response.status(200).send(getCartItems);
        
    } catch (error) {
        response.status(404).send(error);
    }
});

//Get all CartItems 
router.get("/getAll", async (request, response, next) => {
    let token = request.headers.authorization
    let id = mapUser.checkMapForUserId(token)
    try {
        let cartId = cartLogic.getUserOpenCartId(id)
        let getCartItems = await cartItemLogic.getAllCartItems(cartId);
        response.status(200).send(getCartItems);
        
    }
    catch (error) {
      return next(error);
  }
});


// delete cartItem 
router.delete("/:id" , async (request , response, next) =>{
    let id = +request.params.id
    try{
        await cartItemLogic.deleteCartItem(id);
        response.status(200).send("Item has been removed successfuly from cart !");
    }
      
      catch (error) {
        return next(error);
    }
})

router.delete("/deleteAllItems/:id" , async (request , response, next) =>{
    let id = +request.params.id
   
    try{
        await cartItemLogic.deleteAllCartItems(id);
        response.status(200).json("Cart has been cleared but stil exist ! ");
    }
       
      catch (error) {
        return next(error);
    }
})

module.exports = router;
