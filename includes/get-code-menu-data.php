<?php 

//error_reporting(0);
session_start();


// CONNECT TO THE SERVER
include 'reusable/connection.php';

// GET LINK URL PARAM
$postdata = file_get_contents('php://input');
$data = json_decode($postdata);

$menuItemId = mysqli_escape_string($db, $data->menuId);

// GET DATA FROM DB
$query = "SELECT * FROM user_code WHERE user_code_menu_item_id = '$menuItemId' AND deleted IS NULL";
$result = mysqli_query($db, $query);

if (mysqli_num_rows($result) >= 1) {
	$row = mysqli_fetch_assoc($result);
	echo json_encode($row["user_code"]);
}else {
	echo 'no-code';
}


 ?>