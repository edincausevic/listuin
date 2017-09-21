app.controller('mainController', ['$scope', '$location', '$timeout', '$compile', '$interval', 'listuinData', 'DB', 
                        function($scope, $location, $timeout, $compile, $interval, listuinData, DB){
               

    // SET PAGE HASH LINK AND UPDATE DATA                        
    $scope.whichPage = $location.path();
    $(window).on('hashchange', function(){

        $scope.whichPage = $location.path(); 
        $scope.$apply();
        $scope.changeHeadAndHeader();
    });

    
    $scope.changeHeadAndHeader = function() {

        listuinData.getHeaderAndHeadData().then(function(data){
            angular.forEach(data, function(header){

                if ( $scope.whichPage == header.page ) {
                   
                    // SET THE PAGE HEADER
                    $scope.header = header;
                    $scope.headerImage = $scope.header.imageClass[0];

                    //SET THE PAGE HEAD
                    $('#title').attr('content', $scope.header.title);
                    $('#keywords').attr('content', $scope.header.keywords);
                    $('#description').attr('content', $scope.header.description);
                }
            });
        });  
    }
    $scope.changeHeadAndHeader();

    


    // CREATE AN ACCOUNT
    $scope.registration = function() {

    	if ($scope.registerForm.$valid && 
    		$scope.registerUser.password == $scope.registerUser.password2) {

            // registration animation
            $('#formLoadingAnimationBig').show();
            $('#registerContainer').hide();
            
            $timeout(function(){

                DB.registerUser($scope.registerUser).then(function(data){
                
                    if (data == 1) {
                        if (!localStorage.iwasregistred) {
                            localStorage.setItem('iwasregistred', true);
                        }
                        localStorage.setItem('loginEmail', $scope.registerUser.email)
                        window.location = 'profile.php#/mylists';
                    }else {
                        $('#formLoadingAnimationBig').hide();
                        $('#registerContainer').show();
                        $scope.registrationErrorMsg = data;
                    }
                }); 
            }, 1000);	
    	}
    }


    $scope.login = function() {
       
        if($scope.loginForm.$valid) {
         
            DB.loginUser($scope.loginUser).then(function(data){
              
                $scope.loginFormLoader = true;
                if (!localStorage.iwasregistred) {
                    localStorage.setItem('iwasregistred', true);
                }
                localStorage.setItem('loginEmail', $('#loginEmail').val());

                if ( data == 1 ) {
                   window.location = 'profile.php#/mylists';
                }else {
                    $scope.loginErrorMsg = data;
                    $scope.loginFormLoader = false;
                }
            });
        }
    }
    

    $scope.retrivePass = function() {
        if ($scope.retriveEmailForm.$valid) {
            $scope.retrivePassFormLoader = true;

            DB.retrivePassword($scope.retriveEmailAddress).then(function(data){
               
                if (data) {
                    $scope.retrivePasswordMsg = data;
                    $scope.retrivePassFormLoader = false;
                }
            });
        }
    }

    // CHECK IF THERE IS A COOKIE
    $scope.checkIfLoggedIn = function() {
        
        DB.checkForSessCook().then(function(data){

            $scope.loginStateWich = data; 
            if (data == 1) {
                $scope.profileName = localStorage.profileName;
            }
        });    
    }
    $scope.checkIfLoggedIn();




    // PIN LISTUIN INTEM IN LIST
    $scope.pinItemInLists = function(e, item) {

        var target = e.target;
        var menuELName;
       
        if(target.parentElement.getAttribute("data-msg")) {
            pinMsg(target.parentElement.getAttribute("data-msg"));
        }else {
            
            DB.pinEl(item).then(function(data){ 
                if (data.success) {
                	
                    pinMsg(item.listuin_item_title + ' has been added to ' + data.success.toUpperCase() + ' list.');
                    target.parentElement.setAttribute("data-msg", 'You have ' + item.listuin_item_title + ' in ' + data.success.toUpperCase() + ' list.');
                }else if (data.lr) {

                    pinMsg(data.lr);
                    $('.pin').closest('li').attr('data-msg', data.lr);
                }else if (data.noMenuEL) {

                    pinMsg(data.noMenuEL);
                    $('.pin').closest('li').attr('data-msg', data.noMenuEL);
                }else if (data.menu) {
                   
                    $('.pin-menu').remove();
                    $scope.pinMenuList = data.menu;

                    $scope.thisElData = item; 
                    $scope.thisEl = target;
                   
                    $scope.modal = '<pin-menu id="pinMenu" pinmenulist="pinMenuList" thiseldata="thisElData" el="thisEl"></pin-menu>';
                    target.closest('li').append($compile($scope.modal)($scope)[0]);
                }else if (data.fulllist) {
                    pinMsg(data.fulllist);
                    $('.pin').closest('li').attr('data-msg', data.fulllist);
                }
            });
        }

        $(document).on('click', function(e){

            if ($('#pinMenu').is(':visible') &&
                e.target !== $('.pin')) {
                $('#pinMenu').hide();
            }
        })


         function pinMsg(msg) {
            item.pinMessage = msg;
            $timeout(function(){item.pinMessage="";},2000);
        }

    }


    // TESTIMONIALS
    $scope.randomNumForTes = Math.round(Math.random()*2) + 1;
    $scope.testimonials = [
        {
            id: '1',
            img: 'img/testimonial1.jpg',
            comment: '“ Before I discoverd this website I literely had fifthine tabs reserved for web designecontant, now I have one. Thank you :) “'
        },
        {   
            id: '2',
            img: 'img/testimonial2.jpg',
            comment: '“ Thank you so much for this website! The content quality is incredible and almost everything is very useful to me. “'
        },
        {
            id: '3',
            img: 'img/testimonial3.jpg',
            comment: '“ Great website, content is very useful and it helps me alot in my work. You guys have made my life easier. “'
        }
    ];



    // ON LOAD SETUP
    $scope.loginUser = {}
    // add email from localStorage to scope
    if (localStorage.loginEmail) { $scope.loginUser.username = localStorage.loginEmail;}
    $scope.loginUser.remeberme = 'a'; // set default value so its not undefind
    $scope.checkForSideProfileButton = function() {
        if ($scope.whichPage !== '/' && $scope.loginStateWich == 0) return 1;
    }

}]);