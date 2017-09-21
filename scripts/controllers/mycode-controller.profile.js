
profile.controller('mycodeController', ['$scope', '$location', '$routeParams', '$timeout', 'Profile', 'DB',
								function($scope, $location, $routeParams, $timeout, Profile, DB){

	// ON LOAD SETUP								
	$scope.whichPage = $location.path();
	$scope.pageParams = $routeParams.title;
	$('#profileTitle').html('My Code');
	$('header').css('background-color', '#2aa55e');
	

	$scope.accordion = {current: null};

	//GET DATA ON LOAD 
	// CEHECK IF THERE IS LOCAL DB
	// IF THERE IS NOT BRING DATA FROM THE DB
	if (Profile.myCodeLocalData.length == 0) {
		
		//GET DATA FROM THE DB
		DB.getMyCodeMenuData().then(function(data){
			
			if (data) {
				// HIDE PRELOADER
				$('#preloader').hide();
			}

			// IF THERE IS NO DATA
			if(data == 'empty'){
				//$location.path('/mycode/empty');
				if (Profile.myCodeLocalData.length == 0) { 
					$scope.myCodeMsgBox = true;
					$('#codeMsg').html("Please create menu element."); 
				}
			}
			// IF THERE IS DATA
			else {
			
				// SEND DATA TO VIEW AND LOCAL DB
				$scope.myCodeMenu = data;
				Profile.myCodeLocalData = data;
				if (Profile.myCodeLocalData.length == 0) { 
					$scope.myCodeMsgBox = true;
					$('#codeMsg').html("Please create menu element."); 
				}else {
					$scope.codeDefaultTemplate();
				}
			}
		});    
	}
	//LOAD DATA FROM SERVICE
	else {
		$scope.myCodeMenu = Profile.myCodeLocalData;
		Profile.codeDefaultTemplate();
	}


	// MENU CLICK
	$scope.codeMenu = function(e, menuEl) {
		var menuElement = $(e.target);
		var menuElId = menuEl.user_code_menu_item_id;
		
		if (menuElement.hasClass('main-code-menu')) {
			$scope.appendSubmenuButton(menuElement, menuElId);
		}
		if (menuElement.hasClass('menu-title'))	{
			$scope.appendSubmenuButton(menuElement, menuElId);
		}
	}

	// APPEND SUBMENU BUTTON
	$scope.appendSubmenuButton = function(menuElement, menuElId) {
		// CHECHK FOR SUBMENU LENGTH AND APPEND ADD SUBMENU BUTTON
			$('#addNewSubmenu').remove();
			// if(menuElement.closest('li').find('ul').find('li').length <= 15) {

				var addSubmenuBtn = $('<li>')
									.attr('data-eleid', menuElId)
									.attr('id', 'addNewSubmenu')
									.html('<i class="fa fa-plus" aria-hidden="true"></i> add new submenu');
				
				menuElement.closest('li').append(addSubmenuBtn);
			// }
	}

	$(window).on('resize load', function(){
		$scope.windowWidth = $(window).width();
	});

	// SUBMENU CLICK
	$scope.getMyCode = function(e, submenuEl) {
		var thisEl = $(e.target);

		// check the window width
		if ($scope.windowWidth < 1007) {
			$('.asideMenu').hide(); // hide menu on mob
			
			// SHOW CODE DATA
			$('.main-items').show();
		}
	
		// ACTIVE CLASS CHANGE
		$('.mycode-submenu').find('span').removeClass('list-code-menu-active');
		thisEl.find('span').addClass('list-code-menu-active');

		//CHECK IF DATA IS LOADED IN LOCAL DB
		var mainMenuId = thisEl.attr('data-menu-eleId');
		var submenuId = submenuEl.user_code_menu_item_id;

		// CHECK IF CODE DATA IS STORED IN LOCAL DB AND GET THE DATA
		$scope.getCode(submenuEl, mainMenuId, submenuId);
	}

	$scope.getMyCodeSpan = function(e, submenuEl) {
		e.stopPropagation();
		e.preventDefault();

		var thisEl = $(e.target);

		// ACTIVE CLASS CHANGE
		$('.mycode-submenu').find('span').removeClass('list-code-menu-active');
		thisEl.addClass('list-code-menu-active');

		//CHECK IF DATA IS LOADED IN LOCAL DB
		var mainMenuId = thisEl.parent().attr('data-menu-eleId');
		var submenuId = submenuEl.user_code_menu_item_id;

		// CHECK IF CODE DATA IS STORED IN LOCAL DB AND GET THE DATA
		$scope.getCode(submenuEl, mainMenuId, submenuId);
	}


	// CHECK IF CODE DATA IS STORED IN LOCAL DB AND GET THE DATA
	$scope.getCode = function(submenuEl, mainMenuId, submenuId) {
		$scope.addCodeState = true; // show add/edit btn
		angular.forEach(Profile.myCodeLocalData, function(menuEle){
			if(menuEle.user_code_menu_item_id == mainMenuId) {
				angular.forEach(menuEle.menu_submenu, function(submenuEle){
					if (submenuEle.user_code_menu_item_id == submenuId) {
						
						// GET MENU FROM LOCAL DB
						if(submenuEle.user_menu_code) {
							
							// CREATE PRE ELE WITH HTML COODE AND RUN COLOR FUNCTION
							if (submenuEle.user_menu_code == 'NO CODE') {
								$scope.myCodeMenuCode = 'NO CODE';
								$('#codeContainer').remove();
							}else {
								$scope.createAndColorCode(submenuEl.user_menu_code);
								$scope.myCodeMenuCode = "";
							}
							$scope.myCodeMsgBox = false; // hide item removed msg
							$scope.hideEditButtons(); 
							$('.code-editor').remove(); // remove code editor
						}else {
							// GET MENU CODE DATA FROM DB
							DB.getCodeMenuData({menuId: submenuEl.user_code_menu_item_id}).then(function(data){
								var menuItemId = submenuEl.user_code_menu_item_id;
								
								$scope.myCodeMsgBox = false; // hide item removed msg
								$scope.hideEditButtons(); 
								$('.code-editor').remove(); // remove code editor

								if (data == 'no-code') {
									$('#codeContainer').remove();
									Profile.codeSubmenuTemplate();
									submenuEle.user_menu_code = $scope.myCodeMenuCode;
								}else {
									// CREATE PRE ELE WITH HTML COODE AND RUN COLOR FUNCTION
									$scope.createAndColorCode(data);
									$scope.myCodeMenuCode = "";											

									// SAVE CODE DATA TO LOCAL db
									angular.forEach(Profile.myCodeLocalData, function(menuEle){
										if(menuEle.user_code_menu_item_id == mainMenuId) {

											angular.forEach(menuEle.menu_submenu, function(submenuEle){
												
												if (submenuEle.user_code_menu_item_id == submenuId) {
													submenuEle.user_menu_code = data;
												}
											});
										}
									}); 
								} 

							});
						}
					}
				});
			}
		});
	}

	$scope.createAndColorCode = function(code) {
		// CREATE PRE ELE WITH HTML COODE AND RUN COLOR FUNCTION
		var myCode = code.replace(/</g, '&#60;');
			myCode = myCode.replace(/>/g, '&#62;');
			
		$('#codeContainer').remove();
		$('#myCode').append($('<pre>')
							.attr('class', 'prettyprint code')
							.attr('id', 'codeContainer')
							.html(JSON.parse(myCode)));
		$('#myCode').ready(function(){ PR.prettyPrint() })
	}

	// SHOW ADD CODE MENU MODULE
	$(document).on('click', '.add-menu-code-item', function(){

	    $('#add-code-menu-item').fadeIn(300);
	    $('#lists-code-title').val("");
	    $('#lists-code-title').focus();
	});

	// ADD NEW CODE MANU EL
	$scope.addCodeMenuItem = function(inputData) {
		$scope.menuTitleExsists = false;

		// IF ERROR MSG IS VISIBLE
		if ($('.cmem').is(':visible')) { return false;}
		else {
			// CHECK IF LOCAL DATA IS EMPTY
			if (Profile.myCodeLocalData.length === 0) {
				saveToDB(inputData);
				$('#codeMsg').html("Click on the menu and create submenu for your code snipet."); 
			// IF LOCAL DATA IS NOT EMPTY	
			}else {
				// CHECK IF TITLE EXSISTS
				angular.forEach(Profile.myCodeLocalData, function(menuEl){
					if (menuEl.user_code_menu_title == inputData.name) {
						$scope.menuTitleExsists = true;
					}	
				});

				if ($scope.menuTitleExsists === false) {
					saveToDB(inputData);
				}
			}
			

			function saveToDB() {
				DB.addNewCodeMenuEl(inputData).then(function(id){
				
					if (id >= 1) {

						var newCodeMenu = {
							user_code_menu_title: inputData.name,
							user_code_menu_item_id: id,
							user_code_submenu_id: null
						}

					// ADD NEW CODE MENU TO LOCAL DB	
					Profile.myCodeLocalData.push(newCodeMenu);	
					$scope.myCodeMenu = Profile.myCodeLocalData;
					$('#add-code-menu-item').fadeOut(300);
					}
				});
			}
		}
	}

	// REMOVE MENU ITEM
	$scope.removeCodeMenuItem = function(e, menuItem) {

		$('#removeCodeMenuELModule').fadeIn(300);
		$scope.removeMenuELName = menuItem.user_code_menu_title.toUpperCase();
		
		var menuElems = {
			mainMenuId: menuItem.user_code_menu_item_id,
			submenusIds: []
		};
		var submenuElems = $(e.target).closest('li').find('.submenu li');

		angular.forEach(submenuElems, function(submenus){
			menuElems.submenusIds.push($(submenus).attr('data-sbumenu-Id'));
		});

		$scope.removeThisCodeMLEl = function() {

			DB.removeCodeMenuEl(menuElems).then(function(data){
				
				if (data == 1) {

					$('#removeCodeMenuELModule').fadeOut(300);
					$('#addNewSubmenu').remove(); // remove add submenu btn

					// CLOSE MENU AND HIDE MENU ACTIVE CLASS
					$('.mycode-submenu span').removeClass('list-code-menu-active');
					
					// SHOW ITEM REMOVED MSG
					var menuTitle = menuItem.user_code_menu_title.slice(0,1).toUpperCase() + menuItem.user_code_menu_title.slice(1);
					$('#codeMsg').html('<span class="greenColor">'+menuTitle+ '</span>' + ' was successfully removed!');
					$scope.myCodeMsgBox = true;
					$('#codeContainer').hide();
					
					// REMOVE MENU EL WITH HES SUBMENUS FROM LOCAL DB
					angular.forEach(Profile.myCodeLocalData, function(menuEl){
						if (menuEl.user_code_menu_item_id == menuItem.user_code_menu_item_id) {
							Profile.myCodeLocalData.splice(Profile.myCodeLocalData.indexOf(menuEl), 1);
							// send menu to view
							$scope.myCodeMenu = Profile.myCodeLocalData;
							$scope.hideAllButtons();
						}
					});
				}
			});
		}
	}



	// CHANGE MENU TITLE - (A) icon click
	$scope.changeCodeMenuTitle = function(e, menuItem) {
		e.stopPropagation();
		$('#cmni').remove(); var backgroundColor, el;
		$('#cmni-sub').remove();

		$('#addNewSubmenu').remove(); // remove add new submenu btn
		$scope.accordion = {}; // hide all submenu el
		
		backgroundColor = $(e.target).closest('li').css('background-color');
		el = $('<input>')
			.attr('type', 'text')
			.attr('id', 'cmni')
			.attr('class', 'changeCMN')
			.val(menuItem.user_code_menu_title)
			.css('background-color', backgroundColor);

			// SHOW INPUT WITH BACKGROUND COLOR OF THAT MANU ELEMENT
			$(e.target).closest('li').append(el);
			$('#cmni').select();
			setTimeout(function(){$('#cmni').focus();},200);
		
		// IF ESC HIDE INPUT AND IF ENTER SEND DATA TO DB
		$(document).on('keydown', function(e){
			var input = $('.changeCMN');

			if (input.is(':visible')) {
				if (e.keyCode === 27 || e.which === 27) {
					input.val("");
					input.remove();
				}else if (e.keyCode === 13 || e.which === 13) {

					var menuEl = {
						title: input.val(),
						id: input.closest('li').attr('data-eleid')
					}
		
					// CHANGE EL TITLE IN DB
					DB.changeCodeMenuName(menuEl).then(function(data){
						
						if ( data == 1 ) {
							// CHANGE LOCAL DB EL TITLE
							angular.forEach(Profile.myCodeLocalData, function(menuEle){
								
								if(menuEle.user_code_menu_item_id == menuEl.id) {
									menuEle.user_code_menu_title = menuEl.title;
									$(document).unbind('keydown');
								}
							});
							input.remove();
						}
					});
				}
			}
		});
	}

	// ADD NEW SUBMENU
	$('ul#codeMenu').on('click', '#addNewSubmenu', function(e) {

		var mainMenuID = $(this).attr('data-eleid');
		$scope.submenuTitleExsists = false;

		$('#add-new-submenu').fadeIn(300);
		$('#lists-submenu-title').val("");
		$('#lists-submenu-title').focus();

		$scope.addCodeSubmenuItem = function(inputData) {
		
			if ($scope.addListSubmenuForm.$valid) {

				var el = {
					user_code_menu_title: inputData.user_code_menu_title,
					user_code_submenu_id: mainMenuID
				}

				// CHECK IF TITLE EXSISTS IN SUBMENU ARRAY
				angular.forEach(Profile.myCodeLocalData, function(mEl) {
					if(mEl.user_code_menu_item_id == el.user_code_submenu_id) {
						angular.forEach(mEl.menu_submenu, function(submEle){
							if (submEle.user_code_menu_title == el.user_code_menu_title) {
								$scope.submenuTitleExsists = true;
							}
						});
					}
				});
				
				if ($scope.submenuTitleExsists === false) {
					
					DB.addSubmenuEl(el).then(function(id){
					
						if ( id >= 1 ) {

							el.user_code_menu_item_id = id;
							$('#add-new-submenu').fadeOut(300);

							// empty and hide code msg box
							$('#codeMsg').html(); 
							$scope.myCodeMsgBox = false;

							// CREATE NEW SUBMENU TEMPLATE
							$scope.codeSubmenuTemplate();
							$scope.addCodeState = true; // show add/edit btn
							
							// ADD TO LOCAL DB
							angular.forEach(Profile.myCodeLocalData, function(menuEl){
								if(menuEl.user_code_menu_item_id == el.user_code_submenu_id) {
									if (!menuEl.menu_submenu) {
										menuEl.menu_submenu = [];
										menuEl.menu_submenu.push(el);
									}else {
										$scope.meunLength = menuEl.menu_submenu.length + 1;
										menuEl.menu_submenu.push(el);
									}
								}
							});
							// // ADD SCTIVE MENU CLASS
							$('#codeMenu').ready(function(){
								$('.profile-code-side-menu a span').removeClass('list-code-menu-active');
								$('[data-sbumenu-eleid="'+el.user_code_menu_item_id+'"]').find('span').addClass('list-code-menu-active');
							})
							$scope.myCodeMenu = Profile.myCodeLocalData;
						}
					});
				}
			}
		}
	});

	// CHANGE SUBMENU TITLE
	$scope.changeCodeSubmenuTitle = function(e, submenuEl) {
		e.stopPropagation();
		$('#cmni').remove(); var backgroundColor, el;
		$('#cmni-sub').remove();

		backgroundColor = $(e.target).closest('li').find('a').css('background-color');
		el = $('<input>')
			.attr('type', 'text')
			.attr('id', 'cmni-sub')
			.attr('class', 'changeCMN')
			.val(submenuEl.user_code_menu_title)
			.css('background-color', backgroundColor);

			// SHOW INPUT WITH BACKGROUND COLOR OF THAT MANU ELEMENT
			$(e.target).closest('li').append(el);
			$('#cmni-sub').select();
			setTimeout(function(){$('#cmni-sub').focus();},200);

			$(document).on('keydown', function(e){
				var input = $('.changeCMN');

				if (input.is(':visible')) {
					if (e.keyCode === 27 || e.which === 27) {
						input.val("");
						input.remove();
					}else if (e.keyCode === 13 || e.which === 13) {
					
						var menuEl = {
							title: input.val(),
							id: submenuEl.user_code_menu_item_id
						}

						//CHANGE EL TITLE IN DB
						DB.changeCodeMenuName(menuEl).then(function(data){
							
							if ( data == 1 ) {
								// CHANGE LOCAL DB EL TITLE
								angular.forEach(Profile.myCodeLocalData, function(menuEle){
									angular.forEach(menuEle.menu_submenu, function(submenuEl){
										if(submenuEl.user_code_menu_item_id == menuEl.id) {
											submenuEl.user_code_menu_title = menuEl.title;
										}
									});
								});
								input.remove();
								$(document).unbind('keydown');
							}
						});
					}
				}
			});
		
	}

	
	// REMOVE SUBMENU EL
	$scope.removeCodeSubmenuItem = function(e, submenuEl) {

		$('#removeCodeMenuELModule').fadeIn(300);

		$scope.removeMenuELName = submenuEl.user_code_menu_title;
		var mainMenuId = $(e.target).closest('li').find('a').attr('data-menu-eleid');
		
		$scope.removeThisCodeMLEl = function() {

			DB.removeCodeSubmenuEl(submenuEl).then(function(data){
				
				if (data == 1) {
					// HIDE MODULE
					$('#removeCodeMenuELModule').fadeOut(300);

					// CLOSE MENU AND HIDE MENU ACTIVE CLASS
					$('.mycode-submenu span').removeClass('list-code-menu-active');
					
					// SHOW ITEM REMOVED MSG
					$scope.myCodeMsgBox = true;
					var menuTitle = submenuEl.user_code_menu_title.slice(0,1).toUpperCase() + submenuEl.user_code_menu_title.slice(1);
					$('#codeMsg').html('<span class="greenColor">'+menuTitle+ '</span>' + ' was successfully removed!');

					// REMOVE CODE BOX
					$('#myCode').html("");

					//REMOVE EL FROM LOCAL DB
					angular.forEach(Profile.myCodeLocalData, function(menuEl){

						if (menuEl.user_code_menu_item_id == mainMenuId) {
							angular.forEach(menuEl.menu_submenu, function(submenuEle) {
								if(submenuEle.user_code_menu_item_id == submenuEl.user_code_menu_item_id) {
									menuEl.menu_submenu.splice(menuEl.menu_submenu.indexOf(submenuEle), 1);
									$scope.myCodeMenu = Profile.myCodeLocalData;
									$scope.hideAllButtons();
								}
							});
						}
					});
				}
			});
		}
	}


	// CODE DEFAULT TEMPLATE
	$scope.codeDefaultTemplate = function() {

		var code = "\r\n// Supports all C-like, Bash-like, and XML-like languages.\r\n// No need to specify the language.\r\n// To search trough code use Ctrl + F.\r\n// Thank you for using listuin.com\r\n\r\n\r\n\
/*---- CODE SAMPLE ----*/\r\n\
// A Basic Example of Closures in JavaScript\r\n\
function showName (firstName, lastName) {\r\n\
  var nameIntro = \"Your name is \";\r\n\r\n\
  // this inner function has access to the outer function's variables, including the parameter​\r\n\
​  function makeFullName () { \r\n\
    return nameIntro + firstName + \" \" + lastName;\r\n \
  }\r\n\r\n \
  return makeFullName (); \r\n \
}\r\n\r\n \
// Your name is Michael Jackson\r\n \
showName (\"Michael\", \"Jackson\"); \r\n\r\n ";

$scope.createAndColorCode(JSON.stringify(code));
}
// ADD FUNCTION TO Profile SERVICE
Profile.codeDefaultTemplate = $scope.codeDefaultTemplate;


// CODE DEFAULT CREATE NEW SUBMENU
$scope.codeSubmenuTemplate = function() {

		var code = "// To add your code click on Add/Edit button!";

$scope.createAndColorCode(JSON.stringify(code));
}
// ADD FUNCTION TO Profile SERVICE
Profile.codeSubmenuTemplate = $scope.codeSubmenuTemplate;




// ------------------------ CODE EDITOR

$scope.editCode = function() {
	var codeBlock, codeEditor, code, mainMenuId, submenuId;

	// check the window width
	if ($scope.windowWidth < 1007) {
		$('.asideMenu').hide(); // hide menu on mob
	}

	mainMenuId = $('.list-code-menu-active').parent().attr('data-menu-eleid');
	submenuId = $('.list-code-menu-active').parent().attr('data-sbumenu-eleid');

	// GET THE CODE FROM LOCAL DB
	angular.forEach(Profile.myCodeLocalData, function(menuEl){
		if (menuEl.user_code_menu_item_id == mainMenuId) {
			angular.forEach(menuEl.menu_submenu, function(submenu){
				if (submenu.user_code_menu_item_id == submenuId) {

					if (submenu.user_menu_code) {
						code = submenu.user_menu_code;
						codeBlock = $('<textarea>')
									.attr('class', 'code-editor')
		   							.val(JSON.parse(code));
		   				$scope.saveEdit = 'edit';			
					}else {
						codeBlock = $('<textarea>')
									.attr('class', 'code-editor')
									.val("");
						$scope.saveEdit = 'save';		
					}
					
					codeEditor = $('<pre>').attr('class' , 'code-editor-holder')
										   .html(codeBlock);

				}
			});
		}
	});
	
	//ADD CODE EDITOR
	$('#myCode').append(codeEditor);
	$('.code-editor').focus();
	$('#codeContainer').hide(); // hide code

	// BUTTON CONTROL
	$scope.addCodeState = false;
	$scope.saveCodeState = true;
	$scope.cancelCodeState = true;

	// TANKE CODE FROM TEXTAREA AND REPLACE SPACE WITN TWO EMPY PLACES
	$('.code-editor').on('input propertychange', function(){
	  var textareaCode = $(this).val();
	  
	  if(textareaCode.length > 0) {
	      $('.code-editor').val(function() {
	       return this.value.replace(/\t/g, '  ');
	    });
	  }
	});
}

// CODE CONTAINER TAB BUTTON REPLACE WITH 2 SPACES
// $(document).on('keydown', '.code-editor', function(e){
// 	var keyCode = e.keyCode || e.which;
// 	var code = $(this).val();
	
	
// 	if (keyCode == 9) {
// 		e.preventDefault();
// 		$(this).val(code + '  ');
// 	}
// });

$scope.codeCancel = function() {
	$('.code-editor-holder').remove();
	$scope.saveCodeState = false;
	$scope.cancelCodeState = false;
	$scope.addCodeState = true;
	$('#codeContainer').show();
}

// SAVE CODE SAMPLE IN DB
$scope.saveSodeSample = function() {
	
	var code = $('.code-editor').val();
	var menuId = $('.list-code-menu-active').parent().attr('data-sbumenu-eleid');
	var mainMenuId = $('.list-code-menu-active').parent().attr('data-menu-eleid');

	if ($scope.saveEdit == 'save') {
		DB.saveCode({menuId: menuId, code: code}).then(function(data){

			if (data == 1) { saveEdit(); }
		});
	}else if ($scope.saveEdit == 'edit') {
		DB.editCode({menuId: menuId, code: code}).then(function(data){

			if (data == 1) { saveEdit(); }
		});
	}

	function saveEdit() {
		$scope.hideEditButtons();
		$('.code-editor').remove();
		$scope.createAndColorCode(JSON.stringify(code));
		$scope.saveEdit = "";

		// ADD TO LOCAL DB
		angular.forEach(Profile.myCodeLocalData, function(menuEl) {
			if (menuEl.user_code_menu_item_id == mainMenuId) {
				angular.forEach(menuEl.menu_submenu, function(submenu){
					if (submenu.user_code_menu_item_id == menuId) {
						submenu.user_menu_code = JSON.stringify(code);
					}
				});
			}
		});
	}
}


$scope.showEditButtons = function() {
	$scope.addCodeState = false;
	$scope.saveCodeState = true;
	$scope.cancelCodeState = true;
}

$scope.hideEditButtons = function() {
	$scope.saveCodeState = false;
	$scope.cancelCodeState = false;
	$scope.addCodeState = true;
}

$scope.hideAllButtons = function() {
	$scope.saveCodeState = false;
	$scope.cancelCodeState = false;
	$scope.addCodeState = false;
}

}]);

