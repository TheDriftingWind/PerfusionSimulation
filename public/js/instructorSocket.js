var professorSocket = io.connect(window.location.href);
var profCharts = window.myData.charts.prof;
var instructorFocus = true;
professorSocket.on('connect', function(){
  console.log('connected to professor professorSocket')
})
professorSocket.on('disconnect', function(){
  console.log('disconnected from professor professorSocket')
})

  var vitals = {};
  var ecgContainer = document.getElementById('ecgContainer');

  var ecgNormal = document.getElementById('ecgNormal');
      ecgFast = document.getElementById('ecgFast'),
      ecgSlow = document.getElementById('ecgSlow'),
      ecgFlat = document.getElementById('ecgFlat'),
      ecgFib = document.getElementById('ecgFib');

  var oxyfail = document.getElementById('oxyfail'),
      anesthfail = document.getElementById('anesthfail'),
      inadAnticoag = document.getElementById('inadAnticoag'),
      intravasHemo = document.getElementById('intravasHemo');

  var abpCtrl = document.getElementById('abpCtrl'),
      capCtrl = document.getElementById('capCtrl'),
      bisCtrl = document.getElementById('bisCtrl'),
      bldCtrl = document.getElementById('bldCtrl'),
      svo2Ctrl = document.getElementById('svo2Ctrl'),
      esoCtrl = document.getElementById('esoCtrl'),
      cvpCtrl = document.getElementById('cvpCtrl');

  var profAbpDisplay = document.getElementById('profAbpDisplay'),
      profCapDisplay = document.getElementById('profCapDisplay'),
      profBisDisplay = document.getElementById('profBisDisplay'),
      profBldDisplay = document.getElementById('profBldDisplay'),
      profSvo2Display = document.getElementById('profSvo2Display'),
      profEsoDisplay = document.getElementById('profEsoDisplay'),
      profCvpDisplay = document.getElementById('profCvpDisplay'),
      profEcgDisplay = document.getElementById('profEcgDisplay');

