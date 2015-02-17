'use strict';

var redis = require('../lib/redis');
var broadcast = require('../lib/broadcast');

/* Save badges to database
	@param {Array} badges
	@param {Function} callback
*/

exports.save = function(badges, callback) {
	if (!badges.length) return callback(null, null);
	//removes last item from array
	var badge = badges.pop();
	//pushes onto a list
	redis.lpush('badges', JSON.stringify(badge), function(err) {
		console.log("pushed badge to the array");
		if (err) return callback(err, null);
		exports.save(badges, callback);
	});
};

/* Trim down the Redis list */

exports.trim = function () {
	//operates directly on redis and caps the list at 10 most recent items.
	redis.ltrim('badges', 0, 9)
};

/*
	Send out badges to the broadcaster
	@param {Array} badges
	@param {Function} callback
*/

exports.send = function(badges, callback) {
	//what's the ideal way to send out this data?
	//iterate over badges array.
	//for each item, pass a function in to invoke against value.
	//the function is broadcast.send
	badges.forEach(broadcast.send);
	//put in a callback because the controller is waiting for one.
	callback(null, null);
};


/*
	get badges from redis (trim has already limited them)
	@param {Function} callback
	
*/
exports.get = function(callback) {
	redis.lrange('badges', 0, -1, function(err, data) {
		//propogate potential errors back to controller?
		if (err) return callback(err, null);
		//interpret data from redis (which is string[]) and make it into JSON
		//this is application logic
		callback(null, data.map(JSON.parse));
		
	});
};