angular
.module('mainApp')
.controller('ArduinoController', ArduinoController);

ArduinoController.$inject = ['$scope', '$location', 'ArduinoFactory'];

function ArduinoController($scope, $location, ArduinoFactory){
	$scope.outputPin13 = 'n/a'
	$scope.intervalRes = 'n/a'

	$scope.setLEDInterval = setLEDInterval;
	$scope.setLEDStatus = setLEDStatus;

	activate();

	///////////

	function activate(){
		getPin13()
	}

	function getPin13(){
		ArduinoFactory.getPin(13).then(function(data){
			$scope.outputPin13 = data;
			getPin13()
		})
	}

	function setLEDInterval(interval, ticks){
		ArduinoFactory.setLEDInterval(interval, ticks).then(function(data){
		})
	}
	function setLEDStatus(status){
		ArduinoFactory.setLEDStatus(status).then(function(data){
		})
	}

}
