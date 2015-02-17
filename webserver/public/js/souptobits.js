'use strict';

/* The purpose of this file is to listen for events emitted from the socket,
	then populate the DOM with the badges.
	*/


$(function(){
	//connects to the same host the browser loaded from
	var socket = io.connect();

	socket.on('badge', function(badge) {
		//getting singular badges from the array iteration.
		//constructs an html image to prepend.
		var $img = $('<img src="'+badge.badge_id+'" alt="Code School Badge">');
		$('body').prepend($img);
	});




});