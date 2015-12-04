var app = angular.module('Shoutbox', []);

app.controller('MainCtrl', [
	'$scope',
	function($scope){
		$scope.test = 'Hello world!';
	}]);