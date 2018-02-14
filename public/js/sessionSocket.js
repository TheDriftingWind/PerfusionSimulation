// Make connection
var socket = io.connect(window.location.href);
var ecgContainer = document.getElementById('ecgContainer');
var ecgNormal = document.getElementById('ecgNormal');
var ecgFast = document.getElementById('ecgFast');
var ecgSlow = document.getElementById('ecgSlow');
var ecgFlat = document.getElementById('ecgFlat');
var ecgFib = document.getElementById('ecgFib');

var oxyfail = document.getElementById('oxyfail');
var anesthfail = document.getElementById('anesthfail');
var inadAnticoag = document.getElementById('inadAnticoag');
var intravasHemo = document.getElementById('intravasHemo');

var vitals;
// Query DOM
var abpCtrl = document.getElementById('abpCtrl'),
      capCtrl = document.getElementById('capCtrl'),
      bisCtrl = document.getElementById('bisCtrl'),
      bldCtrl = document.getElementById('bldCtrl'),
      svo2Ctrl = document.getElementById('svo2Ctrl'),
      esoCtrl = document.getElementById('esoCtrl'),
      cvpCtrl = document.getElementById('cvpCtrl');

var abpDisplay = document.getElementById('abpDisplay'),
    capDisplay = document.getElementById('capDisplay'),
    bisDisplay = document.getElementById('bisDisplay'),
    bldDisplay = document.getElementById('bldDisplay'),
    svo2Display = document.getElementById('svo2Display'),
    esoDisplay = document.getElementById('esoDisplay'),
    cvpDisplay = document.getElementById('cvpDisplay');


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
  abpCtrl.textContent = abpCtrl.textContent * 1 + 10 > 200 ? 200 : abpCtrl.textContent * 1 + 10;
  vitals.abp = abpCtrl.textContent;
  socket.emit('vitals', vitals);
});
abpDown.addEventListener('click', function(){
  abpCtrl.textContent = abpCtrl.textContent * 1 - 10 < 0 ? 0 : abpCtrl.textContent * 1 - 10;
  vitals.abp = abpCtrl.textContent;
  socket.emit('vitals', vitals);
});

capUp.addEventListener('click', function(){
  capCtrl.textContent = capCtrl.textContent * 1 + 5 > 60 ? 60 : capCtrl.textContent * 1 + 5;
  vitals.cap = capCtrl.textContent;
  socket.emit('vitals', vitals);
});
capDown.addEventListener('click', function(){
  capCtrl.textContent = capCtrl.textContent * 1 - 5 < 0 ? 0 : capCtrl.textContent * 1 - 5;
  vitals.cap = capCtrl.textContent;
  socket.emit('vitals', vitals);
});

bisUp.addEventListener('click', function(){
  bisCtrl.textContent = bisCtrl.textContent * 1 + 3 > 65 ? 65 : bisCtrl.textContent * 1 + 3;
  vitals.bis = bisCtrl.textContent;
  socket.emit('vitals', vitals);
});
bisDown.addEventListener('click', function(){
  bisCtrl.textContent = bisCtrl.textContent * 1 - 3 < 15 ? 15 : bisCtrl.textContent * 1 - 3;
  vitals.bis = bisCtrl.textContent;
  socket.emit('vitals', vitals);
});

bladTempUp.addEventListener('click', function(){
  bldCtrl.textContent = bldCtrl.textContent * 1 + 1 > 38 ? 38 : bldCtrl.textContent * 1 + 1;
  vitals.bld = bldCtrl.textContent;
  socket.emit('vitals', vitals);
});
bladTempDown.addEventListener('click', function(){
  bldCtrl.textContent = bldCtrl.textContent * 1 - 1 < 18 ? 18 : bldCtrl.textContent * 1 - 1;
  vitals.bld = bldCtrl.textContent;
  socket.emit('vitals', vitals);
});

svo2Up.addEventListener('click', function(){
  svo2Ctrl.textContent = svo2Ctrl.textContent * 1 + 5 > 100 ? 100 : svo2Ctrl.textContent * 1 + 5;
  vitals.svo2 = svo2Ctrl.textContent;
  socket.emit('vitals', vitals);
});
svo2Down.addEventListener('click', function(){
  svo2Ctrl.textContent = svo2Ctrl.textContent * 1 - 5 < 25 ? 25 : svo2Ctrl.textContent * 1 - 5;
  vitals.svo2 = svo2Ctrl.textContent;
  socket.emit('vitals', vitals);
});

esoTempUp.addEventListener('click', function(){
  esoCtrl.textContent = esoCtrl.textContent * 1 + 1 > 38 ? 38 : esoCtrl.textContent * 1 + 1;
  vitals.eso = esoCtrl.textContent;
  socket.emit('vitals', vitals);
});
esoTempDown.addEventListener('click', function(){
  esoCtrl.textContent = esoCtrl.textContent * 1 - 1 < 18 ? 18 : esoCtrl.textContent * 1 - 1;
  vitals.eso = esoCtrl.textContent;
  socket.emit('vitals', vitals);
});

