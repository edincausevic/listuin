<?php 

error_reporting(0);
session_start();

// CONNECT TO THE SERVER
include 'reusable/connection.php';

// DATA FROM INPUTS
$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$email = mysqli_escape_string($db, $data->email);
$password = mysqli_escape_string($db, $data->password);
$userId = $_SESSION["user_is_loggedin"];



// CHECHK IF USERNAME EXSISTS
$query = "SELECT * FROM users WHERE user_email = '{$email}' AND deleted IS NULL";
$result = mysqli_query($db, $query);

if (mysqli_num_rows($result) == 1) {
	echo 'Email already exists!';
}else {
	
	//CHECK IF PASSWORD OF THIS USER IS CORRECT
	$passQuery = "SELECT user_password FROM users WHERE user_id = '$userId'";
	$passResult = mysqli_query($db, $passQuery);

	if ($passResult) {
		$row = mysqli_fetch_array($passResult);
		
		if (password_verify($password, $row["user_password"])) {
		    
		    // SET USERNAME
			$userQuery = "UPDATE users SET user_email = '$email' WHERE user_id = '$userId'";
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