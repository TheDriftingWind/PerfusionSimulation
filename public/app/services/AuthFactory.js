angular
.module('mainApp')
.factory('AuthFactory', AuthFactory);

AuthFactory.$inject = ['$http'];

// set up the services needed for this factory
function AuthFactory($http){

	var service = {
		isLoggedIn: isLoggedIn,
		isEmailAvailable: isEmailAvailable,
		register: register,
		login: login,
		logout: logout
	};

	return service;

	////////////////////

	function isLoggedIn(){
		return $http.get('/authentication/login')
		.then((res)=>res)
		.catch((err)=>err);
	}
	function register(form){
		return $http.post('/authentication/register', form)
		.then((res)=>res)
		.catch((err)=>console.error(err));
	}
	function login(email, password){
		return $http.post('authentication/login', {email, password})
		.then((res)=>res)
		.catch((err)=>err);
	}
	function isEmailAvailable(email){
		return $http.post('authentication/email_exists', {email})
		.then((res)=>res)
		.catch((err)=>err);
	}
	function logout(){
		return $http.get('/authentication/logout')
		.then((res)=>res)
		.catch((err)=>console.error(err));
	}
}