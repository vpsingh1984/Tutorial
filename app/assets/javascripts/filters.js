angular.module('availabilityFilter', []).filter('checkmark', function(){
	return function(input){
		return input ? '\u2713' : '\u2718';
	}
});