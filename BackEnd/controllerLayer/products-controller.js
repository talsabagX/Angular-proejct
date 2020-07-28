let productsLogic = require("../logicLayer/products-logic");
const express = require("express");
const router = express.Router();
// const fs = require("fs")
// const uuid = require("uuid")

//Create new Product
router.post("/", async (request, response , next) => {
    let newProduct = request.body;
    try {
        await productsLogic.addProduct(newProduct);
        response.status(200).send(newProduct)

    }  catch (error) {
        return next(error);
    } 
});


// Update Product 
router.put("/", async (request, response , next) => {

    let updateProduct = request.body;
    try {
        await productsLogic.updateProduct(updateProduct);
        response.status(200).send(updateProduct)

     }  catch (error) {
        return next(error);
    }
});

router.get("/amountOfProducts", async (request, response , next) => {
    try {
        let countOfProducts = await productsLogic.getCountAllProducts();
        response.json(countOfProducts);

    }  catch (error) {
        return next(error);
    }
});
//Get all Products
router.get("/", async (request, response , next) => {
    try {
        const getAllProducts = await productsLogic.getAllProducts();
        response.status(200).send(getAllProducts);
        
    }  catch (error) {
        return next(error);
    }
});

router.get("/:id" , async (request, response , next) =>{
    try{
        let id = +request.params.id
        let getProductById = await productsLogic.getProduct(id);
        response.status(200).send(JSON(getProductById));

    }  catch (error) {
        return next(error);
    }
})

// delete Product (Admin ability)
router.delete("/:id" , async (request, response , next) =>{
    let id = +request.params.id
    try{
        await productsLogic.deleteProduct(id);
        response.status(200).send("Products has been deleted successfuly !");
    }
      catch (error) {
        return next(error);
    }
})




module.exports = router;
