angular
.module('mainApp')
.factory('SessionFactory', SessionFactory);

SessionFactory.$inject = ['$http'];

// set up the services needed for this factory
function SessionFactory($http){

	var service = {
		getSession: getSession,
	};

	return service;

	////////////////////

	function getSession(){
		return $http.get('/session')
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}
}
