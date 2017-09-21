<?php 

error_reporting(0);
session_start();

// CONNECT TO THE SERVER
include 'reusable/connection.php';
// ADD FUNCTIONS
include 'reusable/functions.php';


// GET DATA FROM THE FORM
$postdata = file_get_contents('php://input');
$data = json_decode($postdata);

$oldPassword = mysqli_escape_string($db, $data->oldpassword); 
$newPassword = mysqli_escape_string($db, $data->newpassword); 
$userId = $_SESSION["user_is_loggedin"];

// CHECHK IF PASSWORD IS CORRECT
$passQuery = "SELECT user_password FROM users WHERE user_id = '$userId' AND deleted IS NULL";
$passResult = mysqli_query($db, $passQuery);

if ($passResult) {
	$row = mysqli_fetch_array($passResult);

	if (password_verify($oldPassword, $row["user_password"])) {
		
		//SAVE NEW PASSWORD
		$password = hashPassword($newPassword);

		$query = "UPDATE users SET user_password = '$password' WHERE user_id = '$userId' AND deleted IS NULL";
		$result = mysqli_query($db, $query);

		if ($result) { echo 'success'; }
	}else {
		echo 'Invalid password.';
	}
}


 ?>