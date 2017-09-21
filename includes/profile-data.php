<?php 

session_start();


// CONNECT TO THE SERVER
include 'reusable/connection.php';

$id = $_SESSION['user_is_loggedin'];

$query = "SELECT * FROM users WHERE user_id = '$id'";
$result = mysqli_query($db, $query);

if (mysqli_num_rows($result) === 1) {
	
	while($row = mysqli_fetch_assoc($result)) {
		echo json_encode($row);
	}

}

?>