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
		document.getElementById("servoSlider").oninput = function() {
			document.getElementById("servoValue").textContent = document.getElementById("servoSlider").value;
		}
		document.getElementById("servoSlider").onmouseup = function() {
			ArduinoFactory.setServo(document.getElementById("servoSlider").value).then(function(res){
			})
		}
		document.getElementById("pumpOn").onclick = function() {
			ArduinoFactory.setPump(1).then(function(res){
			})
		}
		document.getElementById("pumpOff").onclick = function() {
			ArduinoFactory.setPump(0).then(function(res){
			})
		}
		document.getElementById("valve0Open").onclick = function() {
			ArduinoFactory.setValve0(1).then(function(res){
			})
		}
		document.getElementById("valve0Close").onclick = function() {
			ArduinoFactory.setValve0(0).then(function(res){
			})
		}
		document.getElementById("valve1Open").onclick = function() {
			ArduinoFactory.setValve1(1).then(function(res){
			})
		}
		document.getElementById("valve1Close").onclick = function() {
			ArduinoFactory.setValve1(0).then(function(res){
			})
		}

		
		ArduinoFactory.getHeight().then(function(res){
			document.getElementById('heightSensorValue').textContent = res.height;
		});
		ArduinoFactory.getPressure().then(function(res){
			document.getElementById('pressureTransducerValue').textContent = res.pressure;
		});
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
