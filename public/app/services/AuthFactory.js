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
		logout: logout,
		getUser: getUser
	};

	var user = undefined;

	return service;

	////////////////////

	function isLoggedIn(){
		return $http.get('/authentication/login')
		.then(function(res){
			if(res.status == 200){
				user = res.data;
			}else{
				user = undefined;
			}
			return res;
		})
		.catch(function(err){
			user = undefined;
			return err;
		});

	}
	function register(form){
		return $http.post('/authentication/register', form)
		.then((res)=>res)
		.catch((err)=>console.error(err));
	}
	function login(email, password){
		return $http.post('authentication/login', {email, password})
		.then(function(res){
			user = res.data;
			return res;
		})
		.catch(function(err){
			user = undefined;
			return err;
		});
	}
	function isEmailAvailable(email){
		return $http.post('authentication/email_exists', {email})
		.then((res)=>res)
		.catch((err)=>err);
	}
	function logout(){
		return $http.get('/authentication/logout')
		.then(function(res){
			user = undefined;
			return res;
		})
		.catch(function(err){
			console.error(err)
			user = undefined;
			return err;
		});
	}
	function getUser(){
		return user;
	}
}