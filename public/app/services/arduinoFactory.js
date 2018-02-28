angular
.module('mainApp')
.factory('ArduinoFactory', ArduinoFactory);

ArduinoFactory.$inject = ['$http'];

// set up the services needed for this factory
function ArduinoFactory($http){

	var service = {
		getPin: getPin,
		setLEDInterval: setLEDInterval,
		setLEDStatus: setLEDStatus
	};

	return service;

	////////////////////

	function getPin(pin){
		return $http.get('/arduino/pin/' + pin)
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}

	function setLEDInterval(interval, ticks){
		return $http.get('/arduino/led/' + interval + '/' + ticks)
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}

	function setLEDStatus(status){
		return $http.get('/arduino/pin/status/' + status)
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}
}