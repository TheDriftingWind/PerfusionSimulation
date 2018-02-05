var socket = require('socket.io');
var request = require('request');


function initSocket(server){
	
	var io = socket(server);

	io.on('connection', function(socket){
		
		console.log('made socket connection', socket.id);

	    // Handle chat event
	    socket.on('chat', function(data){
	        io.sockets.emit('chat', data);
	        try{
	            
	            let post = [];
	            post.push({
	                "sender" : data.sender,
	                "message" : data.message,
	                "date" : new Date().getTime()
	                });

	            request({
	                url: 'https://api.mlab.com/api/1/databases/messages/collections/messages?apiKey=3uytyPKXCcUK5QN5wWVr0d78DAw1uPvs',
	                method: "POST",
	                json: true,
	                body: post
	            }, function (error, response, body){
	                if(error){
	                    console.log(error);
	                }
	            });
	        }catch(err){
	            console.log(err);
	        }
	    });

	    // Handle typing event
	    socket.on('typing', function(data){
	        socket.broadcast.emit('typing', data);
	    });

	    socket.on('startTyping', function(data){
	        socket.broadcast.emit('startTyping', data);
	    });

	    socket.on('disconnect', function(data){
	        console.log('left page');
	    });
	});
}


module.exports = initSocket;




