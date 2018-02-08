var socket = require('socket.io');
var request = require('request');


function initSocket(server){
	
	var io = socket(server);

	io.on('connection', function(socket){
		
		console.log('made socket connection', socket.id);

	    socket.on('abp', function(data){
	    	console.log(data.value)
	        io.sockets.emit('abp', data);
	    });

	    socket.on('cap', function(data){
	    	console.log(data.value)
	        io.sockets.emit('cap', data);
	    });

	    socket.on('bis', function(data){
	    	console.log(data.value)
	        io.sockets.emit('bis', data);
	    });

	    socket.on('svo2', function(data){
	    	console.log(data.value)
	        io.sockets.emit('svo2', data);
	    });

	    socket.on('bld', function(data){
	    	console.log(data.value)
	        io.sockets.emit('bld', data);
	    });

	    socket.on('eso', function(data){
	    	console.log(data.value)
	        io.sockets.emit('eso', data);
	    });

	    socket.on('cvp', function(data){
	    	console.log(data.value)
	        io.sockets.emit('cvp', data);
	    });

	    socket.on('disconnect', function(data){
	        console.log('left page');
	    });
	});
}


module.exports = initSocket;




