var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/pin/:pin', function(req, res){
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

router.get('/pin/status/:status', function(req, res){
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

router.get('/led/:interval/:ticks', function(req, res){
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


module.exports = router;