var request = require('request');

// TODO: all of these requests pass info through the url.
// It would make more sense to send these as a post request
// with a body, if the arduino actually has such capabilites!
module.exports = function(app){
	// request the height value, send -1 since we have no data to send
	app.get('/arduino/height', function(req, res){
	    request({
			url: 'http://arduino.local/arduino/height/-1',
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}
			res.json({height: success})
		})
	});
	// request the pressure value, send -1 since we have no data to send
	app.get('/arduino/pressure', function(req, res){
		request({
			url: 'http://arduino.local/arduino/pressure/-1',
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}
			res.json({pressure: success})
		})
	});

	// set the pump to either 1 or 0
	app.post('/arduino/pump', function(req, res){
		request({
			url: 'http://arduino.local/arduino/pump/' + req.body.value,
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}
			res.end();
		})
	});

	// set the servo to a value between 0-180 (inclusive);
	app.post('/arduino/servo', function(req, res){
		request({
			url: 'http://arduino.local/arduino/servo/' + req.body.value,
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}
			res.end();
		})
	});

	// set the valve0 to either 1 or 0
	app.post('/arduino/valve0', function(req, res){
		request({
			url: 'http://arduino.local/arduino/valve0/' + req.body.value,
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}
			res.end();
		})
	});

	// set the valve1 to either 1 or 0
	app.post('/arduino/valve1', function(req, res){
		request({
			url: 'http://arduino.local/arduino/valve1/' + req.body.value,
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}
			res.end();
		})
	});

	// set components to simulate patinet bleeding
	app.get('/arduino/bleeding', function(req, res){
   	    request({
			url: 'http://arduino.local/arduino/pump/1',
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}
		})
		request({
			url: 'http://arduino.local/arduino/valve0/1',
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}
		})
		request({
			url: 'http://arduino.local/arduino/valve1/0',
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}
		})
		res.end()
	});

	// TODO: set components to simulate dissection
	app.get('/arduino/dissection', function(req, res){
	    res.json({message:'dissection'})
	});

	// TODO: set components to simulate dilation
	app.get('/arduino/dilation', function(req, res){
	    res.json({message:'dilation'})
	});

	// set components to simulate bypass
	app.get('/arduino/bypass', function(req, res){
	    request({
			url: 'http://arduino.local/arduino/pump/0',
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}
		})
		request({
			url: 'http://arduino.local/arduino/valve0/0',
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}
		})
		request({
			url: 'http://arduino.local/arduino/valve1/1',
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}
		})
		res.end()
	});

	// set components to allow for the tank to fill
	app.get('/arduino/fill', function(req, res){
	    request({
			url: 'http://arduino.local/arduino/pump/0',
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}
		})
		request({
			url: 'http://arduino.local/arduino/valve0/1',
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}
		})
		request({
			url: 'http://arduino.local/arduino/valve1/0',
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}
		})
		res.end()
	});
}