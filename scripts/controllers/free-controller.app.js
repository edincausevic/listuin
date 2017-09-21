
app.controller('freeController', ['$scope', '$location', 'listuinData', 
                               function($scope, $location, listuinData){

    $scope.whichPage = $location.path();                           	

	// GET THE LIST DATA
    listuinData.getListuinData({page: $scope.whichPage}).then(function(data){

    	$scope.homeList = data;
    });

}]);