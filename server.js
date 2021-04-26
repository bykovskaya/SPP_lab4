const http = require('http');
const fs = require('fs');
const port = 8888;

// Загружаем файл index.html и отображаем его клиенту
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' })
    fs.createReadStream('./resources/index.html').pipe(res)
});

// Загружаем socket.io
const io = require('socket.io')(server);

// Когда клиент соединяется, выводим сообщение в консоль
io.sockets.on('connection', function (socket) {
    console.log('A client is connected!');
});


server.listen(port);