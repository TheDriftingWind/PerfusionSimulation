var studentSocket = io.connect(window.location.href);
var studentCharts = window.myData.charts.stu;
var studentFocus = true;
var ecgIndex = 1;

studentSocket.on('connect', function(){
  console.log('connected to student studentSocket')
})
studentSocket.on('disconnect', function(){
  console.log('disconnected from student studentSocket')
})
$(window).on( "focusout", function(){
  studentFocus = false;
})
$(window).on( "focus", function(){
  studentFocus = true;
  for(chart in studentCharts){
    if('ecg' != chart){
      studentCharts[chart].series[0].setData([])
    }
  }
})
var vitals = {};
  
var ecgContainer = document.getElementById('ecgContainer');
var modal = document.getElementById('modal-body');

var stuAbpDisplay = document.getElementById('stuAbpDisplay'),
    stuCapDisplay = document.getElementById('stuCapDisplay'),
    stuBisDisplay = document.getElementById('stuBisDisplay'),
    stuBldDisplay = document.getElementById('stuBldDisplay'),
    stuSvo2Display = document.getElementById('stuSvo2Display'),
    stuEsoDisplay = document.getElementById('stuEsoDisplay'),
    stuCvpDisplay = document.getElementById('stuCvpDisplay'),
    stuEcgDisplay = document.getElementById('stuEcgDisplay');

var hepCtrl = document.getElementById('hepCtrl'),
    ph2Ctrl = document.getElementById('ph2Ctrl'),
    naCtrl = document.getElementById('naCtrl'),
    lidCtrl = document.getElementById('lidCtrl'),
    magCtrl = document.getElementById('magCtrl');

var hepUp = document.getElementById('hepUp'),
    hepDown = document.getElementById('hepDown');

var ph2Up = document.getElementById('ph2Up'),
    ph2Down = document.getElementById('ph2Down');

var naUp = document.getElementById('naUp'),
    naDown = document.getElementById('naDown');

var lidUp = document.getElementById('lidUp'),
    lidDown = document.getElementById('lidDown');

var magUp = document.getElementById('magUp'),
    magDown = document.getElementById('magDown');

// Emit events
hepUp.addEventListener('click', function(){
  studentSocket.emit('administration', {message: "hepUp"});
});
hepDown.addEventListener('click', function(){
  studentSocket.emit('administration', {message: "hepDown"});
});
ph2Up.addEventListener('click', function(){
  studentSocket.emit('administration', {message: "phUp"});
});
ph2Down.addEventListener('click', function(){
  studentSocket.emit('administration', {message: "phDown"});
});
naUp.addEventListener('click', function(){
  studentSocket.emit('administration', {message: "naUp"});
});
naDown.addEventListener('click', function(){
  studentSocket.emit('administration', {message: "naDown"});
});

studentSocket.on('administration', function(data){
  modal.innerHTML += '<p> ' + data.message + '</p>';
})

studentSocket.on('vitals', function(data){
  if('/student-station' == window.location.href.split('#!')[1]){
    if(studentFocus){
      vitals = data;  
      let time = new Date().getTime();
      let abpSeries = studentCharts.abp.series[0];
      let svo2Series = studentCharts.svo2.series[0];
      let capSeries = studentCharts.cap.series[0];
      let cvpSeries = studentCharts.cvp.series[0];

      abpSeries.addPoint([time, data.abp], true, abpSeries.data.length > 30);
      svo2Series.addPoint([time, data.svo2], true, svo2Series.data.length > 30);
      capSeries.addPoint([time, data.cap], true, capSeries.data.length > 30);
      cvpSeries.addPoint([time, data.cvp], true, cvpSeries.data.length > 30);

      stuAbpDisplay.textContent = data.abp;
      stuSvo2Display.textContent = data.svo2;
      stuCapDisplay.textContent = data.cap;
      stuCvpDisplay.textContent = data.cvp;
      stuBisDisplay.textContent = data.bis;
      stuEsoDisplay.textContent = data.eso;
      stuBldDisplay.textContent = data.bld;
    }
  }else{
    studentSocket.disconnect();
   }
});

studentSocket.on('ecg', function(data){
  if('/student-station' == window.location.href.split('#!')[1] && studentFocus){  
    let ecgSeries = studentCharts.ecg.series[0];
    ecgSeries.addPoint([ecgIndex % data.interval == 0 ? 8 : Math.random() * (data.max - data.min) + data.min], true, ecgSeries.data.length > 100);   
    stuEcgDisplay.textContent = data.seconds;
    ecgIndex ++;

    if(ecgIndex == 41){
      ecgIndex = 1;
    }
  }
});

