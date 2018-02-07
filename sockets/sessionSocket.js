var socket = require('socket.io');
var request = require('request');


function initSocket(server){
	
	var io = socket(server);

	io.on('connection', function(socket){
		
		console.log('made socket connection', socket.id);

	    socket.on('v1', function(data){
	    	console.log(data.value)
	        io.sockets.emit('v1', data);
	    });

	    socket.on('v2', function(data){
	    	console.log(data.value)
	        io.sockets.emit('v2', data);
	    });

	    socket.on('v3', function(data){
	    	console.log(data.value)
	        io.sockets.emit('v3', data);
	    });

	    socket.on('disconnect', function(data){
	        console.log('left page');
	    });
	});
}


module.exports = initSocket;




