angular
.module('mainApp')
.controller('StudentController', StudentController);

StudentController.$inject = ['$scope', '$location', '$window', '$rootScope', '$route','AuthFactory'];

function StudentController($scope, $location, $window, $rootScope, $route, AuthFactory){
	$scope.logout = logout;

	activate();

	///////////

	function activate(){
		socket.off()
		$scope.user = AuthFactory.getUser();
		$scope.$on("$destroy", function(){
	        socket.emit('leaveSimulation', {room: 'stu-simulation'})
	    });
		checkIfMobileDevice();
		let studentCharts = $window.myData.charts.stu;
		let chartsOn = false;
		let ecgOn = false;

		socket.emit('joinSimulation', {room: 'stu-simulation'});

		$window.onblur = function(){
			socket.emit('leaveSimulation', {room: 'stu-simulation'})
		};
		$window.onfocus = function(){
			socket.emit('joinSimulation', {room: 'stu-simulation'});
		};

		socket.on('joinSimulation', function(data){
			console.log('joined room: ' + data.room)
			socket.emit('initEcg', {})
			socket.emit('initCharts', {})
			socket.emit('administration', {})
		});

		let vitals = {};
		let ecg = {};
		let submit = document.getElementById('submit');

		let stuAbpDisplay = document.getElementById('stuAbpDisplay'),
		stuCapDisplay = document.getElementById('stuCapDisplay'),
		stuBisDisplay = document.getElementById('stuBisDisplay'),
		stuBldDisplay = document.getElementById('stuBldDisplay'),
		stuSvo2Display = document.getElementById('stuSvo2Display'),
		stuEsoDisplay = document.getElementById('stuEsoDisplay'),
		stuCvpDisplay = document.getElementById('stuCvpDisplay'),
		stuEcgDisplay = document.getElementById('stuEcgDisplay');

		let hepCtrl = document.getElementById('hepCtrl'),
		ph2Ctrl = document.getElementById('ph2Ctrl'),
		naCtrl = document.getElementById('naCtrl'),
		lidCtrl = document.getElementById('lidCtrl'),
		magCtrl = document.getElementById('magCtrl');

		let hepUp = document.getElementById('hepUp'),
		hepDown = document.getElementById('hepDown');

		let ph2Up = document.getElementById('ph2Up'),
		ph2Down = document.getElementById('ph2Down');

		let naUp = document.getElementById('naUp'),
		naDown = document.getElementById('naDown');

		let lidUp = document.getElementById('lidUp'),
		lidDown = document.getElementById('lidDown');

		let magUp = document.getElementById('magUp'),
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

			let administrations = [];
			let date = new Date();
			let time = {
				h: date.getHours(),
				m: date.getMinutes(),
				s: date.getSeconds()
			}
			let email = AuthFactory.getUser().email;

			if(hepCtrl.textContent * 1 > 0){
				administrations.push({
					time,
					email,
					medication : 'Heparin',
					dosage : hepCtrl.textContent,
					units: 'U'
				});    
				hepCtrl.textContent = 0;
			}
			if(ph2Ctrl.textContent * 1 > 0){
				administrations.push({
					time,
					email,
					medication : 'Phenylephrine',
					dosage : ph2Ctrl.textContent,
					units: 'mg'
				});
				socket.emit('abp', {abp: (ph2Ctrl.textContent * 150.0)})
				ph2Ctrl.textContent = 0;
			}
			if(naCtrl.textContent * 1 > 0){
				administrations.push({
					time,
					email,
					medication : 'Bicarbonate',
					dosage : naCtrl.textContent,
					units: 'mEq'
				});
				naCtrl.textContent = 0;
			}
			if(lidCtrl.textContent * 1 > 0){
				administrations.push({
					time,
					email,
					medication : 'Lidocaine',
					dosage : lidCtrl.textContent,
					units: 'mg'
				});
				if(ecg.name == 'ecgFib'){
					socket.emit('ecg', {ecg: 'ecgNormal'});
				}
				lidCtrl.textContent = 0;
			}
			if(magCtrl.textContent * 1 > 0){
				administrations.push({
					time,
					email,
					medication : 'Magnesium',
					dosage : magCtrl.textContent,
					units: 'g'
				});
				if(ecg.name == 'ecgFib'){
					socket.emit('ecg', {ecg: 'ecgNormal'});
				}
				magCtrl.textContent = 0;
			}

			if(administrations.length > 0){
				socket.emit('administration', administrations)
			}

		});

		socket.on('administration', function(data){
			document.getElementById('modal-body').innerHTML = '';
			for(let i = data.length - 1; i >=0; i--){
				document.getElementById('modal-body').innerHTML += '<p> ' + data[i] + '</p>' + '<hr>';
			}
			$('#recent-notification').fadeIn();
		})

		socket.on('end', function(data){
	        socket.emit('leaveSimulation', {room: 'stu-simulation'})
			$window.location.href = '/#!/data-portal'
		});

		socket.on('initEcg', function(data){
			console.log('initecg')
			studentCharts.ecg.series[0].setData(data.slice(data.length - 99, data.length), false);
			ecgOn = true;
		})

		socket.on('initCharts', function(data){
			studentCharts.abp.series[0].setData(data.abp.slice(data.abp.length > 150 ? data.abp.length - 29 : 0, data.abp.length), false)
			studentCharts.svo2.series[0].setData(data.svo2.slice(data.svo2.length > 150 ? data.svo2.length - 29 : 0, data.svo2.length), false)
			studentCharts.cap.series[0].setData(data.cap.slice(data.cap.length > 150 ? data.cap.length - 29 : 0, data.cap.length), false)
			studentCharts.cvp.series[0].setData(data.cvp.slice(data.cvp.length > 150 ? data.cvp.length - 29 : 0, data.cvp.length), false)
			chartsOn = true;
		})

		socket.on('vitals', function(data){
			if(chartsOn){
				vitals = data.realData;  
		        let time = data.adjustedData.time;
				let abpSeries = studentCharts.abp.series[0];
				let svo2Series = studentCharts.svo2.series[0];
				let capSeries = studentCharts.cap.series[0];
				let cvpSeries = studentCharts.cvp.series[0];

				abpSeries.addPoint([time, data.adjustedData.abp], true, abpSeries.data.length > 150);
				svo2Series.addPoint([time, data.adjustedData.svo2], true, svo2Series.data.length > 150);
				capSeries.addPoint([time, data.adjustedData.cap], true, capSeries.data.length > 150);
				cvpSeries.addPoint([time, data.adjustedData.cvp], true, cvpSeries.data.length > 150);

				stuAbpDisplay.textContent = data.adjustedData.abp;
				stuSvo2Display.textContent = data.adjustedData.svo2;
				stuCapDisplay.textContent = data.adjustedData.cap;
				stuCvpDisplay.textContent = data.adjustedData.cvp;
				stuBisDisplay.textContent = data.adjustedData.bis;
				stuEsoDisplay.textContent = data.adjustedData.eso;
				stuBldDisplay.textContent = data.adjustedData.bld;
			}
		});

		socket.on('ecg', function(data){
			if(ecgOn){
				ecg = data;
				let ecgSeries = studentCharts.ecg.series[0];
				ecgSeries.addPoint([data.height], true, ecgSeries.data.length > 100);   
				stuEcgDisplay.textContent = data.seconds;
			}
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
