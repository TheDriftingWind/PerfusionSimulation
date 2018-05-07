// connect the client to the socket
var socket = io.connect(window.location.href);
    socket.on('connect', function(){
    console.log('connected to socket')
});
 
// will be used to store reference to the charts since
// they are dynamically created   
window.myData = {
	charts: {
		prof: {},
		stu: {},
		portal: {}
	}
}