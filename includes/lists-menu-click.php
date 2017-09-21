<?php 


error_reporting(0);
session_start();

// CONNECT TO THE SERVER
include 'reusable/connection.php';

// GET DATA 
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$menuListId = mysqli_escape_string($db, $request->user_menu_item_id);

// GET THE LIST FOR THAT MENU LIST ITEM
$query = "SELECT * FROM user_list_item WHERE user_menu_item_id = '$menuListId' AND deleted IS NULL";
$result = mysqli_query($db, $query);

if ($result) {
	
	$listItems = [];
	while ($row = mysqli_fetch_assoc($result)) {
		$listItems[] = $row;
	}

	echo json_encode($listItems);
}


 ?>