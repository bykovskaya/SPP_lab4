let print = (...args) => console.log(...args);

/////////////////////////////////////////////////////
const port = 8888;

const app = require('express')();
const express = require('express');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const ss = require('socket.io-stream');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

server.listen(port, ()=>{print(`server started on port ${port}`)});

/*attaches static files to page*/
app.use(express.static(__dirname + "/resources"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(cookieParser());


/*******************************/
const {getMsgs, putMsgs, deleteMsg, addUser, getUser} = require('./dbfunctions.js');

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
                addUser([req.body.login, hashedPassword]).then(()=>{
                    res.status(201).json({ message: 'Вы зарегестрированы!' })
                }).catch((err)=>{
                    res.status(400).send(err);
                    console.log(err);
                })
                res.status(201).json({ message: 'Вы зарегестрированы!' })
            }
        })
    } catch{
        res.status(500).json({ message: 'Ошибка регистрации.' })
    }
});

app.post('/log', jsonParser, (req, resp)=>{
    getUser(req.body.login).then((user)=>{
        if(user == undefined){
            resp.status(404).json({message:"Пользователь не найден"});
        }
        else{
            bcrypt.compare(req.body.password, user.password, (err, equal) =>{
                if (err) {
                    console.log(err);
                    return resp.status(404).send({ message: 'Что-то пошло не так(((' });
                }
                if (equal) {
                    
                    const accessToken = jwt.sign(user.login, process.env.TOKEN_KEY)
                    const cookieOptions = {
                        httpOnly: true,
                        maxAge:null
                    }
                    resp.status(200).cookie('accessToken', accessToken, cookieOptions).json({ login:user.login });
                } else {
                    resp.status(401).json({ message: 'Ошибка авторизации!' })
                }
            })
        }
    }).catch((err)=>{
        print(err);
        resp.status(400).json({message:"Произошла ошибка"});
    });
});

io.sockets.on('connection', (socket)=>{
    socket.on('init dialog', ()=>{
        getMsgs().then((msgs)=>{
            socket.emit('init dialog', msgs);
        }).catch((err)=>{
            print(err);
            socket.emit('init dialog', {text:"Error!!!",date:'', time:'', sender:'system'});
        })
    })

    ss(socket).on('message', (stream, data)=>{
        putMsgs([data.text, data.date, data.time, data.sender, data.fileName]).then(()=>{
            io.sockets.emit('message', data);
            let fileName = "Z:\\6sem\\SPP\\Lab1\\uploads\\" + data.fileName;
            stream.pipe(fs.createWriteStream(fileName));
        }).catch((err)=>{
            print(err);
            socket.emit('message', {text:"Error!!!",date:'', time:'', sender:'system'});
        })
    })
});