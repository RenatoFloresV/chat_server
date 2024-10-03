const express = require('express');
const path = require('path');
require('dotenv').config();

// DB Config
require('./database/config').dbConnection();

// App de Express
const app = express();
const port = process.env.PORT;

// Lectura y parseo del body
app.use(express.json());

// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');


// Public path
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


// Mis rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages'));
// app.use('/api/sockets', require('./routes/sockets'));

server.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Listening on port ${port}`);
})