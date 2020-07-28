const mysql = require("mysql2");

// Connection = set connection to the dataBase
const connection = mysql.createConnection({
    host: "localhost", // Computer
    user: "Talsabag", // Username
    password: "saltabagbs11", // Password
    database: "app1" // Database name
});

// Connect to the database: 
connection.connect(err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("We're connected to MySQL");
});


// One function for executing select / insert / update / delete: 
function execute(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) {
                reject(err);
                return;
            }
            // console.log(result);
            resolve(result);
        });
    });
}
function executeWithParams(sql, params) {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, result) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports = {
    execute,
    executeWithParams
};