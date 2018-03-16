angular
.module('mainApp')
.controller('loginController', loginController);

loginController.$inject = ['$scope', '$location'];

function loginController($scope, $location){
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
