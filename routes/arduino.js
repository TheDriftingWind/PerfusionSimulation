module.exports = function(app){
	app.get('/arduino/pin/:pin', function(req, res){
	    request({
			url: 'http://arduino.local/arduino/digital/' + req.params.pin,
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}

			if(success){
				res.end(success)
			}
		})
	});

	app.get('/arduino/pin/status/:status', function(req, res){
	    request({
			url: 'http://arduino.local/arduino/digital/13/' + req.params.status,
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}

			if(success){
				res.end(success)
			}
		})
	});

	app.get('/arduino/led/:interval/:ticks', function(req, res){
	    request({
			url: 'http://arduino.local/arduino/interval/' + req.params.interval + '/' + req.params.ticks,
			method: 'GET',
			json: true
		}, function(err, body, success){
			if(err){
				console.log(err);
			}

			if(success){
				res.end(success)
			}
		})
	});
}