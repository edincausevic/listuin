

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

	// fixs slash - from ( !#%2 to / )
	$locationProvider.hashPrefix('');
		

	$routeProvider

	.when('/', {
		templateUrl: 'views/home.html',
		controller: 'homeController'
	})

	.when('/free/:page', {
		templateUrl: 'views/free.html',
		controller: 'freeController'
	})



}]);