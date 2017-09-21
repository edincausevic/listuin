<?php 

error_reporting(0);

// CONNECT TO THE SERVER
include 'reusable/connection.php';

// DATA FROM INPUT
$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$title = mysqli_escape_string($db, $data->user_list_item_title);
$url = mysqli_escape_string($db, $data->user_list_item_url);
$position = mysqli_escape_string($db, $data->user_list_item_position);
$menuElId = mysqli_escape_string($db, $data->user_menu_item_id);


// SAVE DATA IN DB
$query = "INSERT INTO user_list_item (user_list_item_title, user_list_item_url, user_list_item_position, user_menu_item_id) VALUES ('{$title}', '{$url}', '{$position}', '{$menuElId}')";
$result = mysqli_query($db, $query);

if ($result) {
	
	// GET ID QUERY
	$idQuery = "SELECT user_list_item_id FROM user_list_item WHERE 
				user_menu_item_id = '$menuElId' AND 
				user_list_item_position = '$position'";

	$idResult = mysqli_query($db, $idQuery);
	
	if ($idResult) {
		$row = mysqli_fetch_array($idResult);
		echo $row["user_list_item_id"];
	}			
}

 ?>