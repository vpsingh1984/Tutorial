var ekartApp = angular.module('Ekart', 
	[
		'ngRoute',
		'ui.router'
	]
);

// ekartApp.config(['$routeProvider', function($routeProvider){
// 	$routeProvider.
// 		when('/', {
// 			templateUrl: 'partials/item-list.html',
// 			controller: 'HomeController'
// 		}).
// 		when('/:id', {
// 			templateUrl: 'partials/item-details.html',
// 			controller: 'ItemController'
// 		}).
// 		when('/items/:id/edit', {
// 			templateUrl: 'partials/item-form.html',
// 			controller: 'EditItemController'
// 		}).
// 		when('/items/new', {
// 			templateUrl: 'partials/item-form.html',
// 			controller: 'NewItemController'
// 		}).
// 		otherwise({
// 			redirectTo: '/'
// 		})
// }]);

ekartApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('app/views/home/index.html');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'app/views/home/index.html'
        })
        .state('home.allquestion', {
            url: '/allquestion',
            templateUrl: 'app/views/all-question/all-question.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit       
        });
        
}]);