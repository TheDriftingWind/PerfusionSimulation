// Make connection
var socket = io.connect(window.location.href);
// Query DOM
var v1 = document.getElementById('v1'),
      v2 = document.getElementById('v2'),
      v3 = document.getElementById('v3');

var v1Up = document.getElementById('v1Up'),
      v1Down = document.getElementById('v1Down');

var v2Up = document.getElementById('v2Up'),
      v2Down = document.getElementById('v2Down');

var v3Up = document.getElementById('v3Up'),
      v3Down = document.getElementById('v3Down');


// Emit events
v1Up.addEventListener('click', function(){
  socket.emit('v1', {value: v1.textContent * 1 + 10});
});
v1Down.addEventListener('click', function(){
  socket.emit('v1', {value: v1.textContent * 1 - 10});
});

v2Up.addEventListener('click', function(){
  socket.emit('v2', {value: v2.textContent * 1 + 20});
});
v2Down.addEventListener('click', function(){
  socket.emit('v2', {value: v2.textContent * 1 - 20});
});

v3Up.addEventListener('click', function(){
  socket.emit('v3', {value: v3.textContent * 1 + 30});
});
v3Down.addEventListener('click', function(){
  socket.emit('v3', {value: v3.textContent * 1- 30});
});


// Listen for events
socket.on('v1', function(data){
      console.log(data.value)
      v1.textContent = data.value;
});

socket.on('v2', function(data){
      console.log(data.value)
      v2.textContent = data.value;
});

socket.on('v3', function(data){
      console.log(data.value)
      v3.textContent = data.value;
});