cvpUp.addEventListener('click', function(){
  cvpCtrl.textContent = cvpCtrl.textContent * 1 + 1 > 20 ? 20 : cvpCtrl.textContent * 1 + 1;
  vitals.cvp = cvpCtrl.textContent;
  socket.emit('vitals', vitals);
});
cvpDown.addEventListener('click', function(){
  cvpCtrl.textContent = cvpCtrl.textContent * 1 - 1 < 0 ? 0 : cvpCtrl.textContent * 1 - 1;
  vitals.cvp = cvpCtrl.textContent;
  socket.emit('vitals', vitals);
});


socket.on('vitals', function(data){
      vitals = data;
      let time = new Date().getTime();

      let abpSeries = Highcharts.charts[1].series[0];
      let svo2Series = Highcharts.charts[2].series[0];
      let capSeries = Highcharts.charts[3].series[0];
      let cvpSeries = Highcharts.charts[4].series[0];

      let abpPoint = Math.random() * ((data.abp * 1 + 5) - (data.abp * 1 - 5)) + (data.abp * 1 - 5);
      let svo2Point = Math.random() * ((data.svo2 * 1 + 2.5) - (data.svo2 * 1 - 2.5)) + (data.svo2 * 1 - 2.5);
      let capPoint = Math.random() * ((data.cap * 1 + 2.5) - (data.cap * 1 - 2.5)) + (data.cap * 1 - 2.5);
      let cvpPoint = Math.random() * ((data.cvp * 1 + 0.5) - (data.cvp * 1 - 0.5)) + (data.cvp * 1 - 0.5);
      let bisPoint = Math.random() * ((data.bis * 1 + 1.5) - (data.bis * 1 - 1.5)) + (data.bis * 1 - 1.5);
      let esoPoint = Math.random() * ((data.eso * 1 + 0.5) - (data.eso * 1 - 0.5)) + (data.eso * 1 - 0.5);
      let bldPoint = Math.random() * ((data.bld * 1 + 0.5) - (data.bld * 1 - 0.5)) + (data.bld * 1 - 0.5);
      
      abpPoint = abpPoint > data.abp ? Math.min(Math.round(abpPoint * 100) / 100, 200) : Math.max(Math.round(abpPoint * 100) / 100, 0);
      svo2Point = svo2Point > data.svo2 ? Math.min(Math.round(svo2Point * 100) / 100, 100) : Math.max(Math.round(svo2Point * 100) / 100, 25);
      capPoint = capPoint > data.cap ? Math.min(Math.round(capPoint * 100) / 100, 70) : Math.max(Math.round(capPoint * 100) / 100, 0);
      cvpPoint = cvpPoint > data.cvp ? Math.min(Math.round(cvpPoint * 100) / 100, 20) : Math.max(Math.round(cvpPoint * 100) / 100, 0);
      bisPoint = bisPoint > data.bis ? Math.min(Math.round(bisPoint * 100) / 100, 65) : Math.max(Math.round(bisPoint * 100) / 100, 15);
      esoPoint = esoPoint > data.eso ? Math.min(Math.round(esoPoint * 100) / 100, 38) : Math.max(Math.round(esoPoint * 100) / 100, 18);
      bldPoint = bldPoint > data.bld ? Math.min(Math.round(bldPoint * 100) / 100, 38) : Math.max(Math.round(bldPoint * 100) / 100, 18);
     
      abpSeries.addPoint([time, abpPoint], true, abpSeries.data.length > 100);
      svo2Series.addPoint([time, svo2Point], true, svo2Series.data.length > 100);
      capSeries.addPoint([time, capPoint], true, capSeries.data.length > 100);
      cvpSeries.addPoint([time, cvpPoint], true, cvpSeries.data.length > 100);

      abpDisplay.textContent = abpPoint;
      svo2Display.textContent = svo2Point;
      capDisplay.textContent = capPoint;
      cvpDisplay.textContent = cvpPoint;
      bisDisplay.textContent = bisPoint;
      esoDisplay.textContent = esoPoint;
      bldDisplay.textContent = bldPoint;
});

socket.on('ecg', function(data){
  genEcg()
});

var index = 1;
var interval = 20;
var min = 1;
var max = 3;

ecgNormal.addEventListener('click', function(){
  interval = 20;
  min = 1;
  max = 3;
});
ecgSlow.addEventListener('click', function(){
  interval = 30;
  min = 1;
  max = 3;
});
ecgFast.addEventListener('click', function(){
  interval = 10;
  min = 1;
  max = 3;
});
ecgFlat.addEventListener('click', function(){
  interval = 99;
  min = 0;
  max = 1;
});
ecgFib.addEventListener('click', function(){
  interval = 5;
  min = 5;
  max = 1;
});


oxyfail.addEventListener('click', function(){
});
anesthfail.addEventListener('click', function(){
});
inadAnticoag.addEventListener('click', function(){
});
intravasHemo.addEventListener('click', function(){
});

function genEcg(){
  let ecgSeries = Highcharts.charts[0].series[0];

  for(let i = index; i < index + 10; i++){
          ecgSeries.addPoint([i % interval == 0 ? 8 : Math.random() * (max - min) + min], false, ecgSeries.data.length > 100);
  }    
  Highcharts.charts[0].redraw()
  index += 10;
  if(index == 41){
    index = 1;
  }
}



