<!DOCTYPE html>
<!--[if lt IE 7 ]> <html class="ie ie6 ltie8 ltie9" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="ie ie7 ltie8 ltie9" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="ie ie8 ltie9" lang="en"> <![endif]-->
<!--[if IE 9 ]>    <html class="ie ie9" lang="en"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" ng-app="app"> <!--<![endif]-->
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Listuin is a collection of free for commercial use content. From free commercial images, videos, music to free for commercial use fonts. We have it all.">
    <meta name="keywords" content="download, free images, free videos, free mp3, free">
    <meta name="author" content="Edin Causevic">
    
    <title>Free for commercial and personal use content - Listuin.com</title>
    
    <link rel="stylesheet" href="css/normalize.css">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,800,700,600' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/style.css">

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


<body id="main-page" class="home" ng-controller="mainController">

<!-- HEADER -->    
    <main-header  ng-if="whichPage == '/'"></main-header>
    <free-header  ng-if="whichPage !== '/'"></free-header>   
    
<!-- SUBHEADER -->		
    <section class="sub-header subhead">
    <h2 style="display: none">Menu</h2>
    <div class="container clear-fix">
    <nav class="subheader-left">
    <most-popular></most-popular>
    </nav>
    <div class="coment-box clear-fix hide-on-small">
    <testimonial ng-repeat="testimonial in testimonials" 
                 all-testimonials="testimonial"
                 random-num="{{randomNumForTes}}"></testimonial>
    </div>
    </div>
    </section>

<!-- ADS -->          
    <div class="add-container" style="padding: 42px 0 45px 0;">
    <div class="main-middle-add"></div>
    </div>
<!-- MAIN SECTION -->         
    <section class="main-contant">
        <div class="container clear-fix">
        
        <!-- HOME TEMPLATE - LINKS -->            
        <ng-view></ng-view>

        <!-- SIDE MENU -->                               
        <aside class="side-menu hide-on-small">
        <div class="my-list-link clear-fix" id="my-list-link"
             ng-if="loginStateWich == 1" ng-cloak>
            <a href="profile.php#/mylists">
                <p class="name-of-my-list"><i class="fa fa-user" aria-hidden="true"></i> {{profileName}}</p>
            </a>
        </div>
        <side-menu-popular ng-if="whichPage == '/'"></side-menu-popular>
        <side-menu ng-if="whichPage !== '/'"></side-menu>
        <div id="g-ads-rb"></div>
        </aside>
        </div>

        <div id="side-menu-share">
            <div class="create-list-side-popup" 
                 ng-if="checkForSideProfileButton()" ng-cloak>
                <h2><i class="fa fa-list"></i>Make a list.</h2>
            </div>
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
<!--PIN--> 
    <div id="pin-this-tem" class="popup-container  hide-popup">
    <div class="centar text-container" id="remove-list-question">
    <span class="message" id="pin-msg"></span>
    </div>
    </div> 

<!--POPUPS-->        
    <div id="popups"></div>

<!--REGISTRATION LOGIN-->
    <register-login-form></register-login-form>            
     
<!--jQuery-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="srcipts/jquery-3.1.0.min.js"><\/script>')</script>  
    <script src="scripts/respond.js"></script>
<!--AngularJS -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
    <script src="https://code.angularjs.org/1.6.4/angular-route.min.js"></script>
    <script src="https://code.angularjs.org/1.6.4/angular-sanitize.min.js"></script> 
    <script src="js/scripts.min.js"></script>
<!--<script src="scripts/app.js"></script>
    <script src="scripts/routes/route.app.js"></script>
    <script src="scripts/services/service.app.js"></script>
    <script src="scripts/filters/filters.app.js"></script>
    <script src="scripts/controllers/main-controller.app.js"></script>
    <script src="scripts/controllers/home-controller.app.js"></script>
    <script src="scripts/controllers/free-controller.app.js"></script>
    <script src="scripts/directives/main-directives.app.js"></script>-->
<!--Google Analytics        
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                                    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-84440801-1', 'auto');
            ga('send', 'pageview');

        </script>-->

        <script type="text/javascript">
    
            //empty input fields on load on chrome
            setTimeout(function(){
                var input = document.querySelectorAll('.inputs');
                for( var i = 0; i < input.length; i++) {
                    if (input[i].id == 'remembermeLog') continue;
                    input[i].value = "";
                }
            },70);
        </script>
</body>
</html>
