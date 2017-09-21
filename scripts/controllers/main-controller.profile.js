
profile.controller('mainProfileController', ['$scope', '$location','$routeParams', 'DB', 
									 function($scope, $location, $routeParams, DB){
	
	

	// GET URL HASH AND SLICE IT SO PARAMS ARE NOT THERE
	// USE IT TO CHEME MENU ACTIVE
	$scope.$on('$routeChangeStart', function(next, current) { 
	   $scope.whichPage = $location.path().slice(0,7);
	 });

	// GEY MY PROFILE DATA
	DB.profileData().then(function(data){ console.log(data);
		// ADD PROFILE NAME ON MENU
		$scope.myProfileData = data;
		// SAVE NAME IN LS
		localStorage.setItem('profileName', $scope.myProfileData.user_username);
	});

	// LOGOUT
    $scope.logout = function() {
        DB.logout().then(function(data){
            if (data == 1) { window.location = 'index.php';}
        });
    }

    // PROFILE MENU
    $('.my-profile-menu').add('.fa-user').add('#profileUserName').on('click', function(){
    	$('.p-menu').fadeToggle(300);
    });

	$(document).on('click', function(e){
	    if(e.target !== $('.my-profile-menu')[0]) {$('.p-menu').hide();}
	});

	// MOB MENU BUTTONS
	$scope.$on("$routeChangeSuccess", function () {

		if($location.path() == '/mycode') {
			$scope.mobMenuCodeBtn = true;
			$scope.mobMenuListsBtn = false;
		}else if($location.path().slice(0,8) == '/mylists') {
			$scope.mobMenuListsBtn = true;
			$scope.mobMenuCodeBtn = false;
		}else {
			$scope.mobMenuCodeBtn = false;
			$scope.mobMenuListsBtn = false;
		}
	});

	$scope.mobMenu = function() {
		
		if ($scope.windowWidth <= 1007) {
			$('.asideMenu').addClass('aside-menu-mob');
			$('.asideMenu').toggle();
			$('.main-items').toggle();
		}	
	}

	$(window).on('resize load', function(){
		$scope.windowWidth = $(window).width();

		if ($scope.windowWidth > 1007) {
			$('.asideMenu').removeClass('aside-menu-mob');
			$('.asideMenu').show(); 
		}else {
			$('.asideMenu').hide();
		}
	});
	
}]);