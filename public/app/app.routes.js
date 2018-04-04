var app = angular.module('mainApp', ['ngRoute']);


app.config(function ($routeProvider){
	$routeProvider.when('/login', {
		templateUrl: 'app/views/login.html',
		controller: 'LoginController',
		access: {
			restricted: false,
			student_access: false
		}
	})
	.when('/register', {
		templateUrl: 'app/views/register.html',
		controller: 'RegisterController',
		access: {
			restricted: false,
			student_access: true
		}
	})

	.when('/waiting-room', {
		templateUrl: 'app/views/waiting-room.html',
		access: {
			restricted: true,
			student_access: true
		}
	})
	.when('/student-station', {
		templateUrl: 'app/views/student-station.html',
		controller: 'StudentController',
		access: {
			restricted: true,
			student_access: true
		}
	})
	.when('/instructor-station', {
		templateUrl: 'app/views/instructor-station.html',
		controller: 'StudentController',
		access: {
			restricted: true,
			student_access: true
		}
	})
	.when('/chart', {
		templateUrl: 'app/views/highchart.html',
		controller: 'ShartController',
		access: {
			restricted: true,
			student_access: true
		}
	})
	.when('/test', {
		templateUrl: 'app/views/test.html',
		controller: 'TestController',
		access: {
			restricted: true,
			student_access: true
		}
	})
	.when('/sync', {
		templateUrl: 'app/views/syncCharts.html',
		controller: 'ChartController',
		access: {
			restricted: true,
			student_access: true
		}
	})
	.when('/data-portal', {
		templateUrl: 'app/views/data-portal.html',
		access: {
			restricted: true,
			student_access: true
		}
	})
	.when('/sessions', {
		templateUrl: 'app/views/session.html',
		controller: 'SessionController',
		access: {
			restricted: true,
			student_access: true
		}
	})
	.when('/arduino', {
		templateUrl: 'app/views/arduino.html',
		controller: 'ArduinoController',
		access: {
			restricted: true,
			student_access: true
		}
	})
	.otherwise('/login')
});

// app.run(function($rootScope, $location, $route, AuthFactory) {
// 	$rootScope.$on("$routeChangeStart", function(event, next, current) {
// 		if(next.$$route && next.$$route.access.restricted && !$rootScope.user){
// 			$location.path('/login');
//       		$route.reload();
// 		}
// 	});
// });
