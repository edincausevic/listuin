<?php 

//error_reporting(0);
session_start();

// CONNECT TO THE SERVER
require 'reusable/connection.php';

// ADD FUNCTIONS
require 'reusable/functions.php';


// GET DATA FROM THE FORM
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$username = mysqli_escape_string($db, $request->username);
$password = mysqli_escape_string($db, $request->password);
$remeberme = mysqli_escape_string($db, $request->remeberme);

// FORM VALIDATION 
if (strlen($username) > 40 || strlen($password) > 40) {
	echo 'Please enter a valid email and password';
}else if (empty($username) === true || empty($password) === true) {
	echo 'You need to enter email and password';
}else {
	
	
	if (preg_match('/@/', $username)) {
		$result = $db->query("SELECT * FROM users WHERE user_email = '$username'");
	}else {
		$result = $db->query("SELECT * FROM users WHERE user_username = '$username'");
	}
	
	// CHECK IF USER EXISTS AND LOGIN
	if (mysqli_num_rows($result) >= 1) {
		
		while($row = mysqli_fetch_assoc($result)) {
			
			$user_id = $row['user_id'];
			$passwordHash = $row['user_password'];

			if (password_verify($password , $passwordHash)) {
			
				if ( $remeberme == 1 ) {

					$cookiehash = md5(sha1($username));
					setcookie("kekslr", $cookiehash, time() + (20 * 365 * 24 * 60 * 60), "/", NULL);
					//setcookie("uname",$uname,time()+3600*24*365,'/','.yoursite.com');
					$query = "UPDATE users SET user_login_cookie = '$cookiehash' WHERE user_id = '$user_id'";
					$result = mysqli_query($db, $query);
				}

				$_SESSION['user_is_loggedin'] = $user_id;
				echo true;
			}else { 
				echo 'Username or password is wrong!';
			}
		}
	} else { echo 'Username or password is wrong!'; }	
}

 ?>