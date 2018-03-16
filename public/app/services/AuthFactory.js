angular
.module('mainApp')
.factory('AuthFactory', AuthFactory);

AuthFactory.$inject = ['$http'];

// set up the services needed for this factory
function AuthFactory($http){

	var service = {
		isLoggedIn: isLoggedIn,
		register: register,
		login: login,
		logout: logout
	};

	return service;

	////////////////////

	function getAdministrations(){
		return $http.get('/administrations')
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}
}