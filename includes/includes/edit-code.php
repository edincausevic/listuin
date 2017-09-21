<?php 


error_reporting(0);

// CONNECT TO THE SERVER
include 'reusable/connection.php';

// GET DATA
$postdata = file_get_contents('php://input');
$data = json_decode($postdata);

$menuId = mysqli_escape_string($db, $data->menuId);
$code = mysqli_escape_string($db, $data->code);

// SAVE CODE 
$query = "UPDATE user_code SET user_code = '$code' WHERE user_code_menu_item_id = '$menuId'";
$result = mysqli_query($db, $query);

if ($result) {
	echo true;
}

 ?>