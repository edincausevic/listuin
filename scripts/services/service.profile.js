
profile.service('DB', ['$http', function($http){
	
	this.xhr = function(method, data, url) {
		req = {
			method: method,
			data: data,
			url: url
		}

		return $http(req).then(function(result){
			return result.data;
		});
	},
	this.profileData = function() {
		return this.xhr('GET', null, 'includes/profile-data.php');
	},
	this.logout = function() {
		return this.xhr('GET', null, 'includes/logout.php');
	},
	this.getProfileData = function() {
		return this.xhr('GET', null, 'includes/get-mylists.php');
	},
	this.saveListsMenuItem = function(menuLink) {
		return this.xhr('POST', menuLink, 'includes/save-menu-item.php');
	},
	this.removeListsMenuEle = function(menuLink) {
		return this.xhr('POST', menuLink, 'includes/remove-lists-menu-el.php');
	},
	this.changeMenuElName = function(newMenuElTitle) {
		return this.xhr('POST', newMenuElTitle, 'includes/change-lists-menu-name.php');
	},
	this.addNewLink = function(listItem) {
		return this.xhr('POST', listItem, 'includes/add-new-link.php');
	},
	this.removeLitsEl = function(listItem) {
		return this.xhr('POST', listItem, 'includes/remove-mylists-list-item.php');
	},
	this.cahngeLitsElName = function(listItem) {
		return this.xhr('POST', listItem, 'includes/change-list-el-name.php');
	},
	this.getMylistsMenuLinkData = function(urlParameterMenuTitle) {
		return this.xhr('POST', urlParameterMenuTitle, 'includes/list-menu-data.php');
	},
	this.changeUserName = function(inputData) {
		return this.xhr('POST', inputData, 'includes/change-username.php');
	},
	this.changEmailName = function(inputData) {
		return this.xhr('POST', inputData, 'includes/change-email.php');
	},
	this.changPassword = function(inputData) {
		return this.xhr('POST', inputData, 'includes/change-password.php');
	},
	this.getMyCodeMenuData = function(urlParameterMenuTitle) {
		return this.xhr('POST', urlParameterMenuTitle, 'includes/get-code-menu.php');
	},
	this.getCodeMenuData = function(menuItemId) {
		return this.xhr('POST', menuItemId, 'includes/get-code-menu-data.php');
	},
	this.addNewCodeMenuEl = function(inputData) {
		return this.xhr('POST', inputData, 'includes/add-new-code-menu.php');
	},
	this.removeCodeMenuEl = function(menuEl) {
		return this.xhr('POST', menuEl, 'includes/remove-code-menu.php');
	},
	this.removeCodeSubmenuEl = function(menuEl) {
		return this.xhr('POST', menuEl, 'includes/remove-code-submenu.php');
	},
	this.changeCodeMenuName = function(menuEl) {
		return this.xhr('POST', menuEl, 'includes/change-code-menu-name.php');
	},
	this.addSubmenuEl = function(inputData) {
		return this.xhr('POST',inputData, 'includes/add-submenu.php');
	},
	this.saveCode = function(code) {
		return this.xhr('POST', code, 'includes/add-code.php');
	},
	this.editCode = function(code) {
		return this.xhr('POST', code, 'includes/edit-code.php');
	}
}]);

profile.service('Profile', function(){

	this.myListsLocalData = [],
	this.myCodeLocalData = []
});