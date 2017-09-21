<?php 


error_reporting(0);

// CONNECT TO THE SERVER
include 'reusable/connection.php';

// GET MENU ELEMENT DATA
$postdata = file_get_contents('php://input');
$data = json_decode($postdata);

$elId = mysqli_escape_string($db, $data->user_list_item_id);
$delete = 1;

// REMOVE EL FROM DB
$query = "UPDATE user_list_item SET deleted = '$delete' WHERE user_list_item_id = '$elId'";
$result = mysqli_query($db, $query);

if ($result) {
	echo true;
}


?>