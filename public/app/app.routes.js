angular
.module('mainApp')
.config(routeConfigSettings);

routeConfigSettings.$inject = ['$routeProvider'];

function routeConfigSettings($routeProvider){
	$routeProvider.when('/', {
		templateUrl: 'app/views/login.html',
		controller: 'loginController'
	})
	.when('/chart', {
		templateUrl: 'app/views/highchart.html',
		controller: 'chartController'
	})
	.when('/sync', {
		templateUrl: 'app/views/syncCharts.html',
		controller: 'chartController'
	})
	.when('/register', {
		templateUrl: 'app/views/register.html'
	})
	.when('/home', {
		templateUrl: 'app/views/waiting-room.html'
	})
	.when('/sessions', {
		templateUrl: 'app/views/session.html',
		controller: 'SessionController'
	})
	.otherwise('/')
}
