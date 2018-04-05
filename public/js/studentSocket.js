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

$(window).on( "focus", function(){
  studentSocket.emit('initCharts', {})
})

var vitals = {};
  
var ecgContainer = document.getElementById('ecgContainer');
var submit = document.getElementById('submit');

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
  hepCtrl.textContent = hepCtrl.textContent * 1 + 1000 <= 80000 ? hepCtrl.textContent * 1 + 1000 : 80000;
});
hepDown.addEventListener('click', function(){
  hepCtrl.textContent = hepCtrl.textContent * 1 - 1000 >= 0 ? hepCtrl.textContent * 1 - 1000 : 0;
});
ph2Up.addEventListener('click', function(){
  ph2Ctrl.textContent = ph2Ctrl.textContent * 1.0 + 0.1 <= 10.0 ? Math.round((ph2Ctrl.textContent * 1.0 + 0.1) * 10)/10 : 10.0;
});
ph2Down.addEventListener('click', function(){
  ph2Ctrl.textContent = ph2Ctrl.textContent * 1.0 - 0.1 >= 0.0 ? Math.round((ph2Ctrl.textContent * 1.0 - 0.1) * 10)/10 : 0.0;
});
naUp.addEventListener('click', function(){
  naCtrl.textContent = naCtrl.textContent * 1 + 10 <= 800 ? naCtrl.textContent * 1 + 10 : 800;
});
naDown.addEventListener('click', function(){
  naCtrl.textContent = naCtrl.textContent * 1 - 10 >= 0 ? naCtrl.textContent * 1 - 10 : 0;
});
lidUp.addEventListener('click', function(){
  lidCtrl.textContent = lidCtrl.textContent * 1 + 100 <= 300 ? lidCtrl.textContent * 1 + 100 : 300;
});
lidDown.addEventListener('click', function(){
  lidCtrl.textContent = lidCtrl.textContent * 1 - 100 >= 0 ? lidCtrl.textContent * 1 - 100 : 0;
});
magUp.addEventListener('click', function(){
  magCtrl.textContent = magCtrl.textContent * 1.0 + 0.001 <= 5.0 ? Math.round((magCtrl.textContent * 1.0 + 0.001) * 1000)/1000 : 5.0;
});
magDown.addEventListener('click', function(){
  magCtrl.textContent = magCtrl.textContent * 1.0 - 0.001 >= 0.0 ? Math.round((magCtrl.textContent * 1.0 - 0.001) * 1000)/1000 : 0.0;
});
submit.addEventListener('click', function(){
  let messages = [];
  
  if(hepCtrl.textContent * 1 > 0){
    messages.push('Student administered ' + hepCtrl.textContent + ' units of hep.')
    hepCtrl.textContent = 0;
  }
  if(ph2Ctrl.textContent * 1 > 0){
    messages.push('Student administered ' + ph2Ctrl.textContent + ' units of ph2.')
    ph2Ctrl.textContent = 0;
  }
  if(naCtrl.textContent * 1 > 0){
    messages.push('Student administered ' + naCtrl.textContent + ' units of na.')
    naCtrl.textContent = 0;
  }
  if(lidCtrl.textContent * 1 > 0){
    messages.push('Student administered ' + lidCtrl.textContent + ' units of lid.')
    hepCtrl.lidCtrl = 0;
  }
  if(magCtrl.textContent * 1 > 0){
    messages.push('Student administered ' + magCtrl.textContent + ' units of hep.')
    hepCtrl.magCtrl = 0;
  }

 if(messages.length > 0){
  studentSocket.emit('administration', messages)
 }

});

studentSocket.on('administration', function(data){
  for(let i = 0; i < data.length; i++){
    document.getElementById('modal-body').innerHTML += '<p> ' + data[i] + '</p>';
  }
})

studentSocket.on('initCharts', function(data){
    studentCharts.abp.series[0].setData(data.abp.slice(data.abp.length > 30 ? data.abp.length - 29 : 0, data.abp.length))
    studentCharts.svo2.series[0].setData(data.svo2.slice(data.svo2.length > 30 ? data.svo2.length - 29 : 0, data.svo2.length))
    studentCharts.cap.series[0].setData(data.cap.slice(data.cap.length > 30 ? data.cap.length - 29 : 0, data.cap.length))
    studentCharts.cvp.series[0].setData(data.cvp.slice(data.cvp.length > 30 ? data.cvp.length - 29 : 0, data.cvp.length))
})

studentSocket.on('vitals', function(data){
  if('/student-station' == window.location.href.split('#!')[1]){
    if(studentFocus){
      vitals = data;  
      let time = vitals.time;
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

