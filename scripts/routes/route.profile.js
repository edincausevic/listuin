
profile.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

	// fixs slash - from ( !#%2 to / )
	$locationProvider.hashPrefix('');
		

	$routeProvider

	.when('/mylists', {
		templateUrl: 'views/mylisttemplate.html',
		controller: 'mylistController'
	})

	.when('/mylists/empty', {
		templateUrl: 'views/mylistempty.html',
		controller: 'mylistController'
	})

	.when('/mylists/:title', {
		templateUrl: 'views/mylist.html',
		controller: 'mylistController'
	})

	.when('/mycode', {
		templateUrl: 'views/mycode.html',
		controller: 'mycodeController'
	})

	.when('/material', {
		templateUrl: 'views/material.html',
		controller: 'materialController'
	})

	.when('/profile', {
		templateUrl: 'views/profile.html',
		controller: 'profileController'
	})

}]);