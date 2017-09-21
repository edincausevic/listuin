<?php 

error_reporting(0);

// CONNECT TO THE SERVER
include 'reusable/connection.php';

// GET MENU ELEMENT DATA
$postdata = file_get_contents('php://input');
$data = json_decode($postdata);

$menuElId = mysqli_escape_string($db, $data->user_menu_item_id);
$remove = 1;

// REMOVE MENU ELEMENT
$query = "UPDATE user_menu_item SET deleted = '{$remove}' WHERE user_menu_item_id = '{$menuElId}'";
$result = mysqli_query($db, $query);

if ($result) {
	
	// REMOVE LIST ITEM FROM THAT MENU ELEMENT
	$listQuery = "UPDATE user_list_item SET deleted = '{$remove}' WHERE user_menu_item_id = '{$menuElId}'";
	$listsResult = mysqli_query($db, $listQuery);

	if ($listsResult) {
		echo true;
	} else {echo false;}
	
}else { echo false; }
