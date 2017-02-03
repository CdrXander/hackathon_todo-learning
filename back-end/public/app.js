angular.module('apiApp',[]);
	
angular.module('apiApp').controller('apiController', function($scope, apiService) {

	$scope.login = function() {
		apiService.login($scope.email, $scope.password).then(function(serviceData) {
			$scope.loginResult = serviceData;
		})
	}

	$scope.logout = function() {
		apiService.logout().then(function(serviceData) {
			$scope.loginResult = serviceData;
		})
	}

	$scope.showToDoItems = function() {
		apiService.getTodos().then(function(serviceData) {
			$scope.toDoItems = serviceData;
		})
	}
});

angular.module("apiApp").service("apiService", function($http, $q) { 
	baseURL = "http://localhost:3500/api";

	this.login = function(email, password) {
		var deferred = $q.defer();
		var url = baseURL + '/auth/login'
		var data = {
			email:email,
			password:password
		}
		$http.post(url,data).success(function(response) {
			deferred.resolve(response);
		}).error(function(response) {
			deferred.resolve(response);
		});
		return deferred.promise;
	}

	this.logout = function() {
		var deferred = $q.defer();
		var url = baseURL + '/auth/logout'
		$http.post(url).success(function(response) {
			deferred.resolve(response);
		});
		return deferred.promise;
	}

	this.getTodos = function() {
		var deferred = $q.defer();
		var url = baseURL + '/todo/list'
		$http.get(url).success(function(response) {
			deferred.resolve(response);
		});
		return deferred.promise;
	}

});
