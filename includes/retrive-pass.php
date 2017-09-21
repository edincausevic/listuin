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

$username = mysqli_escape_string($db, $request->username);


// FORM VALIDATION
if (strlen($username) > 40) {
	echo 'Please enter a valid email and password';
}else if (empty($username)) {
	echo 'You need to enter email and password';
}else {

	// CHECK IF EMAIL/USER EXSIST
	if (preg_match('/@/', $username)) {
		$result = $db->query("SELECT * FROM users WHERE user_email = '$username'");
	}else {
		$result = $db->query("SELECT * FROM users WHERE user_username = '$username'");
	}
	
	if (mysqli_num_rows($result) >= 1) {
		while ($row = mysqli_fetch_assoc($result)) {
			$email = $row["user_email"];
			$id = $row["user_id"];
		}
    
		// CREATE A NEW PASSWORD
		$generatePassword = generateRandomString(12);
		$password = hashPassword($generatePassword);

		// UPDATE THE DB
		// preform database query
		$query = "UPDATE users SET user_password = '$password' WHERE user_id = '$id'";
		$resultUpdate = mysqli_query($db, $query);

		// SENT MAIL WITH PASSWORD
		if ( $resultUpdate ) {
			
		    $to      = $email;
		    $title   = 'Listuin - Retrive Password';
		    $message = "Your new password is: " . $generatePassword;
		    $headers = 'From: listuin-mail@listuin.com' . "\r\n" .
		        'Reply-To: webmaster@example.com' . "\r\n" .
		        'X-Mailer: PHP/' . phpversion();

		    // Send email
		    $send = mail($to, $title, $message, $headers);

		    // check if email is send or not
		    if ( $send ) {
		        echo 'Your password has been send on ' . $email . '.';
		    }else {
		        echo 'Sorry, can\'t send you email!';
		    }

		}else {
			echo 'Sorry, we have some problems now, please try later!';
		}	
	}else {
		echo 'Username/Email does not exist!';
	}
	
}


 ?>