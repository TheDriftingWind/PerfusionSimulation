angular
.module('mainApp')
.factory('SessionFactory', SessionFactory);

SessionFactory.$inject = ['$http'];

// set up the services needed for this factory
function SessionFactory($http){

	var service = {
		getSessions: getSessions,
		postSessions: postSessions,
		deleteSessions: deleteSessions
	};

	return service;

	////////////////////

	function getSessions(){
		return $http.get('/sessions')
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}
	function postSessions(){
		return $http.post('/sessions')
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}
	function deleteSessions(){
		return $http.put('/sessions')
		.then((res)=>res.data)
		.catch((err)=>console.error(err));
	}
}
