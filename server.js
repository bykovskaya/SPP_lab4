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

// Когда клиент соединяется, выводим сообщение в консоль
io.sockets.on('connection', function (socket) {
    print('A client is connected!');

});