$(window).on( "focusout", function(){
  instructorFocus = false;
})
$(window).on( "focus", function(){
  instructorFocus = true;
  for(chart in profCharts){
    if('ecg' != chart){
      profCharts[chart].series[0].setData([])
    }
  }
})
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
    professorSocket.emit('vitals', vitals);
  });
  abpDown.addEventListener('click', function(){
    abpCtrl.textContent = abpCtrl.textContent * 1 - 10 < 0 ? 0 : abpCtrl.textContent * 1 - 10;
    vitals.abp = abpCtrl.textContent;
    professorSocket.emit('vitals', vitals);
  });

  capUp.addEventListener('click', function(){
    capCtrl.textContent = capCtrl.textContent * 1 + 5 > 60 ? 60 : capCtrl.textContent * 1 + 5;
    vitals.cap = capCtrl.textContent;
    professorSocket.emit('vitals', vitals);
  });
  capDown.addEventListener('click', function(){
    capCtrl.textContent = capCtrl.textContent * 1 - 5 < 0 ? 0 : capCtrl.textContent * 1 - 5;
    vitals.cap = capCtrl.textContent;
    professorSocket.emit('vitals', vitals);
  });

  bisUp.addEventListener('click', function(){
    bisCtrl.textContent = bisCtrl.textContent * 1 + 3 > 65 ? 65 : bisCtrl.textContent * 1 + 3;
    vitals.bis = bisCtrl.textContent;
    professorSocket.emit('vitals', vitals);
  });
  bisDown.addEventListener('click', function(){
    bisCtrl.textContent = bisCtrl.textContent * 1 - 3 < 15 ? 15 : bisCtrl.textContent * 1 - 3;
    vitals.bis = bisCtrl.textContent;
    professorSocket.emit('vitals', vitals);
  });

  bladTempUp.addEventListener('click', function(){
    bldCtrl.textContent = bldCtrl.textContent * 1 + 1 > 38 ? 38 : bldCtrl.textContent * 1 + 1;
    vitals.bld = bldCtrl.textContent;
    professorSocket.emit('vitals', vitals);
  });
  bladTempDown.addEventListener('click', function(){
    bldCtrl.textContent = bldCtrl.textContent * 1 - 1 < 18 ? 18 : bldCtrl.textContent * 1 - 1;
    vitals.bld = bldCtrl.textContent;
    professorSocket.emit('vitals', vitals);
  });

  svo2Up.addEventListener('click', function(){
    svo2Ctrl.textContent = svo2Ctrl.textContent * 1 + 5 > 100 ? 100 : svo2Ctrl.textContent * 1 + 5;
    vitals.svo2 = svo2Ctrl.textContent;
    professorSocket.emit('vitals', vitals);
  });
  svo2Down.addEventListener('click', function(){
    svo2Ctrl.textContent = svo2Ctrl.textContent * 1 - 5 < 25 ? 25 : svo2Ctrl.textContent * 1 - 5;
    vitals.svo2 = svo2Ctrl.textContent;
    professorSocket.emit('vitals', vitals);
  });

  esoTempUp.addEventListener('click', function(){
    esoCtrl.textContent = esoCtrl.textContent * 1 + 1 > 38 ? 38 : esoCtrl.textContent * 1 + 1;
    vitals.eso = esoCtrl.textContent;
    professorSocket.emit('vitals', vitals);
  });
  esoTempDown.addEventListener('click', function(){
    esoCtrl.textContent = esoCtrl.textContent * 1 - 1 < 18 ? 18 : esoCtrl.textContent * 1 - 1;
    vitals.eso = esoCtrl.textContent;
    professorSocket.emit('vitals', vitals);
  });

  cvpUp.addEventListener('click', function(){
    cvpCtrl.textContent = cvpCtrl.textContent * 1 + 1 > 20 ? 20 : cvpCtrl.textContent * 1 + 1;
    vitals.cvp = cvpCtrl.textContent;
    professorSocket.emit('vitals', vitals);
  });
  cvpDown.addEventListener('click', function(){
    cvpCtrl.textContent = cvpCtrl.textContent * 1 - 1 < 0 ? 0 : cvpCtrl.textContent * 1 - 1;
    vitals.cvp = cvpCtrl.textContent;
    professorSocket.emit('vitals', vitals);
  });

  professorSocket.on('vitals', function(data){
    if('/' == window.location.href.split('#!')[1]){
      if(instructorFocus){
          vitals = data;
          let time = new Date().getTime();
          let abpSeries = profCharts.abp.series[0];
          let svo2Series = profCharts.svo2.series[0];
          let capSeries = profCharts.cap.series[0];
          let cvpSeries = profCharts.cvp.series[0];

          abpSeries.addPoint([time, data.abp], true, abpSeries.data.length > 30);
          svo2Series.addPoint([time, data.svo2], true, svo2Series.data.length > 30);
          capSeries.addPoint([time, data.cap], true, capSeries.data.length > 30);
          cvpSeries.addPoint([time, data.cvp], true, cvpSeries.data.length > 30);

          profAbpDisplay.textContent = data.abp;
          profSvo2Display.textContent = data.svo2;
          profCapDisplay.textContent = data.cap;
          profCvpDisplay.textContent = data.cvp;
          profBisDisplay.textContent = data.bis;
          profEsoDisplay.textContent = data.eso;
          profBldDisplay.textContent = data.bld;
      }
    }else{
      professorSocket.disconnect();
     }
  });

  professorSocket.on('ecg', function(data){
    if('/' == window.location.href.split('#!')[1] && instructorFocus){  
      genEcg()
    }
  });

  var index = 1;
  var interval = 20;
  var min = 1;
  var max = 3;

  ecgNormal.addEventListener('click', function(){
    interval = 20;
    min = 1;
    max = 3;
    profEcgDisplay.textContent = 1.0;
  });
  ecgSlow.addEventListener('click', function(){
    interval = 30;
    min = 1;
    max = 3;
    profEcgDisplay.textContent = 2.0;

  });
  ecgFast.addEventListener('click', function(){
    interval = 10;
    min = 1;
    max = 3;
    profEcgDisplay.textContent = 0.5;

  });
  ecgFlat.addEventListener('click', function(){
    interval = 99;
    min = 0;
    max = 1;
    profEcgDisplay.textContent = '-';

  });
  ecgFib.addEventListener('click', function(){
    interval = 5;
    min = 5;
    max = 1;
    profEcgDisplay.textContent = 0.1;
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
    let ecgSeries = profCharts.ecg.series[0];
    ecgSeries.addPoint([index % interval == 0 ? 8 : Math.random() * (max - min) + min], true, ecgSeries.data.length > 100);   
    index ++;

    if(index == 41){
      index = 1;
    }
  } 

