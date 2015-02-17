'use strict';

var axon = require('axon');
var socket = axon.socket('sub');

//need to connect to server
socket.connect(8081);

socket.on('error', function(err) {
	throw err;
});


//expose the socket to other items
module.exports = socket;
