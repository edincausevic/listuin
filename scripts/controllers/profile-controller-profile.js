
profile.controller('profileController', ['$scope', 'DB', '$timeout', function($scope, DB, $timeout){

	$('#profileTitle').html('My Profile');
	$('header').css('background-color', '#594c38');

	$scope.changeUserName = function(inputData) {
		
		if($scope.usernameForm.$valid) {
			
			DB.changeUserName(inputData).then(function(data){
				
				$('.username-loading').show();

				if ( data == 'success') {
					
					$timeout(function(){
						$('.username-loading').hide();
						$scope.newUserName = inputData.username;
						$('#profileUserName').html(inputData.username);

						$scope.changeUser = {}; // empty inputs
						$scope.changeUsername = false; // hide error msgs

						$('.change-user-name-form').hide();
						$timeout(function(){
							$('.change-user-name-form').show();
							$scope.newUserName = "";
						}, 5000);
					},1000);
					
				}else {
					
					$timeout(function(){
						$('.username-loading').hide();
						$scope.usernameExsists = data;
						$('#changeUN').select();
					},1000);
				}
			});
		}
	}


	//CHANGE EMAIL
	$scope.changEmailName = function(inputData) {

		if ($scope.emailForm.$valid) {

			$('.email-loading').show();
			$('.profile-email-success').hide();

			DB.changEmailName(inputData).then(function(data){

				if ( data == 'success') {
					
					$timeout(function(){
						$('.email-loading').hide();
						$scope.newEmailName = inputData.email;

						$scope.changeEmailValidate = false; //hide error msgs
						$scope.changeEmail = {}; //empty inputs
						$scope.emailExsists = false;

						$('.change-email-name-form').hide();
						$timeout(function(){
							$('.change-email-name-form').show();
							$scope.newEmailName = "";
						}, 5000);
					},1000);
				}else {
					
					$timeout(function(){
						$('.email-loading').hide();
						$scope.emailExsists = data;
						$('#changeEmailInput').select();
					},1000);
				}
			});
		}
	}


	// CAHNGE PASSWORD
	$scope.changPassword = function(passData) {
		
		if ($scope.passwordForm.$valid) {

			$('.newPasswordName-loading').show();
			$('.profile-password-success').hide();

			DB.changPassword(passData).then(function(data){
				
				if ( data == 'success' ) {

					$timeout(function(){
						$('.newPasswordName-loading').hide();
						$scope.newPasswordName = passData.newpassword;

						$scope.changePasswordValidate = false; //hide error msgs
						$scope.changePass = {}; //empty inputs

						$('.change-password-form').hide();
						$timeout(function(){
							$('.change-password-form').show();
							$scope.newPasswordName = "";
						}, 5000);
					},1000);
				}
			});
		}
	}



	// my profile accordion
	$('.myprofile-title').on('click', function(){
	    
		if ( $(this).next().is(':visible') ) { return false;}
	    $('.profileFormContainer').slideUp();
	    $(this).next().slideDown();
	    
	    // hide error msgs and empty inputs
	    // $scope.changeUser = {};
	    // $scope.changeEmail = {};
	    // $scope.changePass = {};
	});







}]);