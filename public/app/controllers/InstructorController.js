angular
.module('mainApp')
.controller('InstructorController', InstructorController);

InstructorController.$inject = ['$scope', '$location', '$window', '$rootScope', 'AuthFactory'];

function InstructorController($scope, $location, $window, $rootScope, AuthFactory){
	$scope.logout = logout;

	activate();

	///////////

	function activate(){
		socket.off()
		$scope.$on("$destroy", function(){
	        socket.emit('leaveSimulation', {room: 'instr-simulation'})
	    });
		checkIfMobileDevice();
		var profCharts = window.myData.charts.prof;
		let chartsOn = false;
		let ecgOn = false;
		var vitals = {};

		socket.emit('joinSimulation', {room: 'instr-simulation'});

		$window.onblur = function(){
			socket.emit('leaveSimulation', {room: 'instr-simulation'})
		};
		$window.onfocus = function(){
			socket.emit('joinSimulation', {room: 'instr-simulation'});
		};

		socket.on('joinSimulation', function(data){
			socket.emit('initEcg', {})
			socket.emit('initCharts', {})
			socket.emit('initMessages', {})
		});

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

		var endBtn = document.getElementById('end');


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
		  end.addEventListener('click', function(){
		    socket.emit('end', {});
		  });

		  socket.on('vitals', function(data){
		      if(chartsOn){
		          vitals = data;
		          let time = vitals.time;
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
		  });

		socket.on('administration', function(data){
		  for(let i = 0; i < data.length; i++){
		    document.getElementById('modal-body').innerHTML += '<p> ' + data[i] + '</p>' + '<hr>';
		  }
		});

		socket.on('initMessages', function(data){
		  for(let i = 0; i < data.length; i++){
		    document.getElementById('modal-body').innerHTML += '<p> ' + data[i] + '</p>' + '<hr>';
		  }
		});

		socket.on('end', function(data){
		  window.location.href = '/#!/data-portal'
		});

		socket.on('initCharts', function(data){
		    profCharts.abp.series[0].setData(data.abp.slice(data.abp.length > 30 ? data.abp.length - 29 : 0, data.abp.length), false)
		    profCharts.svo2.series[0].setData(data.svo2.slice(data.svo2.length > 30 ? data.svo2.length - 29 : 0, data.svo2.length), false)
		    profCharts.cap.series[0].setData(data.cap.slice(data.cap.length > 30 ? data.cap.length - 29 : 0, data.cap.length), false)
		    profCharts.cvp.series[0].setData(data.cvp.slice(data.cvp.length > 30 ? data.cvp.length - 29 : 0, data.cvp.length), false)
		    chartsOn = true;
		})

		socket.on('initEcg', function(data){
			profCharts.ecg.series[0].setData(data.slice(data.length - 99, data.length), false);
			ecgOn = true;
		})

		  socket.on('ecg', function(data){
		    if(ecgOn){
				ecg = data;
				let ecgSeries = profCharts.ecg.series[0];
				ecgSeries.addPoint([data.height], true, ecgSeries.data.length > 100);   
				profEcgDisplay.textContent = data.seconds;
		    }
		  });

		  ecgNormal.addEventListener('click', function(){
		    socket.emit('ecg', {ecg: 'ecgNormal'});
		  });
		  ecgSlow.addEventListener('click', function(){
		    socket.emit('ecg', {ecg: 'ecgSlow'});
		  });
		  ecgFast.addEventListener('click', function(){
		    socket.emit('ecg', {ecg: 'ecgFast'});
		  });
		  ecgFlat.addEventListener('click', function(){
		    socket.emit('ecg', {ecg: 'ecgFlat'});
		  });
		  ecgFib.addEventListener('click', function(){
		    socket.emit('ecg', {ecg: 'ecgFib'});
		  });

	}

	function checkIfMobileDevice(){
		var check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		$scope.mobile = check;
	}

	function logout(){
		AuthFactory.logout().then(function(res){
			$location.path('/login');
          	$route.reload();
		}).catch(error => console.log('reject'));
	}
}
