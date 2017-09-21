<?php 

//error_reporting(0);
session_start();

// CONNECT TO THE SERVER
include 'reusable/connection.php';
// ADD FUNCTIONS
include 'reusable/functions.php';


// GET DATA FROM THE FORM
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$email = mysqli_escape_string($db, $request->email);
$password = mysqli_escape_string($db, $request->password);
$hashPass = hashPassword($password);
$username = 'User' . rand() . generateRandomString();


// FORM VALIDATION
if(strlen($email) > 40 || strlen($password) > 40) {
	echo 'Please enter a valid email and password';
}else if (empty($email) === true || empty($password) === true) {
	echo 'You need to enter email and password';
}else {

	// CHECK IF USER EXSIST
	$result = $db->query("SELECT * FROM users WHERE user_email = '$email'");
	if (mysqli_num_rows($result) >= 1) {
		echo 'User Exists!';
	}else {

		// SET COOKIE
		$cookiehash = md5(sha1($username));
		setcookie("kekslr", $cookiehash, time() + (20 * 365 * 24 * 60 * 60), "/", NULL);

		// ADD USER TO DB
		$query = "INSERT INTO users (user_email, user_password, user_username, user_login_cookie) VALUES ('{$email}', '{$hashPass}', '{$username}', '{$cookiehash}')";
		$resultAdd = mysqli_query($db, $query);

		$resultId = $db->query("SELECT * FROM users WHERE user_email = '$email'");

		if ( mysqli_num_rows($resultId) >= 1 ) {
			while ($row = mysqli_fetch_assoc($resultId)) {
				$user_id = $row['user_id'];
			}

			// SET SESSION
			$_SESSION['user_is_loggedin'] = $user_id;
			echo true;
		}else {
			echo 'We have some problems, please reload the page and try again.';
		}
	}
}



 ?>