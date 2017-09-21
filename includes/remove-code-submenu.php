<?php 

error_reporting(0);

// CONNECT TO THE SERVER
include 'reusable/connection.php';

// GET MENU ELEMENT DATA
$postdata = file_get_contents('php://input');
$data = json_decode($postdata);

$menuElId = mysqli_escape_string($db, $data->user_code_menu_item_id);
$remove = 1;


// REMOVE MENU ELEMENT
$query = "UPDATE user_code_menu_item SET deleted = '$remove' WHERE user_code_menu_item_id = '$menuElId' OR user_code_submenu_id = '$menuElId'";
$result = mysqli_query($db, $query);

if ($result) {
	
	$codeQuery = "UPDATE user_code SET deleted = '$remove' WHERE user_code_menu_item_id = '$menuElId'";
	$codeResult = mysqli_query($db, $codeQuery);

	if ($codeResult) {
		echo true;
	}
}	



 ?>