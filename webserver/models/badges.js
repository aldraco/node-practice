'use strict';

var request = require('request');

/**
	Get badges from the pub/sub server
	@param {Function} callback

*/

exports.get = function(callback) {
	//communicate with remote server
	request('http://localhost:8080/badges', function(err, resp, data){
		data = JSON.parse(data);
		if (data.error) {
			console.log("there was an error");
			return callback(err, []);
		}
		//callback(null, data.data);
		callback(null, data);
	});
};