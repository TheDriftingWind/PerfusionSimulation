angular
.module('mainApp')
.controller('RegisterController', RegisterController);

RegisterController.$inject = ['$scope', '$location', 'AuthFactory'];

function RegisterController($scope, $location, AuthFactory){
	$scope.register = register;
	$scope.errorMessages = '';

	
	activate();

	///////////

	function activate(){
	}

	function register(){
		let form = {
			first_name: 'Troy',
			last_name: 'Ingel',
			email: 'tingel@quinnipiac.edu',
			password: 'pass'
		}

		AuthFactory.register(form).then(function(data){
			console.log(data.error_message);
		});
	}

}
