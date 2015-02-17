'use strict';

//initialize the express server
var express = require('express');
var app = express();
var badges = require('./controllers/badges');

//middleware
//parses the information for middleware for every incoming request.
//interprets the JSON information. expects JSON data.
app.use(express.json());


//ROUTES

//This is a badges controller. Has methods, one is save, one is send.
//request goes through each middleware. Each has request and response.
app.post('/', badges.save, badges.send);

app.get('/badges', badges.get);



app.listen(8080, function() {
	console.log("your server is listening.");
});