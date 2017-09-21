
// ADD LISTS MENU ITEM MODEL
profile.directive('addListMenuItem', function(){

	return {
		restrict: 'AE',
		templateUrl: 'scripts/directives/template/add-list-menu-item.html',
		replace: true
	}
});

// REMOVE LISTS MENU ELEMENT
profile.directive('removeListsMenuElModule', function(){

	return {
		restrict: 'AE',
		templateUrl: 'scripts/directives/template/remove-lists-menu-el.html',
		replace: true
	}
});

// ADD NEW LINK IN MY LIST
profile.directive('addNewListLink', function(){

	return {
		restrict: 'AE',
		templateUrl: 'scripts/directives/template/add-list-link.html',
		replace: true
	}
});

// REMOVE LINK IN MY LIST
profile.directive('removeMyListsLink', function(){

	return {
		restrict: 'AE',
		templateUrl: 'scripts/directives/template/remove-lists-list-el.html',
		replace: true
	}
});


// ADD CODE MENU EL
profile.directive('addCodeMenuEl', function(){

	return {
		restrict: 'AE',
		templateUrl: 'scripts/directives/template/add-code-menu-el.html',
		replace: true
	}
});

profile.directive('removeCodeMenuEl', function(){

	return {
		restrict: 'AE',
		templateUrl: 'scripts/directives/template/remove-code-menu-el.html',
		replace: true
	}
});

profile.directive('addNewSubmenu', function(){

	return {
		restrict: 'AE',
		templateUrl: 'scripts/directives/template/add-new-submenu.html',
		replace: true
	}
});