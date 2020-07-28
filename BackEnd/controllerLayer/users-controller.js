const usersLogic = require("../logicLayer/users-logic")
const express = require("express")
const router = express.Router();
const config = require("../config.json")
const jwt = require('jsonwebtoken');
const mapUser = require("../middleware/map")

router.post("/login", async (request, response , next) => {
  
    let user = request.body;
   
    // After a successful login, add the following header to each request
    // Authorization: The word Bearer, space (" ") and then - the token.
    // Example : 
    // Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBdmkiLCJpYXQiOjE1ODU0OTAxMjd9.O01aQaKcEOHgRexVwwX53T_SqMmKBxP3ng2dlriackA
    const token = jwt.sign({ sub: user }, config.secret);
  

    try {
        let usersLoginResult = await usersLogic.login(user)
      
        let loginResponse = {
            token: token,
            user_type: usersLoginResult[0].user_type,
            id: usersLoginResult[0].id,
            name: usersLoginResult[0].name,
            last_name : usersLoginResult[0].last_name
        }
        // console.log(loginResponse)
        response.json(loginResponse)
        // mapUser.saveUserInfo(token, usersLoginResult)
        mapUser.saveUserInfo(token, usersLoginResult)
       

    }
    // catch (error) {
    //     response.status(401).json({ error: "Invalid user name or password" });
    // }
    catch (error) {
        return next(error);
    }

})
router.put("/", async (request, response) => {
    let user = request.body;
    try {
        await usersLogic.updateUser(user)
        response.status(200).json("updat succesful")

    } catch (error) {
        response.status(404).json("No users in database");
    }
})

//Create new user
router.post("/create", async (request, response , next) => {
    let newUser = request.body;
    try {
        await usersLogic.addUser(newUser);
        response.status(200).json("Wellcome")

    } catch (error) {
        return next(error);
    }  
});

// Update user (Admin ability)
router.put("/", async (request, response) => {
    let adminUpdateUser = request.body;
    try {
        await usersLogic.updateUser(adminUpdateUser);
        response.status(200).send("user details successfully updated " + adminUpdateUser)

    } catch (error) {
        response.status(404).send(error);
    }  
});

//Get all users 
router.get("/", async (request, response) => {
    try {
        let allUsers = await usersLogic.getAllUsers();
        response.status(200).send(JSON.stringify(allUsers));
        
    } catch (error) {
        response.status(404).send(error);
    }
});

//admin get spesific user.
router.get("/:id", async (request, response) => {
    let id = +request.params.id
    try {
        let userById = await usersLogic.getUser(id);
        response.status(200).send(JSON.stringify(userById));
        
    } catch (error) {
        response.status(404).send(error);
    }
});


// delete User
router.put("/:id" , async (request , response) =>{
    let id = +request.params.id
    try{
        await usersLogic.deleteUser(id);
        response.status(200).send("User has been deleted successfuly !");
    }
    catch(error){
        response.status(404).send(error);
    }
})

router.put("/updatePassword", async (request, response , next) => {
    let user = request.body;
    try {
        await usersLogic.updatePassword(user)
        response.status(200).json({ succses: "password was update" })

    } catch (error) {
        return next(error);
    }
})

module.exports = router;
