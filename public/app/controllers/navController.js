angular
.module('mainApp')
.controller('NavController', NavController);

NavController.$inject = ['$scope', '$location', '$window'];

function NavController($scope, $location, $window){
	$scope.home = 'home';
	$scope.chart = 'chart';
	$scope.login = 'login';

	activate();

	///////////

	function activate(){
	}

}







