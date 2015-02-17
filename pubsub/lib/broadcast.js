'use strict';

var axon = require('axon');
//create a new socket, passing in the type ('pub')
var socket = axon.socket('pub');
//bind the socket to a port on that machine
//http server is running in 8080, this is one port higher (why?)
//telling axon to listen on 8081 for subscribes; we dont' need to define any endpoints
socket.bind(8081);
console.log("Pub server started.");


/*
	Send a badge to the publish socket (singluar badge)
*/

exports.send = function(badge) {
	socket.send(badge);
};