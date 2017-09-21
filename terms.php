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
    <main-header></main-header>  
    
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
            <div class="main-items">
                <p class="back-link"><a href="index.php">Home</a><span><a href="#"> / Privacy and Terms</a></span></p>
                <div id="termsofuse">
                        <h2>Privacy and Terms of www.Listuin.com</h2>
                        <p>This Application collects some Personal Data from its Users.</p>
                        <hr>
                        <div class="p-left">
                            <div class="p-con">
                                <i class="fa fa-circle-thin" aria-hidden="true"></i>
                                <i class="fa fa-mouse-pointer" aria-hidden="true"></i>
                                <span><strong>Advertising</strong></span>
                                <p class="m-top">Google AdSense and AppNexus</p>
                                <p>Personal Data: Cookies and Usage data</p>
                            </div>
                            <div class="p-con">
                                <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                <span><strong>Contacting the User</strong></span>
                                <p class="m-top">Mailing List or Newsletter</p>
                                <p>Personal Data: email address</p>
                                <p class="m-top">Contact form</p>
                                <p>Personal Data: email address and first name</p>
                            </div>
                        </div>
                        <div class="p-right">
                            <div class="p-con">
                                <i class="fa fa-bar-chart" aria-hidden="true"></i>
                                <span><strong>Analytics</strong></span>
                                <p class="m-top">Google Analytics</p>
                                <p>Personal Data: Cookies and Usage data</p>
                            </div>
                            <div class="p-con">
                                <i class="fa fa-share-square-o" aria-hidden="true"></i>
                                <span><strong>Interaction with external social networks and platforms</strong></span>
                                <p class="m-top">Pinterest “Pin it” button and social widgets, Twitter Tweet button and social widgets, Facebook Like button and social widgets, LinkedIn button and social widgets and Google+ +1 button and social widgets</p>
                                <p>Personal Data: Cookies and Usage data</p>
                            </div>
                        </div>
                        <hr>
                        <span class="p-title" style="color: green;">What can I do with this content?</span>
                        <ul style="list-style-type:circle">
                            <li>You can use content from this website to build your projects for commercial and personal use.</li>
                        </ul>
                        <span class="p-title" style="color: red;">What can't I do with this content?</span>
                        <ul style="list-style-type:circle">
                            <li>Claim the video/photo/sound/music/... material as yours.</li>
                            <li>Post the files on any website for others to download, copy or use.</li>
                            <li>Sell, re-sell, license or sub-license the files to anyone else.</li>
                            <li>Give away as part of any other collection of media.</li>
                        </ul>
                </div>
            </div>
            <aside class="side-menu hide-on-small">
                <side-menu></side-menu>
            </aside>
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


