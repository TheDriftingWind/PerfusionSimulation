var socket = require('socket.io');
var request = require('request');

var vitals  = {
	abp: 120,
	cap: 35,
	bis: 50,
	svo2: 75,
	bld: 37,
	eso: 37,
	cvp: 2
}

function initSocket(server){

	var io = socket(server);

	io.on('connection', function(socket){
		console.log('made socket connection', socket.id);
		socket.emit('vitals', vitals)
		socket.on('vitals', function(data){
	    	vitals = data;
	    });

	    socket.on('disconnect', function(data){
	        console.log('left page');
		});
	});

	setInterval(function(){
		io.sockets.emit('vitals', vitals);
	}, 1000);

	setInterval(function(){
		io.sockets.emit('ecg', {});
	}, 100);
}


module.exports = initSocket;
