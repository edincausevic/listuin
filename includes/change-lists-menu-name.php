<?php 

error_reporting(0);

// CONNECT TO THE SERVER
include 'reusable/connection.php';

// DATA FROM INPUT
$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$title = mysqli_escape_string($db, $data->title);
$id = mysqli_escape_string($db, $data->id);

// CHANGE MYLISTS MENU TITLE NAME
$query = "UPDATE user_menu_item SET user_menu_item_title = '$title' WHERE user_menu_item_id = '$id'";
$result = mysqli_query($db, $query);

if ($result) {
	echo true;
}else { echo false;}


 ?>