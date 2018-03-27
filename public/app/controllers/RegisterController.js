angular
.module('mainApp')
.controller('RegisterController', RegisterController);

RegisterController.$inject = ['$scope', '$location', '$route', 'AuthFactory'];

function RegisterController($scope, $location, $route, AuthFactory){
	$scope.register = register;
	$scope.errorMessages = {};
	let firstName = document.getElementById('firstName');
	let lastName = document.getElementById('lastName');
	let email = document.getElementById('email');
	let verifyEmail = document.getElementById('verifyEmail');
	let password = document.getElementById('password');
	let verifyPassword = document.getElementById('verifyPassword');

	activate();

	///////////

	function activate(){
		firstName.onkeydown = function(){
			if(firstName.value != ''){
				$scope.errorMessages.firstName = '';
			}
		}

		lastName.onkeydown = function(){
			if(lastName.value != ''){
				$scope.errorMessages.lastName = '';
			}
		}

		email.onkeydown = function(){
			if(email.value != ''){
				$scope.errorMessages.email = '';
				$scope.errorMessages.existingEmail = '';
			}

			if(verifyEmail.value == email.value){
				$scope.errorMessages.compareEmails = '';
			}
		}

		verifyEmail.onkeydown = function(){
			if(verifyEmail.value != ''){
				$scope.errorMessages.verifyEmail = '';
			}

			if(verifyEmail.value == email.value){
				$scope.errorMessages.compareEmails = '';
			}
		}

		password.onkeydown = function(){
			if(password.value != ''){
				$scope.errorMessages.password = '';
				$scope.errorMessages.comparePasswords = '';
			}
		}

		verifyPassword.onkeydown = function(){
			if(verifyPassword.value != ''){
				$scope.errorMessages.verifyPassword = '';
				$scope.errorMessages.comparePasswords = '';
			}
		}
	}

	function register(){
		$scope.errorMessages = {};
		if(!$scope.firstName){
			$scope.errorMessages.firstName = 'Please enter your first name.';
			firstName.focus();
			return;
		}
		if(!$scope.lastName){
			$scope.errorMessages.lastName = 'Please enter your last name.';
			lastName.focus();
			return;
		}
		if(!$scope.email){
			$scope.errorMessages.email = 'Please enter your email.';
			email.focus();
			return;
		}
		if(!$scope.verifyEmail){
			$scope.errorMessages.verifyEmail = 'Please verify your email.';
			verifyEmail.focus();
			return;
		}
		if($scope.email != $scope.verifyEmail){
			$scope.errorMessages.compareEmails = 'Emails do not match.';
			verifyEmail.focus();
			return;
		}
		if(!$scope.password){
			$scope.errorMessages.password = 'Please enter a password.';
			password.focus();
			return;
		}
		if(!$scope.verifyPassword){
			$scope.errorMessages.verifyPassword = 'Please verify your password.';
			verifyPassword.focus();
			return;
		}
		if($scope.password != $scope.verifyPassword){
			$scope.errorMessages.comparePasswords = 'Passwords do not match.';
			$scope.password = '';
			$scope.verifyPassword = '';
			password.focus();
			return;
		}

		AuthFactory.isEmailAvailable($scope.email).then(function(res){
  			if(res.status != 200){
	            $scope.errorMessages.existingEmail = 'This email already exists.';
	        }else{
	            let form = {
					first_name: $scope.firstName,
					last_name: $scope.lastName,
					email: $scope.email,
					password: $scope.password
				}

				AuthFactory.register(form).then(function(res){
					$location.path('/login');
			        $route.reload();
				});
	        }
		});
	}
}
