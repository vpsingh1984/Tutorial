var services = angular.module('itemServices', ['ngResource']);

services.factory('Api', ['$resource', function($resource){
	return $resource('/items/:id.json');
}]);