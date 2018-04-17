angular
.module('mainApp')
.controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$location', '$route', '$window', '$rootScope', 'AuthFactory'];

function LoginController($scope, $location, $route, $window, $rootScope, AuthFactory){
	$scope.login = login;

	activate();

	///////////

	function activate(){
	}

	function login(email, password){
		AuthFactory.login(email, password).then(function(res){
			if(res.status == 200){
				$location.path('/waiting-room');
	          	$route.reload();
			}else{
				$window.alert('Invalid login, please try again.');
				$scope.loginForm.password = '';
				$scope.loginForm.email = '';
				document.getElementById('email').focus();
			}
		});
	}
}
