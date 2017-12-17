angular
.module('mainApp')
.factory('AdministrationFactoy', AdministrationFactoy);

AdministrationFactoy.$inject = ['$http'];

// set up the services needed for this factory
function AdministrationFactoy($http){

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