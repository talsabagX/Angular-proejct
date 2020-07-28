const cartLogic = require("../logicLayer/cart-logic");
const express = require("express");
const router = express.Router();
let mapUser = require("../middleware/map")

//add new cart 
router.post("/", async (request, response, next) => {
    let token = request.headers.authorization
    let id = mapUser.checkMapForUserId(token)

  
    try {
        await cartLogic.addCart(id);
        response.status(200).json("Cart has been created !")

    }
      
    catch (error) {
      return next(error);
  } 
});

router.get("/openCart" , async (request , response, next)=>
{
    
    let token = request.headers.authorization
    let id = mapUser.checkMapForUserId(token)
    try {
    
        
     let getCart =  await cartLogic.getUserOpenCartId(id);
    //  console.log(getCart);
        response.status(200).json(getCart)


 
    }
      
    catch (error) {
      return next(error);
  } 
})
  
// Update Cart
router.put("/", async (request, response) => {
    let updateCart = request.body;
    try {
        await cartLogic.updateCart(updateCart);
        response.status(200).send("Cart successfully updated !" + updateCart)

    } catch (error) {
        response.status(404).send(error);
    }  
});


//Get cart by user id

router.get("/", async (request, response, next) => {
    let token = request.headers.authorization
    let id = mapUser.checkMapForUserId(token)
    // console.log(id)

    try {
        let userCart = await cartLogic.getCartByUserId(id);
        response.json(userCart);

    }
      
    catch (error) {
      return next(error);
  }
});

//Get all Carts 
router.get("/", async (request, response) => {
    let token = request.headers.authorization
    let id = mapUser.checkMapForUserId(token)
    // console.log(id)
    try {
        let getCartItemsByAdmin = await cartLogic.getAllCarts();
        response.status(200).send(getCartItemsByAdmin);
        
    } catch (error) {
        response.status(404).send(error);
    }
});

// delete cart 
router.delete("/:id" , async (request , response) =>{
    let id = +request.params.id
    try{
        await cartLogic.deleteCart(id);
        response.status(200).json("Cart has been removed successfuly !");
    }
    catch(error){
        response.status(404).send(error);
    }
})





module.exports = router;
