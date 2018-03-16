angular
.module('mainApp')
.controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$location'];

function LoginController($scope, $location){
	$scope.login = login;
	activate();

	///////////

	function activate(){
	}

	function login(email, password){
		console.log('login attempt')
		console.log(email)
		console.log(password)
	}

}
