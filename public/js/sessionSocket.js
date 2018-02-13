// Make connection
var socket = io.connect(window.location.href);

var vitals;
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
  abp.textContent = abp.textContent * 1 + 10 > 200 ? 200 : abp.textContent * 1 + 10;
  vitals.abp = abp.textContent;
  socket.emit('vitals', vitals);
});
abpDown.addEventListener('click', function(){
  abp.textContent = abp.textContent * 1 - 10 < 0 ? 0 : abp.textContent * 1 - 10;
  vitals.abp = abp.textContent;
  socket.emit('vitals', vitals);
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
  svo2.textContent = svo2.textContent * 1 + 5 > 100 ? 100 : svo2.textContent * 1 + 5;
  vitals.svo2 = svo2.textContent;
  socket.emit('vitals', vitals);
});
svo2Down.addEventListener('click', function(){
  svo2.textContent = svo2.textContent * 1 - 5 < 25 ? 25 : svo2.textContent * 1 - 5;
  vitals.svo2 = svo2.textContent;
  socket.emit('vitals', vitals);
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


socket.on('vitals', function(data){
      vitals = data;
      let time = new Date().getTime();
      var abpSeries = Highcharts.charts[0].series[0];
      let abpPoint = Math.random() * ((data.abp * 1 + 5) - (data.abp * 1 - 5)) + (data.abp * 1 - 5);
      abpSeries.addPoint([time, abpPoint], true, abpSeries.data.length > 100);
      let svo2Point = Math.random() * ((data.svo2 * 1 + 2.5) - (data.svo2 * 1 - 2.5)) + (data.svo2 * 1 - 2.5);
      var svo2Series = Highcharts.charts[1].series[0];
      svo2Series.addPoint([time, svo2Point], true, svo2Series.data.length > 100);
});




