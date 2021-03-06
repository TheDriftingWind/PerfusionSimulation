angular
.module('mainApp')
.factory('ArduinoFactory', ArduinoFactory);

ArduinoFactory.$inject = ['$http'];

// set up the services needed for this factory
function ArduinoFactory($http){

	var service = {
		setPump: setPump,
		setValve0: setValve0,
		setValve1: setValve1,
		setServo: setServo,
		getHeight: getHeight,
		getPressure: getPressure,
		bypass: bypass,
		dilation: dilation,
		dissection: dissection,
		bleeding: bleeding,
		fillTank: fillTank
	};

	return service;

	////////////////////

	function setPump(value){
		return $http.post('/arduino/pump', {value})
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}
	function setValve0(value){
		return $http.post('/arduino/valve0', {value})
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}
	function setValve1(value){
		return $http.post('/arduino/valve1', {value})
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}
	function setServo(value){
		return $http.post('/arduino/servo', {value})
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}
	function getHeight(){
		return $http.get('/arduino/height')
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}
	function getPressure(){
		return $http.get('/arduino/pressure')
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}
	function bypass(){
		return $http.get('/arduino/bypass')
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}
	function dilation(){
		return $http.get('/arduino/dilation')
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}
	function dissection(){
		return $http.get('/arduino/dissection')
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}
	function bleeding(){
		return $http.get('/arduino/bleeding')
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}
	function fillTank(){
		return $http.get('/arduino/fill')
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}
	
}