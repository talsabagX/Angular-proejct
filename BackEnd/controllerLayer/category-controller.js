let categoryLogic = require("../logicLayer/category-logic");
const express = require("express");
const router = express.Router();


//Create new Category
router.post("/", async (request, response) => {
    let newCategory = request.body;
    try {
        await categoryLogic.addCategory(newCategory);
        response.status(200).send("Category has been created!")

    } catch (error) {
        response.status(404).send(error);
    }  
});


// Update Category
router.put("/", async (request, response) => {
    let adminUpdateCategory = request.body;
    try {
        await categoryLogic.updateCategory(adminUpdateCategory);
        response.status(200).send("Product details successfully updated " + adminUpdateCategory)

    } catch (error) {
        response.status(404).send(error);
    }  
});


//Get all Category
router.get("/", async (request, response, next) => {
    try {
        let getCategories = await categoryLogic.getAllCategories();
        response.status(200).send(JSON.stringify(getCategories));
        
    }
    catch (error) {
      return next(error);
  }
});

router.get("/", async (request, response, next) => {
    let id = +request.params.id
    try {
        let getCategories = await categoryLogic.getCategory(id);
        response.status(200).send(JSON.stringify(getCategories));
        
    }
    catch (error) {
      return next(error);
  }
});

router.get("/:id", async (request, response, next) => {
    let id = +request.params.id
    try {
        let productsOfCategory = await categoryLogic.getAllProductsCategory(id);
        response.json(productsOfCategory);
    }
    catch (error) {
      return next(error);
  }
});

// router.get("/:id", async (request, response, next) => {
//     let id = +request.params.id
//     try {
//         let getCategories = await categoryLogic.getAllProductsCategory(id);
//         response.status(200).send(JSON.stringify(getCategories));
        
//     }
//     catch (error) {
//       return next(error);
//   }
// });

// delete Category 
router.put("/:id" , async (request , response) =>{
    let id = +request.params.id
        try{
        await categoryLogic.deleteCategory(id);
        response.status(200).send("Products has been deleted successfuly !");
    }
    catch(error){
        response.status(404).send(error);
    }
})




module.exports = router;
