

<?php 

// CONNECT TO THE SERVER
include 'reusable/connection.php';

$json = '[{"id":64,"image":"img/development/mobile-test.png","title":"Mobile-Friendly Test","url":"https://www.google.com/webmasters/tools/mobile-friendly/","description":"heck if the page is mobile-friendly.","tags":"test, analyze, mobile, responsive, ","page":"/free/development","position":1},{"id":65,"image":"img/development/page-speed.png","title":"Page Speed Test","url":"https://developers.google.com/speed/pagespeed/insights/","description":"ake your web pages fast on all devices.","tags":"page, speed, test, code, load, speed, google, ","page":"/free/development","position":2},{"id":66,"image":"img/development/browserstack.png","title":"Browser Stack","url":"https://www.browserstack.com/screenshots","description":"est your website for cross browser compatibility.","tags":"browser, test, code, load, speed, website, page, speed, ","page":"/free/development","position":3},{"id":67,"image":"img/development/realfavicongenerator.jpg","title":"Real Favicon Generator","url":"http://realfavicongenerator.net/","description":"reate favicon for your website.","tags":"favicon, icon, browser, all, browsers, ","page":"/free/development","position":4},{"id":68,"image":"img/development/petragregorova.jpg","title":"Social Share","url":"http://petragregorova.com/articles/social-share-buttons-with-custom-icons/","description":"reate Social Share Buttons for your website.","tags":"facebook, twitter, pinterest, google+, reddit, ","page":"/free/development","position":5},{"id":69,"image":"img/development/bitly.jpg","title":"Link Shortener","url":"https://bitly.com/","description":"horten your link.","tags":"link, short, transform, ","page":"/free/development","position":6},{"id":70,"image":"img/development/netrenderer.jpg","title":"NetRenderer","url":"https://netrenderer.com/index.php","description":"est your website for browser compatibility in IE.","tags":"compatibility, test, browser, internet, explorer, ","page":"/free/development","position":7},{"id":71,"image":"img/development/json-generator.jpg","title":"Json Generator","url":"http://www.json-generator.com/","description":"enerate JSON for practice.","tags":"json, js, generate, tutorial, learn, ","page":"/free/development","position":8},{"id":72,"image":"img/development/jsonlint.jpg","title":"Json Lint","url":"http://jsonlint.com/","description":"he JSON Validator.","tags":"validate, json, code, ","page":"/free/development","position":9},{"id":73,"image":"img/development/gmap.jpg","title":"Google Maps JS","url":"https://hpneo.github.io/gmaps/","description":"ut a map on your website.","tags":"map, google, documentation, ","page":"/free/development","position":10},{"id":74,"image":"img/development/optimizilla.jpg","title":"Optimizilla","url":"http://optimizilla.com/","description":"ptimize your images for web.","tags":"image, png, jpg, optimize, photo, ","page":"/free/development","position":11},{"id":75,"image":"img/development/quirktools.jpg","title":"Quirktools","url":"http://quirktools.com/screenfly/","description":"heck your website responsiveness.","tags":"website, responsive, css, mobile, tablet, ","page":"/free/development","position":12}]';

$a = json_decode($json, true);

foreach($a as $item) {
      mysqli_query($db, "INSERT INTO listuin_list_item (listuin_item_image, listuin_item_title, listuin_item_description, listuin_item_url, listuin_item_tags, listuin_item_position, listuin_item_page) VALUES 
                                                  ('".$item['image']."', '".$item['title']."', '".$item['description']."', '".$item['url']."', '".$item['tags']."', '".$item['position']."', '".$item['page']."')");
echo $item;
     }

 // mysql_query("INSERT INTO `database name`.`table name` (name, phone, city, email) 
 //       VALUES ('".$item['name']."', '".$item['phone']."', '".$item['city']."', '".$item['email']."')");

 ?>