<?php 


error_reporting(0);

// CONNECT TO THE SERVER
include 'reusable/connection.php';

// DATA FROM INPUT
$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$title = mysqli_escape_string($db, $data->user_list_item_title);
$id = mysqli_escape_string($db, $data->user_list_item_id);

// CHANGE TITLE IN DB
$query = "UPDATE user_list_item SET user_list_item_title = '{$title}' WHERE user_list_item_id = '{$id}'";
$result = mysqli_query($db, $query);

if($result) {
	echo true;
}
 


 ?>
