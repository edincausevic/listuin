
profile.controller('mylistController', ['$scope', '$location', '$timeout', '$routeParams', 'DB', 'Profile', 
									 function($scope, $location, $timeout, $routeParams, DB, Profile) { 

	$scope.whichPage = $location.path();
	$scope.pageParams = $routeParams.title;
	$('#profileTitle').html('My Lists');
	$('header').css('background-color', '#DD4B39');

	//GET DATA ON LOAD OR CLICK BY URL PARAMS
	$scope.$on("$routeChangeSuccess", function () { 

		// CEHECK IF THERE IS LOCAL DB
		// IF THERE IS NOT BRING DATA FROM THE DB
		if (Profile.myListsLocalData.length == 0) {

			//GET DATA FROM THE DB
			DB.getMylistsMenuLinkData({title:$routeParams.title}).then(function(data){
				
				// IF THERE IS NO DATA
				if(data.length == 0){

					$location.path('/mylists/empty');
				}
				// IF THERE IS DATA
				else{
					// SAPARATE MENU AND LIST DATA
					// STORE DB DATA IN IN LOCAL DB
					// CHECK IF /mylists AND NO PARAMS,
					// ADD PARAM FROM FIRST MENU EL
					if (!$routeParams.title) {
						angular.forEach(data, function(el, i){
							if ( i == 0 ) $location.path('/mylists/'+el.user_menu_item_title);
						});
					}else {
						separateAndCreateLocalData(data);
					}
				}
				// HIDE PRELOADER
				$('#preloader').hide();
			});
		}
		//LOAD DATA FROM SERVICE
		else {

			if (!$routeParams.title) {

				angular.forEach(Profile.myListsLocalData, function(el, i) {

					if (i == 0) $location.path('/mylists/'+el.user_menu_item_title);
				});
			}else {

				// SEND MENU DATA TO THE VIEW
				$scope.myListMenuData = Profile.myListsLocalData;

				// CHECH IF THERE IS LOCAL LISTS FOR THAT ELEMENT
				// IF NOT GET IT FROM DB - click on menu
				angular.forEach(Profile.myListsLocalData, function(menuEl){
					
					// FIND CLICKED MENU EL
					if(menuEl.user_menu_item_title == $scope.pageParams) {
						if(menuEl.listItems.length == 0) {
							
							// GET LIST DATA FROM DB BASED ON URL PARAMS
							DB.getMylistsMenuLinkData({title:$routeParams.title}).then(function(data){
								// FILTER LIST DATA AND SEND IT TO THE VIEW
								$scope.myListData = data.filter(function(list_item){
									if (list_item.user_list_item_position)
									return list_item.user_list_item_position = parseInt(list_item.user_list_item_position);	
								});
								console.log($scope.myListData)
								// STORE DATA IN LOCAL DB
								menuEl.listItems = $scope.myListData;
							});
						}
						// SEND LIST DATA TO THE VIEW
						else {
							$scope.myListData = menuEl.listItems;
						}
					}
				});
			}
		}
	});

	// LIST AND MENU OBJECTS ARE IN SAME ARRAY
	// THIS FUNCTION SAPARATES THEM AND 
	// IT CREATES LOCAL DB AND STORES THEM THERE
	function separateAndCreateLocalData(data) {

		$scope.myListMenuData;
		$scope.myListData;
		
		$scope.myListMenuData = data.filter(function(menu_item){
			if (menu_item.user_menu_item_position)
			return menu_item.user_menu_item_position = parseInt(menu_item.user_menu_item_position);
		});	
		
		$scope.myListData = data.filter(function(list_item){
			if (list_item.user_list_item_position)
			return list_item.user_list_item_position = parseInt(list_item.user_list_item_position);	
		});	

		// CREATE LOCAL DB ARRAY
		angular.forEach($scope.myListMenuData, function(menuEl){

			menuEl.listItems = [];
			
			// ITERATE TROUGH MANU ARRAY AND ATTAC LIST ITEMS ARRAY IN menuEl.listItems
			// THEN TAKE ALL OF THAT AND PUSH IT TO LOCAL DB Profile.myListsLocalData
			angular.forEach($scope.myListData, function(mEl){
				if(menuEl.user_menu_item_id == mEl.user_menu_item_id){
					menuEl.listItems.push(mEl);
				}
			});
			
			// PUSH MENU EL IN LOCAL DB ARRAY
			Profile.myListsLocalData.push(menuEl);
		});
	}




	// ********************************************************   MENU EL   ************




	// ADD NEW MENU EL - confirm modal
	$scope.addListsMenuItem = function(menuLinkEl) {

		if($scope.addListMenuForm.$valid) {
			$scope.menuTitleExsists = false;

			// CHECH IF EL NAME EXSISTS IN LOCAL DB
			angular.forEach(Profile.myListsLocalData, function(menuEl){

				if(menuEl.user_menu_item_title == menuLinkEl.name) {
					$scope.menuTitleExsists = true;
				}
			});
			
			if ($scope.menuTitleExsists == true) { return false; }

			// SET MENU EL POSTION
			if($('.profile-lists-side-menu li').length == 0) {
				menuLinkEl.position = 1;
			}else {
				menuLinkEl.position = parseFloat($('.profile-lists-side-menu li').last().attr('data-position')) + 1;
			}
			
			menuLinkEl.color = 'DD4B39';

			$('.lists-menu-title').val("");
			$('.hide-popup').fadeOut(300);

			$timeout(function() {

				// SEND DATA TO DB
				DB.saveListsMenuItem(menuLinkEl).then(function(id){
					
					if ( id >= 1 ) {
						// IF DATA IS TROED IN DB
						// CREATE EL AND STORE IT IN LOCAL DB
						var menuEl = {
							user_menu_item_title: menuLinkEl.name,
							user_menu_item_position: menuLinkEl.position,
							user_menu_item_color: menuLinkEl.color,
							user_menu_item_id: id,
							listItems: []
						}
						
						// ADD NEW MENU ITEM IN LOCAL DATA SERVICE
						Profile.myListsLocalData.push(menuEl);
						$scope.myListMenuData = Profile.myListsLocalData;
				
						// CHANGE LOCATION
						$location.path('/mylists/'+menuLinkEl.name.toLowerCase());		
						$scope.menuTitleExsists = false;

						$scope.myListsMsgBox = false;
						$scope.myListsListsButtons = false;			
					}
				}); // DB
			}, 200);

		}// if ($scope.addListMenuForm.$valid)	
	} // END


	// REMOVE MENU LIST ELEMENT - bucket icon click
	$scope.removeListsMenuItem = function(listsMenu) {

		// SHOW REMOVE LISTS MENU ELEMENT MODULE AND GIVE IT TITLE OF THE ELEMENT
		$('#removeListsMenuELModule').fadeIn(300);
		$scope.listsMenuElTitle = listsMenu.user_menu_item_title.toUpperCase();

		// REMOVE MENU EL - confirm modal
		$scope.removeThisMLEl = function() {
			
			// REMOVE MENU EL FROM DB
			DB.removeListsMenuEle(listsMenu).then(function(data){
				if ( data == 1 ) {
					$('.hide-popup').fadeOut(300);
					$scope.myListData = [];

					// REMOVE MENU EL FROM LOCAL DB
					angular.forEach(Profile.myListsLocalData, function(menuEl){
						if(menuEl.user_menu_item_id == listsMenu.user_menu_item_id) {
							Profile.myListsLocalData.splice(Profile.myListsLocalData.indexOf(listsMenu),1);
							$scope.myListMenuData = Profile.myListsLocalData;
							if(Profile.myListsLocalData.length == 0) {$('.create-menu-item').show();}
						}
					});

					if($('.profile-lists-side-menu li').length == 1) {
						$location.path('/mylists/empty');
					}else {
						// CHANGE URL HACH PARAMS TO FIRST MENU EL
						//$timeout(function(){
							//var firstElTitle = $('.profile-lists-side-menu li').first().find('span').html();
							//$location.path('/mylists/'+firstElTitle.toLowerCase());
						//},300);
						$('#listsMsg').html('<span class="greenColor">'+listsMenu.user_menu_item_title+ '</span>' + ' was successfully removed!');
						$scope.myListsMsgBox = true;
						$scope.myListsListsButtons = true;
////////////////////////////						
					}
				}
			});
		}
	}

	// CHANGE MENU TITLE - (A) icon click
	$(document).on('click', '.change-menu-title', function(e){
		$('#cmni').remove();
		var backgroundColor = $(this).closest('li').css('background-color');
		var el = $('<input>')
					.attr('type', 'text')
					.attr('id', 'cmni')
					.val($(this).prev().find('span').html())
					.css('background-color', backgroundColor);

		// SHOW INPUT WITH BACKGROUND COLOR OF THAT MANU ELEMENT
		$(this).closest('li').append(el);
		$('#cmni').select();
		setTimeout(function(){$('#cmni').focus();},200)

		// IF ESC HIDE INPUT AND IF ENTER SEND DATA TO DB
		$(document).on('keydown', function(e){
			var input = $('#cmni');

			if (input.is(':visible')) {
				if (e.keyCode === 27 || e.which === 27) {
					input.val("");
					input.remove();
				}else if (e.keyCode === 13 || e.which === 13) {

					var el = {
						title: input.val(),
						id: input.closest('li').attr('data-eleid')
					}

					// CHANGE EL TITLE IN DB
					DB.changeMenuElName(el).then(function(data){
						
						if ( data == 1 ) {
							// CHANGE LOCAL DB EL TITLE
							angular.forEach(Profile.myListsLocalData, function(menuEl){
								if(menuEl.user_menu_item_id == el.id) {
									menuEl.user_menu_item_title = el.title;
								}
							
							});
							input.remove();
							$location.path('/mylists/'+el.title);
						}
					});	
				}
			}
		});
	});




    // ********************************************************   LIST EL   ************
	


	// ADD NEW LIST EL
	$scope.addNewLinkItem = function(listItem) {
		if($scope.addNewLink.$valid) {
		
			var newLink = {
				user_list_item_title: listItem.title,
				user_list_item_url: listItem.url,
				user_list_item_position: $('#link-list li').length + 1,
				user_menu_item_id: $('.lists-menu-active').closest('li').attr('data-eleid'),
				user_list_item_color: $('.lists-menu-active').closest('li').css('background-color') 
			}

			// ADD NEW EL TO DB
			DB.addNewLink(newLink).then(function(linkId){
				var id = parseInt(linkId);
				newLink.user_list_item_id = id;

				if ( id >= 1 ) {
					$('#add-new-link').fadeOut(300);
					// ADD NEW EL TO LOCAL DB
					angular.forEach(Profile.myListsLocalData, function(menuEl){

						if(menuEl.user_menu_item_id == newLink.user_menu_item_id) {
							if(!menuEl.listItems) {menuEl.listItems = [];}
							menuEl.listItems.push(newLink);
							$scope.myListData = menuEl.listItems;
							// EMPTY ng-model
							$scope.listsLinkItem = {};
							$scope.submitedAddNewLinkItem = false;
						}
					});
				}
			});
		}
	}


	// REMOVE LIST ITEM - LINK
	$scope.removeListItemModel = function(listItem){
		
		$('#removeListELModule').fadeIn(300);
		$scope.listsElTitle = listItem.user_list_item_title;
		var menuElId = $('.lists-menu-active').closest('li').attr('data-eleid');
		
		$scope.removeThisLEl = function() {
			
			DB.removeLitsEl(listItem).then(function(data){

				if (data == 1) {
					$('#removeListELModule').fadeOut(300);

					angular.forEach(Profile.myListsLocalData, function(menuEl){

						if(menuEl.user_menu_item_id == menuElId) {
							var list = menuEl.listItems;
							angular.forEach(menuEl.listItems, function(listEl){
								if(listEl.user_list_item_id == listItem.user_list_item_id) {
									list.splice(list.indexOf(listEl), 1);
									$scope.myListData = menuEl.listItems;
								}
							});

						}
					}); 
				}
			});
		}
		
	}

	// CHANGE LIST TITLE
	$(document).on('click', '.change-link-title', function(e){

		// GET LINK TEXT FROM LOCAL db
		var linkId = $(e.target).closest('li').attr('data-id');
		var text;
		angular.forEach(Profile.myListsLocalData, function(menuEl){
			angular.forEach(menuEl.listItems, function(link){
				if(link.user_list_item_id == linkId) {
					text = link.user_list_item_title;
				}
			});
		});

		$('#newListItemTitle').remove();
		var backgroundColor = $(this).next().find('p').css('background-color');
		var el = $('<input>')
					.attr('type', 'text')
					.attr('id', 'newListItemTitle')
					.val(text)
					.css('background-color', backgroundColor);
		
		// show input with background color of that manu element
		$(this).closest('li').append(el);
		$('#newListItemTitle').focus();
		setTimeout(function(){$('#newListItemTitle').focus();},300);
		
		// if esc hide input and if enter send data to DB
		$(document).on('keydown', function(e){
			var input = $('#newListItemTitle');
			
			if (input.is(':visible')) {

				if (e.keyCode === 27 || e.which === 27) {
					input.val("");
					input.remove();
				}else if (e.keyCode === 13 || e.which === 13) {

					var el = {
						user_list_item_title: input.val(),
						user_list_item_id: input.closest('li').attr('data-id')
					}
					
					// change DB list el title
					DB.cahngeLitsElName(el).then(function(data){
						
						if ( data == 1 ) {						
							// change local data title
							var menuElActive = $('.lists-menu-active').closest('li').attr('data-eleid');
							
							angular.forEach(Profile.myListsLocalData, function(menuEl){
								if(menuEl.user_menu_item_id == menuElActive) {
									angular.forEach(menuEl.listItems, function(liEl){
										if (liEl.user_list_item_id == el.user_list_item_id) {
										
											liEl.user_list_item_title = el.user_list_item_title;
										}
									});
								}
							});
							$('#newListItemTitle').remove();
						}
					});	
				}
			}
		});
	});

	$(document).on('click', '.hash-check', function(e){
		if(!$(this).attr('href')) e.preventDefault();
	});











}]);