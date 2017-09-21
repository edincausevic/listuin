
<?php 

// check if logged in and set session on cookie

error_reporting(0);
session_start();

// CONNECT TO THE SERVER
include 'reusable/connection.php';

if(isset($_SESSION['user_is_loggedin'])) {
	echo true;
}else if (isset($_COOKIE["kekslr"])) {

	$cookie = $_COOKIE["kekslr"];

	$cookieQuery = "SELECT user_id FROM users WHERE user_login_cookie = '$cookie'";
	$cookieResult = mysqli_query($db, $cookieQuery);

	if ( mysqli_num_rows($cookieResult) >= 1 ) {

		while($row = mysqli_fetch_array($cookieResult)) {

			$id = $row[0];
			$_SESSION['user_is_loggedin'] = $id;
		}
	}

	echo true;
}else {
	echo 0;	
}

 ?>