(function($){


// Create Element.remove() function if not exist
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
    
    
    
// **************************************** meke my profile *****************************      
    
// SHOW POPUP - CREATE MY LIST - index page
$(document).on('click', '.create-list-side-popup', showCreatePopup);
$(document).on('click', '#create-list', showCreatePopup);

function showCreatePopup() {
    
    $('#show-create-popup').fadeIn(300);
    if (localStorage.iwasregistred) {$('#loginPass').focus();}   
    else {$('#regEmail').focus();}
    
}

// ON LOAD SETUP
(function(){
    setTimeout(function(){
        if (localStorage.iwasregistred) {
            $('#registerContainer').hide();
            $('#loginContainer').show();
        }
        if (localStorage.loginEmail) { $('#loginEmail').val(localStorage.loginEmail);}
    },1000);
    
})();
 


//$('#logiEmail').focus(); kad kliknes na zuti email

function hideRegLoginForm() {
    var email = $('#regEmail');

    email.val("");
    $('#regPass').val("");
    $('#regPass2').val("");

    email.removeClass('invalid-input');
    $('form input').removeClass('valid-input');
}

$(document).on('click', '.go-to-login', function(e){

    $('.log-reg-right > div').hide();
    $('#loginContainer').show();
    $('#loginEmail').focus();    
});

$(document).on('click', '.go-to-register', function(){

     $('.log-reg-right > div').hide();
    $('#registerContainer').show();
    $('#regEmail').focus();
});

$(document).on('click', '.go-retrive-pass', function(e){
    e.preventDefault();
    $('#retrivePassContainer').show();
    $('#registerContainer').hide();
    $('#loginContainer').hide();
    $('#retriveEmail').focus();
});

// ADD MENU ITEM LINK
$(document).on('click', '.add-menu-lists-item', function(){
    
    $('#add-lists-menu-item').fadeIn(300);
    $('#lists-menu-title').val("");
    $('#lists-menu-title').focus();
});



// ADD LIST LINKS
$(document).on('click', '#add-lists-link', function(){

    $('#add-new-link').fadeIn(300);
    $('#lists-link-title').val("");
    $('#lists-link-title').focus();
    $('#lists-link-url').val("");
});

// LISTS MENU ACTIVE BUTTON
$(document).on('click', '.profile-lists-side-menu-title', function(){
    
    $('.profile-lists-side-menu li span').removeClass('lists-menu-active');
    $(this).find('span').addClass('lists-menu-active');
});

//HIDE POPUPS - HIDE ON X
$('#popups').on('click', '#close', function(){

    $(this).closest('.hide-popup').fadeOut(300, function(){ $(this).remove(); });
});

$(document).on('click', '#close', function(){
    
    if ($('#show-create-popup').is(':visible')) { hideRegLoginForm();}
    $('#show-create-popup').fadeOut(300);
});
    
// HIDE POPUPS - HIDE ON CANCLE
$(document).on('click', '.cancle', function(){

    $('.hide-popup').fadeOut(300);    
    //$(this).closest('.hide-popup').fadeOut(300, function(){ $(this).remove(); });
});    

// HIDE POPUPS - HIDE ON BACKGROUND CLICK
$(document).on('click', '.bg-trans', function(e){

    if ( e.target === this ) {
        $(this).fadeOut(300);
        if ($('#show-create-popup').is(':visible')) { hideRegLoginForm();} // clear inputs and color classes
    }
    if ( e.target === $('#show-create-popup') ) $('#show-create-popup').fadeOut(300);
});


// show email popup    
$(document).on('click', '#show-email', function(e){ 
    
    e.preventDefault();
    xhr("GET", "data/mail.html", addDataTo("#popups", '#show-mail', 300));
});

// show email suggestion popup    
$(document).on('click', '#email-suggenstion', function(e){
    e.preventDefault();
    xhr("GET", "data/mail-sugest.html", addDataTo("#popups", '#show-mail-suggest', 300));
});     

// SEND MAIL    
$('#popups').on('submit', '#email', function(e){
    e.preventDefault();

    // CHECK FOR FORM INPUTS - IF EMPTY
    formCheck( $('#e-title').val(), $('#title-error'), 'Please enter a name.' );
    formCheck( $('#e-email').val(), $('#email-error'), 'Please enter a email.' );
    formCheck( $('#e-text').val(), $('#text-error'), 'Text box is empty.' );

    // IF FORM INPUT EMPTY YUMP OUT OF THE FUNCTION
    if ( test === false ) {return false;}

    // HIDE MAIL FORM
    $('#show-mail').fadeOut(300);

    // SEND MAIL
    sendData('title','email','msg','#e-title','#e-email','#e-text','includes/mailer.php')
});      
    
// send email suggestion   
$('#popups').on('submit', '#email-suggest', function(e){
    e.preventDefault();

    // CHECK FOR FORM INPUTS - IF EMPTY
    formCheck( $('#e-email-s').val(), $('#email-error-s'), 'Please enter a E-mail.' );
    formCheck( $('#e-url-s').val(), $('#url-error-s'), 'Please enter a url.' );
    formCheck( $('#e-text-s').val(), $('#text-error-s'), 'Text box is empty.' );

    // IF FORM INPUT EMPTY YUMP OUT OF THE FUNCTION
    if ( test === false ) {return false;}

    // HIDE MAIL FORM
    $('#show-mail').fadeOut(300);

    // SEND MAIL
    sendData('email','url','msg','#e-email-s','#e-url-s','#e-text-s','includes/mailer-suggest.php')
});      
    
    
// check form inputs - if empty    
function formCheck( input, error, errorMsg ) {

    if ( input.length === 0 ) {
        error.html(errorMsg);
        test = false;
    }else { 
        error.html('&nbsp;'); 
        test = true; 
    }
}    

var test;     
   
// SEND DATA TO PHP
function sendData(var1,var2,var3,e1,e2,e3,php) {    
    var var1 = $(e1).val();
    var var2 = $(e2).val();
    var var3 = $(e3).val();

    $.ajax({
        type: 'POST',
        url: php,
        data: { var1: var1, var2: var2, var3: var3 },
        success: function( data ){
            if ( data == 'success' ) {
                makeMsg('Thank you! Your message has been sent.', 350, '#2ecc71');
            }else { 
                makeMsg('Oops! Something went wrong. Please try again!', 350, '#dd4b39');  
            }
        }
    });    
} 
    


// make msg after mail is send    
function makeMsg( msg, time, color ) {

    var message = '<div class="mail-msg">' +msg+ '</div>';
    setTimeout(function(){
        $('#popups').html( message );
        $('.mail-msg').css('background-color', color);
        $('#popups div').fadeIn(300).delay(2000).fadeOut(300);
    },time);
}    
    
 
    
// // ********************************************* ajax ********************************* 
    
// use ajax by calling xhr function    
// xhr( ajax type, ajax url, callback( dom-el ), error      
    
function xhr( type, url, callback, error ) {

    $.ajax({
        type: type,
        url: url,
        success: function(data) { callback(data); },
        error: error
    });
}    

// select the elements and put in it data from ajax call        
function addDataTo(container, el, time) {

    container = $( container );
    function add( data ) {
        container.html(data);
        $(el).fadeIn(time);
    }
    return add;
}   

//       
function addDataToUp(container, el, time, elHtml, title) {

    container = $( container );
    function add( data ) {
        container.html(data);
        $(elHtml).html(title);
        $(el).slideDown(time, function(){ $(this).fadeOut(300); });
    }
    return add;
} 

    
    
})(jQuery);


