angular
.module('mainApp')
.controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$location', '$route','AuthFactory'];

function LoginController($scope, $location, $route, AuthFactory){
	$scope.login = login;

	activate();

	///////////

	function activate(){
	}

	function login(email, password){
		let myEmail = email;
		let myPass = password;
		$scope.loginForm.password = '';
		$scope.loginForm.email = '';
		AuthFactory.login(myEmail, myPass).then(function(res){
			if(res.data.user){
				$location.path('/waiting-room');
	          	$route.reload();
			}
		}).catch(error => console.log('reject'));
		$scope.loginForm.password = '';
		$scope.loginForm.email = '';
	}

	function logout(){
		AuthFactory.logout().then(function(res){
			if(!res.data.user){
				$location.path('/login');
	          	$route.reload();
			}
		}).catch(error => console.log('reject'));
	}

}
