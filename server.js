let print = (...args) => console.log(...args);

/////////////////////////////////////////////////////
const express = require('express'); 
const app = express();
const server = require('http').Server(app);
const ss = require('socket.io-stream');
const io = require('socket.io')(server);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const port = 8888;

server.listen(port);

/*attaches static files to page*/
app.use(express.static(__dirname + "/resources"));
/*******************************/

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/resources/index.html');
});

// Когда клиент соединяется, выводим сообщение в консоль
io.sockets.on('connection', function (socket) {
    print('A client is connected!');
});
