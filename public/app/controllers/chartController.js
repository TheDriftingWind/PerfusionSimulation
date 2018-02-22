angular
.module('mainApp')
.controller('chartController', chartController);

chartController.$inject = ['$scope', 'SessionFactory', 'AdministrationFactoy'];

function chartController($scope, SessionFactory, AdministrationFactoy){
	var session;
	$scope.getFormattedChartData = getFormattedChartData;
	$scope.title = 'title';

	activate();

	///////////

	function activate(){
		SessionFactory.getSessions().then(function(res){
			session = res[0];
		});

		AdministrationFactoy.getAdministrations().then(function(res){
			$scope.administrations = res;
		});
	}


	function getFormattedChartData(){
		let data = {
			"xData": [1,2,3,4,5,6,7,8,9,10],
			"datasets": [{
				"name": "ABP",
				"data": session.ABP,
				"unit": "mmHg",
				"type": "area",
				"valueDecimals": 0
			}, {
				"name": "ALP",
				"data": session.ALP,
				"unit": "mmHg",
				"type": "area",
				"valueDecimals": 0
			}, {
				"name": "SVO2",
				"data": session.SVO2,
				"unit": "%",
				"type": "area",
				"valueDecimals": 0
			}, {
				"name": "CVP",
				"data": session.CVP,
				"unit": "mmHg",
				"type": "area",
				"valueDecimals": 0
			}, {
				"name": "Temp",
				"data": session.Temp,
				"unit": "Celsius",
				"type": "area",
				"valueDecimals": 0
			}, {
				"name": "BIS",
				"data": session.BIS,
				"unit": "BIS",
				"type": "area",
				"valueDecimals": 0
			}, {
				"name": "Sweep",
				"data": session.LMP,
				"unit": "L/min",
				"type": "area",
				"valueDecimals": 0
			}, {
				"name": "FIO2",
				"data": session.FIO2,
				"unit": "FIO2",
				"type": "area",
				"valueDecimals": 2
			}]
		}

		return data;
	}
}
