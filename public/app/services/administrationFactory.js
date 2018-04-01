angular
.module('mainApp')
.factory('AdministrationFactory', AdministrationFactory);

AdministrationFactory.$inject = ['$http'];

// set up the services needed for this factory
function AdministrationFactory($http){

	var service = {
		getAdministrations: getAdministrations
	};

	return service;

	////////////////////

	function getAdministrations(){
		return $http.get('/administrations')
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}
}
