'use strict';

var redis = require('redis');

//connects to the default localhost server
//returns back a reference to that connection
var client = redis.createClient();

client.on("error", function (err) {
	console.log("redis error");
	throw err;
});

module.exports = client;