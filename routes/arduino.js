var request = require('request');

module.exports = function(app){
	app.get('/arduino/height', function(req, res){
	    request({
			url: 'http://arduino.local/arduino/height/-1',
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}

			if(success){
				console.log(success)
				res.json({height: success})
			}
		})
	});

	app.get('/arduino/pressure', function(req, res){
		request({
			url: 'http://arduino.local/arduino/pressure/-1',
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}

			if(success){
				console.log(success)
				res.json({pressure: success})
			}
		})
	});

	app.post('/arduino/pump', function(req, res){
		request({
			url: 'http://arduino.local/arduino/pump/' + req.body.value,
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}

			if(success){
				console.log(success)
				res.end(success)
			}
		})
	});

	app.post('/arduino/servo', function(req, res){
		request({
			url: 'http://arduino.local/arduino/servo/' + req.body.value,
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}

			if(success){
				console.log(success)
				res.end(success)
			}
		})
	});

	app.post('/arduino/valve0', function(req, res){
		request({
			url: 'http://arduino.local/arduino/valve0/' + req.body.value,
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}

			if(success){
				console.log(success)
				res.end(success)
			}
		})
	});

	app.post('/arduino/valve1', function(req, res){
		request({
			url: 'http://arduino.local/arduino/valve1/' + req.body.value,
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}

			if(success){
				console.log(success)
				res.end(success)
			}
		})
	});
}