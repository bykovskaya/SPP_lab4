let print = (...args) => console.log(...args);

/////////////////////////////////////////////////////
const port = 8888;

const express = require('express'); 
const app = express();
const session = require('express-session');
const server = app.listen(port, ()=>{print(`server started on port ${port}`)});
const io = require('socket.io')(server);
const ss = require('socket.io-stream');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/*attaches static files to page*/
app.use(express.static(__dirname + "/resources"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 'secret key',
    saveUninitialized: true,
    cookie: 'token=12345678',
}))
/*******************************/

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/resources/index.html');
});

/*******************************************************/
/*************************DB****************************/
/*******************************************************/
// const mysql = require("mysql2");
// const DBconnection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "lab4",
//     password: "er54z4q9"
// });

// DBconnection.connect((err) => {
//     if (err)
//         return console.error("Error: " + err.message);
//     else
//         console.log("(DB)Successfully connected!");
// });

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
// io.on('connection', function (socket) {
//     print('A client is connected!');
//     socket.on('messages', ()=>{
//         //socket.emit('messages', msgs);
//     });
//     socket.on('registrate', (data)=>{
//         print('registrate', data.login, data.password);
//         let args = [data.login];
//         bcrypt.hash(data.password, 10, (err, hashedPassword) => {
//             if (err) {
//                 console.log(err);
//                 socket.emit('registrate', { message: 'Password encription error'});
//             }
//             else {
//                 args.push(hashedPassword);
//                 addUser(args)
//                 .then ( ()   => { socket.emit('registrate', { message: 'You are registred!' })})
//                 .catch((err) => { socket.emit('registrate', { message: 'Registration error', data:err })});
//             }
//         })
//     })
//     socket.on('login', (data)=>{
//         print('login', data);
//         getUser(data.login)
//         .then(res => {
//             bcrypt.compare(res.password, data.password, (err, equal) => {
//                 if (err) {
//                     console.log(err);
//                     socket.emit('login', { message: 'Invalid password.' });
//                 }
//                 else {
//                     let token = '';
//                     const accessTocken = jwt.sign(token, TOKEN_KEY);
//                     console.log(accessTocken);
//                     socket.emit('login', { message: 'Welcome!', id: res.id, login: res.login });
//                 }
//             })
//         })
//         .catch(err => {
//             socket.emit('login', { message: err });
//         });
//     })
// });
