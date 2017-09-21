<?php 

error_reporting(0);
session_start();

// CONNECT TO THE SERVER
include 'reusable/connection.php';


// GET DATA FROM THE FORM
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$title = mysqli_escape_string($db, $request->user_code_menu_title);
$submenuId = mysqli_escape_string($db, $request->user_code_submenu_id);
$userId = $_SESSION['user_is_loggedin'];



// ADD NEW CODE MENU EL IN DB
$query = "INSERT INTO user_code_menu_item (user_id, user_code_menu_title, user_code_submenu_id) VALUES 
								 		('{$userId}', '{$title}', '{$submenuId}')";
$result = mysqli_query($db, $query);

if ($result) {
	
	$queryId = "SELECT * FROM user_code_menu_item WHERE user_id = '$userId' AND user_code_menu_title = '$title' AND user_code_submenu_id = '$submenuId' AND deleted IS NULL";
	$resultId = mysqli_query($db, $queryId);

	if ($resultId) {
		$row = mysqli_fetch_assoc($resultId);
		echo $row["user_code_menu_item_id"];
	}	
}

 ?>