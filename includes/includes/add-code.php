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
$query = "INSERT INTO user_code (user_code_menu_item_id, user_code) VALUES ('$menuId', '$code')";
$result = mysqli_query($db, $query);

if ($result) {
	echo true;
}


 ?>
