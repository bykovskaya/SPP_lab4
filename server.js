let print = (...args) => console.log(...args);

/////////////////////////////////////////////////////
const port = 8888;

const express = require('express'); 
const app = express();
const server = app.listen(port, ()=>{print(`server started on port ${port}`)});
const io = require('socket.io')(server);
const ss = require('socket.io-stream');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*attaches static files to page*/
app.use(express.static(__dirname + "/resources"));
/*******************************/

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/resources/index.html');
});

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
    let sql = "select * from Message";
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
    let sql = "inssert into Message(text, date, time, user_id) values (?, ?, ?, ?)";
    return new Promise(function(resolve, reject){
        DBconnection.query(sql, srgs, (err, result)=>{
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
    let sql = "select from user where login = ?";
    return new Promise((resolve, reject)=>{
        DBconnection.query(sql, aLogin, (err, res)=>{
            if(err)
                reject(err);
            else
                resolve(res);
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

/*******************************************************/

// Клиент соединился
io.sockets.on('connection', function (socket) {
    print('A client is connected!');

    socket.on('messages', ()=>{
        //socket.emit('messages', msgs);
    });

    socket.on('registrate', (data)=>{
        print('new user', data.login, data.password);
        let args = [];

        // addUser(args)
        // .then(()=>{
        //     print('user added');
        //     socket.emit('registrate', )
        // })
        // .catch(err=>{
        //     print(err);
        // })
    })

    socket.on('login', (data)=>{
        print('new user', data);
        let args = [];
    })
});
