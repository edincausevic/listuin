
app.controller('homeController', ['$scope', '$location', '$sce', 'listuinData', 
						 function($scope, $location, $sce, listuinData){

	$scope.whichPage = $location.path();

    listuinData.getListuinData({page: $scope.whichPage}).then(function(data){

    	if (data) {
    		$scope.homeList = data;
        	$('#preloader').hide();
    	}
    });
}]);