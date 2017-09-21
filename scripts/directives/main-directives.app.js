
// HEADER
app.directive('mainHeader', function(){

	return {
		restrict: 'AE',
		templateUrl: 'scripts/directives/template/header.html',
		replace: true
	} 
});

// HEADER - FREE/...
app.directive('freeHeader', function(){

    return {
        restrict: 'AE',
        templateUrl: 'scripts/directives/template/free-header.html',
        replace: true
    } 
});

// SUBHEADER
app.directive('mostPopular', function(){

    return {
        restrict: 'AE',
        templateUrl: 'scripts/directives/template/most-popular.html',
        replace: true
    }
});


// LOGIN/REDISTER FORM
app.directive('registerLoginForm', function(){

    return {
        restrict: 'AE',
        templateUrl: 'scripts/directives/template/register-login.html',
        replace: true
    }
});


// TESTIMONIALS
app.directive('testimonial', function(){

    return {
        restrict: 'AE',
        templateUrl: 'scripts/directives/template/testimonial.html',
        replace: true,
        scope: {
            randomNum: '@',
            allTestimonials: '='
        },
        link: function(scope, ele, attr) {
           
            if ( scope.allTestimonials.id !== scope.randomNum ) {
                ele[0].remove();    
            }
        }
    }
});

// SIDE MENU - POPULAR PAGES
app.directive('sideMenuPopular', function(){

    return {
        restrict: 'AE',
        templateUrl: 'scripts/directives/template/side-menu-popular.html',
        replace: true
        }
});

// SIDE MENU LISTUIN PAGES
app.directive('sideMenu', function(){

    return {
        restrict: 'AE',
        templateUrl: 'scripts/directives/template/side-menu.html',
        replace: true
        }
});


// PIN MENU 
app.directive('pinMenu', ['DB', '$compile', '$timeout', function(DB, $compile, $timeout){

    return {
        restrict: 'AE',
        template: '<ul class="pin-menu"><li>Pin in:</li><li ng-repeat="menuEL in pinmenulist" ng-click="pinInMenuItem(menuEL)">{{menuEL.user_menu_item_title}}</li></ul>',
        replace: true,
        scope: {
            pinmenulist: '=',
            thiseldata: '=',
            el: '='
        },
        link: function(scope, ele, attr) {

            scope.pinInMenuItem = function(menuEl) {
            
                DB.pinMenuEl(scope.thiseldata, menuEl).then(function(data){

                    if (data.success) {
                        
                        scope.thiseldata.menu_el_name = menuEl.user_menu_item_title;
                        pinMag(scope.thiseldata.listuin_item_title + ' has been added to '+menuEl.user_menu_item_title.toUpperCase()+' list.');
                        $('#pinMenu').remove();
                    }else if (data.fulllist) {
                        pinMag('Your '+menuEl.user_menu_item_title.toUpperCase()+' list is full.');
                    }
                });

                function pinMag(msg) {
                    scope.thiseldata.pinMessage = msg;
                    $timeout(function(){scope.thiseldata.pinMessage="";},2000);
                }
            }
        }
    }
}]);
