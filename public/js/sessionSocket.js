// Make connection
var socket = io.connect(window.location.href);
// Query DOM
var abp = document.getElementById('abp'),
      cap = document.getElementById('cap'),
      bis = document.getElementById('bis'),
      bld = document.getElementById('bld'),
      svo2 = document.getElementById('svo2'),
      eso = document.getElementById('eso'),
      cvp = document.getElementById('cvp');

var abpUp = document.getElementById('abpUp'),
      abpDown = document.getElementById('abpDown');

var capUp = document.getElementById('capUp'),
      capDown = document.getElementById('capDown');

var bisUp = document.getElementById('bisUp'),
      bisDown = document.getElementById('bisDown');

var bladTempDown = document.getElementById('bladTempDown'),
      bladTempUp = document.getElementById('bladTempUp');

var svo2Up = document.getElementById('svo2Up'),
      svo2Down = document.getElementById('svo2Down');

var esoTempUp = document.getElementById('esoTempUp'),
      esoTempDown = document.getElementById('esoTempDown');

var cvpUp = document.getElementById('cvpUp'),
      cvpDown = document.getElementById('cvpDown');

// Emit events
abpUp.addEventListener('click', function(){
  socket.emit('abp', {value: abp.textContent * 1 + 10});
});
abpDown.addEventListener('click', function(){
  socket.emit('abp', {value: abp.textContent * 1 - 10});
});

capUp.addEventListener('click', function(){
  socket.emit('cap', {value: cap.textContent * 1 + 10});
});
capDown.addEventListener('click', function(){
  socket.emit('cap', {value: cap.textContent * 1 - 10});
});

bisUp.addEventListener('click', function(){
  socket.emit('bis', {value: bis.textContent * 1 + 10});
});
bisDown.addEventListener('click', function(){
  socket.emit('bis', {value: bis.textContent * 1- 10});
});

bladTempUp.addEventListener('click', function(){
  socket.emit('bld', {value: bld.textContent * 1 + 10});
});
bladTempDown.addEventListener('click', function(){
  socket.emit('bld', {value: bld.textContent * 1 - 10});
});

svo2Up.addEventListener('click', function(){
  socket.emit('svo2', {value: svo2.textContent * 1 + 10});
});
svo2Down.addEventListener('click', function(){
  socket.emit('svo2', {value: svo2.textContent * 1 - 10});
});

esoTempUp.addEventListener('click', function(){
  socket.emit('eso', {value: eso.textContent * 1 + 10});
});
esoTempDown.addEventListener('click', function(){
  socket.emit('eso', {value: eso.textContent * 1- 10});
});

cvpUp.addEventListener('click', function(){
  socket.emit('cvp', {value: cvp.textContent * 1 + 10});
});
cvpDown.addEventListener('click', function(){
  socket.emit('cvp', {value: cvp.textContent * 1 - 10});
});


// Listen for events
socket.on('abp', function(data){
      abp.textContent = data.value;
});

socket.on('cap', function(data){
      cap.textContent = data.value;
});

socket.on('bis', function(data){
      bis.textContent = data.value;
});

socket.on('bld', function(data){
      bld.textContent = data.value;
});

socket.on('svo2', function(data){
      svo2.textContent = data.value;
});

socket.on('eso', function(data){
      eso.textContent = data.value;
});

socket.on('cvp', function(data){
      cvp.textContent = data.value;
});



