<?php 
session_start();
if(!isset($_SESSION['user_is_loggedin'])){ 
    if ( !isset($_COOKIE['kekslr']) ) {
        header("Location: http://localhost/public_html/index.php#/"); 
    }
}
?>
<!DOCTYPE html>
<!--[if lt IE 7 ]> <html class="ie ie6 ltie8 ltie9" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="ie ie7 ltie8 ltie9" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="ie ie8 ltie9" lang="en"> <![endif]-->
<!--[if IE 9 ]>    <html class="ie ie9" lang="en"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" ng-app="profile"> <!--<![endif]-->
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
		<meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="Edin Causevic">
        
		<title>My list</title>
        
        <link rel="stylesheet" href="css/normalize.css">
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,800,700,600' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="css/font-awesome.min.css">
		<link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">

        <link rel="apple-touch-icon" sizes="57x57" href="img/favicons/apple-touch-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="img/favicons/apple-touch-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="img/favicons/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="img/favicons/apple-touch-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="img/favicons/apple-touch-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="img/favicons/apple-touch-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="img/favicons/apple-touch-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="img/favicons/apple-touch-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="img/favicons/apple-touch-icon-180x180.png">
        <link rel="icon" type="image/png" href="img/favicons/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="img/favicons/android-chrome-192x192.png" sizes="192x192">
        <link rel="icon" type="image/png" href="img/favicons/favicon-96x96.png" sizes="96x96">
        <link rel="icon" type="image/png" href="img/favicons/favicon-16x16.png" sizes="16x16">
        <link rel="manifest" href="img/favicons/manifest.json">
        <link rel="mask-icon" href="img/favicons/safari-pinned-tab.svg">
        <link rel="shortcut icon" href="img/favicons/favicon.ico">
        <meta name="apple-mobile-web-app-title" content="Listuin">
        <meta name="application-name" content="Listuin">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="msapplication-TileImage" content="img/favicons/mstile-144x144.png">
        <meta name="msapplication-config" content="img/favicons/browserconfig.xml">
        <meta name="theme-color" content="#ffffff">
	</head>

	<body id="profile" class="mylist" ng-controller="mainProfileController">
    
		<header class="my-list-header" id="mob-header" data-header="small">
                <div class="hero-text-box lists-text-box">
                    <h1 id="profileTitle"></h1>
                    <h2></h2> 
                </div>
		</header>
        <section class="sub-header-profile subhead">
            <div class="container profile-main-menu clear-fix">
                <ul class="profile-menu clear-fix">

                    <li>
                    <a href="index.php">
                    <i class="fa fa-fire" aria-hidden="true"></i>
                    <span> Free Stuff</span>
                    </a>
                    </li>

                    <li ng-class="{'profile-menu-active-mylist': whichPage == '/mylist'}">
                    <a href="#/mylists">
                    <i class="fa fa-list" aria-hidden="true"></i>
                    <span> My Lists</span>
                    </a>
                    </li>

                    <li ng-class="{'profile-menu-active-mycode': whichPage == '/mycode'}">
                    <a href="#/mycode">
                    <i class="fa fa-code" aria-hidden="true"></i>
                    <span> My Code</span>
                    </a>
                    </li>

                    <li ng-class="{'profile-menu-active': whichPage == '/materi'}"
                    style="display: none">
                    <a href="#/mynotes">
                    <i class="fa fa-archive" aria-hidden="true"></i>
                    <span> My Notes</span>
                    </a>
                    </li>
                </ul>
                
                <div class="my-profile-menu" ng-show="myProfileData.user_username" ng-cloak>
                    <i class="fa fa-user" aria-hidden="true"></i>
                    <span id="profileUserName"> {{myProfileData.user_username}}</span>
                    
                    <div class="p-menu">
                        <ul>
                            <li class="nobr"><a href="#/mylists"><nobr><i class="fa fa-list" aria-hidden="true"></i> My Lists</nobr></a></li>
                            <li class="nobr"><a href="#/mycode"><nobr><i class="fa fa-code" aria-hidden="true"></i> My Code</nobr></a></li>
                            <li><a href="#/profile">Profile</a></li>
                            <li><a href=""  ng-click="logout()">Logout</a></li>
                        </ul>
                    </div>
                </div>

                <div class="my-profile-menu mob-mylistsmenu-btn" 
                     style="margin:0" 
                     ng-show="mobMenuListsBtn"
                     ng-click="mobMenu()"
                     ng-cloak>
                    <i class="fa fa-list" aria-hidden="true"></i>
                    <span> My Lists Menu</span>
                </div>

                <div class="my-profile-menu mob-mycodemenu-btn" 
                     style="margin:0" 
                     ng-show="mobMenuCodeBtn"
                     ng-click="mobMenu()"
                     ng-cloak>
                    <i class="fa fa-code" aria-hidden="true"></i>
                    <span> My Code Menu</span>
                </div>
            </div>
        </section>
        <div class="add-container">
            <div class="main-middle-add">
                
            </div>
        </div>
        <section class="main-contant">
            <div class="container clear-fix">

