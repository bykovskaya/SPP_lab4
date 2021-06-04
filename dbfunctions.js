/*******************************************************/
/*************************DB****************************/
/*******************************************************/


const mysql = require("mysql2");
const DBconnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "lab4",
    password: "er54z4q9"
});

DBconnection.connect((err) => {
    if (err)
        return console.error("Error: " + err.message);
    else
        console.log("(DB)Successfully connected!");
});

let getMsgs = () => {
    let sql = "select id, text, DATE_FORMAT(date, '%Y-%m-%d') as date, TIME_FORMAT(time, '%H:%i') as time, sender, file as fileName from Message";
    return new Promise(function(resolve, reject){
        DBconnection.query(sql, (err, result)=>{
            if(err) 
                reject(err);
            else
                resolve(result);
        })
    })
}

let putMsgs = (args) => {
    let sql = "insert into Message(text, date, time, sender, file) values (?, ?, ?, ?, ?)";
    return new Promise(function(resolve, reject){
        DBconnection.query(sql, args, (err, result)=>{
            if(err) 
                reject(err);
            else
                resolve();
        })
    })
}

let deleteMsg = (id) => {
    let sql = "delete from Message where id = ?";
    return new Promise((resolve, reject)=>{
        DBconnection.query(sql, id, (err, res)=>{
            if(err)
                reject(err);
            else
                resolve();
        })
    })
}

let getUser = (aLogin) => {
    let sql = "select * from user where login = ?";
    return new Promise((resolve, reject)=>{
        DBconnection.query(sql, aLogin, (err, res)=>{
            if(err)
                reject(err);
            else
                resolve(res[0]);
        })
    })
}

let addUser = (args) => {
    let sql = "insert into user(login, password) values(?, ?)";
    return new Promise((resolve, reject)=>{
        DBconnection.query(sql, args, (err, res)=>{
            if(err)
                reject(err);
            else
                resolve();
        })
    })
}

module.exports = {getMsgs, putMsgs, deleteMsg, addUser, getUser}; 


/*******************************************************/
