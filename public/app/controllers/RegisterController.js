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

	function register(first_name, last_name, email, password){
		let form = {
			first_name,
			last_name,
			email,
			password
		}

		console.log(form);

		AuthFactory.register(form).then(function(res){
			console.log(res.status);
		});
	}

	// Emit events
	let email = document.getElementById('email');
	let verifyEmail = document.getElementById('verifyEmail');
  	email.addEventListener('change', validateEmail);
  	verifyEmail.addEventListener('change', validateEmail);
  	function validateEmail(){
  		AuthFactory.isEmailAvailable(email.value).then(function(res){
  			if(!res.data.isEmailAvailable){
	            email.setCustomValidity('This email already exists');
	        }else{
	            email.setCustomValidity('');
	          if(email.value != verifyEmail.value) {
	            verifyEmail.setCustomValidity("Emails Don't Match");
	          } else {
	            verifyEmail.setCustomValidity('');
	          }
	        }
		});
    }
}
