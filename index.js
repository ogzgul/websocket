const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Sunucunun statik dosyaları 'public' klasöründen servis etmesini sağlar.

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // Ana sayfa olarak HTML dosyasını gönderir.
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
    io.emit('chat message', { msg: data.msg, username: data.username }); // Bütün bağlı istemcilere mesajı iletir.
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor.`);
});
