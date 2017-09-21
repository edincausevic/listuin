

app.service('listuinData', ['$http', function($http){

	this.getListuinData = function(whichPage) {

		req = {
			method: 'POST',
			data: whichPage,
			url: 'includes/get-listuin-lists.php'
		}

		return $http(req).then(function(response){
			return response.data;
		});
	},
	this.getHeaderAndHeadData = function() {

		req = {
			method: 'GET',
			url: 'data/pages-data.json'
		}

		return $http(req).then(function(response){
			return response.data;
		});
	}
}]);

app.service('DB', ['$http', function($http){

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
	this.registerUser = function(user) {

		return this.xhr('POST', user, 'includes/registration.php');
	}
	this.loginUser = function(user) {
		// stari login
		return this.xhr('POST', user, 'includes/login.php');
	},
	this.retrivePassword = function(email) {

		return this.xhr('POST', email, 'includes/retrive-pass.php');
	},
	this.logout = function() {
		return this.xhr('GET', null, 'includes/logout.php');
	},
	this.checkForSessCook = function() {
		return this.xhr('GET', null, 'includes/check-if-loggedin.php');
	},
	this.pinEl = function(pienedItem) {
		return this.xhr('POST', pienedItem, 'includes/pin-el.php');
	},
	this.pinMenuEl = function(pienedItem, menuEl) {

		var data = { 
			pinedItemID: pienedItem.listuin_item_id, 
			menuElID: menuEl.user_menu_item_id,
			menuName: menuEl.user_menu_item_title,
			title: pienedItem.listuin_item_title,
			url: pienedItem.listuin_item_url
		};
		return this.xhr('POST', data, 'includes/pin-menu-el.php');
	}
}]);