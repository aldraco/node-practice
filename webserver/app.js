'use strict';

/* Before adding socket.io ---
var express = require('express');
var app = express();*/

//This gets express and socket to share

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var subSocket = require('./lib/subscribe');
var badges = require('./models/badges');

server.listen(3000, function() {
	console.log("Server is running on port 3000");
	//convention from the programer to separate servers
});


//tells the server to serve static assets from the public directory
app.use(express.static('public'));



//literal route for when the user visits the website. this file on the index route, no matter what
app.get('/', function(req, res) {
	res.sendFile('./public/index.html');
});

//now need to hook up socket.io to subSocket
io.sockets.on('connection', function(socket){
	console.log("Socket connected.");
	//prefill user's screen with content
	badges.get(function(err, data) {
		if (err) {
			console.log("error returning badges");
			return;
		}
		data.forEach(function(badge) {
			socket.emit('badge', badge);
		});
	});
});

subSocket.on('message', function(message) {
	io.sockets.emit('badge', JSON.parse(message));
	//messages are just badges

});