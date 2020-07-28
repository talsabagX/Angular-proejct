const usersDao = require("../daoLayer/users-dao");
const validations = require("./validtations");
// crypto , saltRight , saltLeft = md5 hash
const crypto = require("crypto");
const saltRight = "sdkjfhdskajh";
const saltLeft = "--mnlcfs;@!$ ";
const ServerError = require("../middleware/errors/server-error")
const ErrorType = require("../middleware/errors/error-type")

async function login(user) {
    //validate that the user is exist
    await validations.isValid(user);
    //taking the password and excute hash function on it 
    user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");
    // after this two above us succesed the user sent to the lower level to make a login request
    const userLoginResult = await usersDao.login(user);
    return userLoginResult;
}
// Working function:
//login ("1" , "2");

// Add user
async function addUser(user) {
    validations.userValidation(user);
    //Creating hash to user password which makes the DB saves only hash in userPassword slot which means
    // user password will never be saved in any DB which is aweseome !
   user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");
    await usersDao.addUser(user);

    
};

//Working function:
//  addUser({userName:"Dro22r@gmail.com", password:"4!aAz@", personalId:"233748852", name:"Dror" ,lastName:"fuchi" ,city: "Tel Aviv", address: "Yad Harutzim" });



async function getAllUsers() {
    const allUsers = await usersDao.getAllUsers();
    await validations.isValid(allUsers);
    return allUsers;
};

// Working function: 
// getAllUsers()

async function getUser(id) {
    
    let isuser=await validations.isIntValid(usersDao.getUser(id));
    if(!isuser){
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }
    const requestedUser = await usersDao.getUser(id);
    return requestedUser;
};

// Working function:
//  getUser(12)

async function updateUser(user) {
    await validations.userValidation(user);
    const userToUpdate = await usersDao.updateUser(user);
    return console.log(userToUpdate);
};
//working function:
// updateUser({ userName:"Luffi@gmail.com", password:"4!aAz@" ,personalId:"741748852" , name:"Luffi" , city:"Beersheva" , address:"Beersheva" ,userType:"customer", userId:12});

async function deleteUser(id) {
    await validations.isIntValid(usersDao.getUser(id));
    await usersDao.deleteUser(id);
    console.log("User deleted successfully.");
};
//working Function
// deleteUser(8);
async function updatePassword(user) {

    await usersDao.updatePassword(user)
}
module.exports = {
    login,
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    updatePassword,
};