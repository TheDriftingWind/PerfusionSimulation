angular
.module('mainApp')
.controller('SessionController', SessionController);

SessionController.$inject = ['$scope', '$location', '$window', 'SessionFactory'];

function SessionController($scope, $location, $window, SessionFactory){
	$scope.addSessions = addSessions;
	$scope.deleteSessions = deleteSessions;

	activate();

	///////////

	function activate(){
		getSessions();
	}

	function getSessions(){
		SessionFactory.getSessions().then(function(res){
			$scope.sessions = res;
			// $scope.ABP = res[0].ABP;
			// $scope.ALP = res[0].ALP;
			// $scope.SV02 = res[0].SV2;
			// $scope.CVP = res[0].CVP;
			// $scope.Temp = res[0].Temp;
			// $scope.BIS = res[0].BIS;
			// $scope.LMP = res[0].LMP;
			// $scope.FIO2 = res[0].FIO2;			
		});
	}
	function addSessions(){
		SessionFactory.postSessions().then(function(res){
			let sessions = JSON.parse(res);
			for(let i = 0; i < sessions.length; i++) $scope.sessions.push(sessions[i]);
		});
	}
	function deleteSessions(){
		SessionFactory.deleteSessions().then(function(res){
			$scope.sessions = JSON.parse(res);
			console.log(res);
		});
	}

}







