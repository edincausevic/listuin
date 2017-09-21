<?php 

error_reporting(0);
session_start();

// CONNECT TO THE SERVER
include 'reusable/connection.php';
// ADD FUNCTIONS
include 'reusable/functions.php';

// DATA FROM INPUTS
$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$username = mysqli_escape_string($db, $data->username);
$password = mysqli_escape_string($db, $data->password);
$userId = $_SESSION["user_is_loggedin"];

// CHECHK IF USERNAME EXSISTS
$query = "SELECT * FROM users WHERE user_username = '{$username}'";
$result = mysqli_query($db, $query);

if (mysqli_num_rows($result) == 1) {
	echo 'That Username Exists!';
}else {
	
	//CHECK IF PASSWORD OF THIS USER IS CORRECT
	$passQuery = "SELECT user_password FROM users WHERE user_id = '$userId'";
	$passResult = mysqli_query($db, $passQuery);

	if ($passResult) {
		$row = mysqli_fetch_array($passResult);
		
		if (password_verify($password, $row["user_password"])) {
		    
		    // SET USERNAME
			$userQuery = "UPDATE users SET user_username = '$username' WHERE user_id = '$userId'";
			$userResult = mysqli_query($db, $userQuery);

			if ($userResult) {
				echo 'success';
			}
		} else {
		    echo 'Invalid password.';
		}
	}
	
}




 ?>