<!-- MAIN DATA -->                
            <ng-view></ng-view>


            </div>
            <div id="side-menu-share">
                <div class="side-share">
                    <span>share</span>
                    <ul class="side-social-networks">
                        <li><a href="http://www.facebook.com/share.php?u=http://edincausevic.github.io/projects/listuin/index.php&title=Listuin:&nbsp;Home&nbsp;of&nbsp;designers."><i class="fa fa-facebook"></i></a></li>
                        <li><a href="http://twitter.com/intent/tweet?status=Listuin:&nbsp;Home&nbsp;of&nbsp;designers.+http://edincausevic.github.io/projects/listuin/index.php"><i class="fa fa-twitter"></i></a></li>
                        <li><a href="https://plus.google.com/share?url=http://edincausevic.github.io/projects/listuin/index.php"><i class="fa fa-google-plus"></i></a></li>
                        <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=http://edincausevic.github.io/projects/listuin/index.php&title=Listuin:&nbsp;Home&nbsp;of&nbsp;designers.&source=http://edincausevic.github.io/"><i class="fa fa-linkedin"></i></a></li>
                        <li><a href="http://www.reddit.com/submit?url=http://edincausevic.github.io/projects/listuin/index.php&title=Listuin:&nbsp;Home&nbsp;of&nbsp;designers."><i class="fa fa-reddit-alien"></i></a></li>
                        <li><a href="http://pinterest.com/pin/create/bookmarklet/?media=Resources&url=http://edincausevic.github.io/projects/listuin/index.php&is_video=false&description=Listuin:&nbsp;Home&nbsp;of&nbsp;designers."><i class="fa fa-pinterest-p"></i></a></li>
                        <li><a href="http://www.tumblr.com/share?v=3&u=http://edincausevic.github.io/projects/listuin/index.php&t=Listuin:&nbsp;Home&nbsp;of&nbsp;designers."><i class="fa fa-tumblr"></i></a></li>
                    </ul>
                </div>
            </div>
        </section>
<!--Footer-->
    <footer ng-include="'parts/footer.html'"></footer>         
<!--Model-->        
    <div id="popups"></div>
    <script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?autorun=false&amp;skin=sunburst"></script>    
    
<!--jQuery-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/jquery-3.1.0.min.js"><\/script>')</script>  
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
    <script src="scripts/respond.js"></script> 
<!--AngularJS-->  
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <script src="https://code.angularjs.org/1.6.4/angular-route.min.js"></script>
    <script src="js/scripts.min.js"></script>
<!--<script src="scripts/app.js"></script>
    <script src="scripts/routes/route.profile.js"></script>
    <script src="scripts/services/service.profile.js"></script>
    <script src="scripts/controllers/main-controller.profile.js"></script>
    <script src="scripts/controllers/mylist-controller.profile.js"></script>
    <script src="scripts/filters/filters.profile.js"></script>
    <script src="scripts/directives/main-directives.profile.js"></script>
    <script src="scripts/controllers/mycode-controller.profile.js"></script>
    <script src="scripts/controllers/material-controller.profile.js"></script>
    <script src="scripts/controllers/profile-controller-profile.js"></script> --> 

    
<!--Google Analytics-->        
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                                    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-84440801-1', 'auto');
            ga('send', 'pageview');

        </script>
	</body>
</html>