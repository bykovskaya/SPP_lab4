let print = (...args) => console.log(...args);

/////////////////////////////////////////////////////
const port = 8888;

const app = require('express')();
const express = require('express');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bcrypt = require('bcrypt');
// const cookieParser = require('cookie-parser');
require('dotenv').config();

server.listen(port, ()=>{print(`server started on port ${port}`)});

/*attaches static files to page*/
app.use(express.static(__dirname + "/resources"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(cookieParser());


/*******************************/
// const {getMsgs, putMsgs, deleteMsg, addUser, getUser} = require('./dbfunctions.js');

const jsonParser = express.json();

app.post('/reg', jsonParser, (req, res)=>{
    print(req.body.login, " ", req.body.password);

    try {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: 'error is occured' })
            }
            else {
                // addUser([req.body.login, hashedPassword]).then(()=>{
                //     res.status(201).json({ message: 'Вы зарегестрированы!' })
                // }).catch((err)=>{
                //     res.status(400).send(err);
                //     console.log(err);
                // })
                res.status(201).json({ message: 'Вы зарегестрированы!' })
            }
        })
    } catch{
        res.status(500).json({ message: 'Ошибка регистрации.' })
    }
});

app.post('/log', jsonParser, (req, resp)=>{
    print(req.body.login, " ", req.body.password);
    resp.status(200).json({login:req.body.login, password:req.body.password});
});

io.sockets.on('connection', (socket)=>{
    socket.on('message', (data)=>{
        //putMsgs(data);
        print(data);
        io.sockets.emit('message', data);
        
    })
});