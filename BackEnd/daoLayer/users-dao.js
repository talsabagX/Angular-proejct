let connection = require("./connection");
const ServerError = require("../middleware/errors/server-error")
const ErrorType = require("../middleware/errors/error-type")

// //login function
// async function login(user) {

//     const sql = "SELECT * FROM users WHERE user_name =? AND password=?";
//     const parameters = [user.userName, user.password];
//     const userLoginResult = await connection.executeWithParams(sql, parameters);
//     return userLoginResult;
// }

async function login(user) {
    let sql = "SELECT * FROM users where user_name =? and password =?";
    let parameters = [user.userName, user.password];
    let usersLoginResult;
    //validate the user login result
   
    try {
        usersLoginResult = await connection.executeWithParams(sql, parameters);
    }
    catch (e) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }
    if (usersLoginResult == null || usersLoginResult.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }
    return usersLoginResult;
}



// login("Talsabag@gmail.com" , "1234")

async function addUser(user) {
    const sql = `INSERT INTO users(user_name ,password , name, last_name, city, address) Values (?,?,?,?,?,?)`;
    const parameters = [user.userName, user.password, user.name, user.lastName, user.city, user.address];
    await connection.executeWithParams(sql, parameters);
  
    // user.id = user.insertId; 
    // console.log("successfully add : " + info);
}

// addUser("mom@gmail.com" , "1234" , "name" , "20522551" , "Beer-Sheva" , "Beer-sheva")

async function getAllUsers() {
    const sql = "SELECT * FROM users";
    const users = await connection.execute(sql);
    return users;
}
// getAllUsers()

async function getUser(id) {
    const sql = "SELECT * FROM users WHERE id=" + id
    const user = await connection.execute(sql);
    return user;
}
// getUser(3)

async function updateUser(user) {
    const sql = "UPDATE users SET user_name=?, password=?, personal_id=?, name=?,last_name=?,city=?, address=?, user_type=? WHERE id=?";
    const parameters = [user.userName, user.password, user.personalId,user.name,user.lastName, user.city, user.address, user.userType , user.userId];
    const userUpdateResult = await connection.executeWithParams(sql, parameters);
    console.log("A change has been made : " + userUpdateResult);
}

// updateUser("Dad@gmail.com" , "0123" , "dad" , "205444411" , "sd" , "ad" , "customer" , 6)

async function deleteUser(id) {
    const sql = `DELETE FROM users WHERE id = ?`;
    const parameters = [id];
    await connection.executeWithParams(sql, parameters);
    console.log("User Number: " + id + ", has Been deleted");
    return;
}
// deleteUser(7);

async function updatePassword(user) {
    let sql = "update users set  password=? WHERE user_name=?"
    let parameters = [user.password, user.userName];
    await connection.executeWithParams(sql, parameters);
}
module.exports = {
    login,
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    updatePassword
};