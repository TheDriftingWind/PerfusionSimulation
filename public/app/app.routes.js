var app = angular.module('mainApp', ['ngRoute']);

app.config(function ($routeProvider){
	$routeProvider.when('/login', {
		templateUrl: 'app/views/login.html',
		controller: 'LoginController',
		access: {
			restricted: false,
			student_access: true
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
		controller: 'WaitingRoomController',
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
		controller: 'InstructorController',
		access: {
			restricted: true,
			student_access: false
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
		controller: 'DataPortalController',
		access: {
			restricted: true,
			student_access: true
		}
	})
	.when('/arduino', {
		templateUrl: 'app/views/arduino.html',
		controller: 'ArduinoController',
		access: {
			restricted: false,
			student_access: true
		}
	})
	.otherwise('/login')
});

// runs everytime a route change is made
app.run(function($rootScope, $location, $route, $window, AuthFactory) {
	$rootScope.$on("$routeChangeStart", function(event, next, current) {
		let user = AuthFactory.getUser();
		// TODO: block student from instructor routes
		// check if new route is protected and if user has permissions
		if(next.$$route && next.$$route.access.restricted && !user){
			$location.path('/login');
			AuthFactory.isLoggedIn().then(function(res){
				if(res.status == 200){
					$location.path(next.$$route.originalPath);
			  		$route.reload();
				}
			})
		};
	})
});
