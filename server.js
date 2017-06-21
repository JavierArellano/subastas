const IP = '192.168.1.170';
// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
// Get our API routes
var api = require('./server/routes/api');

var mongoose = require('mongoose');
var Product = require('./db/product');
var User = require('./db/user');
var Chat = require('./db/chat');

var app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);
/*app.use('/chat', chat);*/

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

var io = require('socket.io')(server);

// socket io
io.on('connection', function (socket) {
  socket.on('disconnect', function() {
  });
  socket.on('save-message', function (data) {
    io.emit('new-message', { message: data });
  });
});


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port,IP, () => console.log(`API running on localhost:${port}`));