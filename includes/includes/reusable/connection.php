<?php 

// OPEN DB CONNECTION
$db = new mysqli('localhost', 'id2385559_wersastudio', 'onomatopeja124', 'id2385559_listuin');
// TEST IF CONNECTION OCCURRED
if($db->connect_error) {
	die('Sorry, we have some problems!');
}

 ?>