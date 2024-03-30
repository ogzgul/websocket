const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.send('<h1>Merhaba Socket.IO!</h1>');
});

io.on('connection', (socket) => {
    console.log('Bir kullanıcı bağlandı.');

    socket.on('new user', (username) => {
        socket.username = username;
        console.log(`${username} bağlandı.`);
    });

    socket.on('disconnect', () => {
        console.log(`${socket.username || 'Bir kullanıcı'} bağlantıyı kesti.`);
    });

    socket.on('chat message', (data) => {
        io.emit('chat message', { msg: data.msg, username: data.username });
    });
});
