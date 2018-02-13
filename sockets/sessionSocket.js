var socket = require('socket.io');
var request = require('request');

var vitals  = {
	abp: 120,
	cap: 0,
	bis: 0,
	svo2: 75,
	bld: 0,
	eso: 0,
	cvp: 0
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
	}, 2000);
}


module.exports = initSocket;




