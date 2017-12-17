angular
.module('mainApp')
.controller('navController', navController);

navController.$inject = ['$scope', '$location', '$window'];

function navController($scope, $location, $window){
	$scope.home = 'home';
	$scope.chart = 'chart';
	$scope.login = 'login';

	activate();

	///////////

	function activate(){
	}

}







