<?php 

//error_reporting(0);
session_start();

// CONNECT TO THE SERVER
include 'reusable/connection.php';


// GET DATA FROM THE FORM
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$title = mysqli_escape_string($db, $request->name);
$position = mysqli_escape_string($db, $request->position);
$color = mysqli_escape_string($db, $request->color);
$userId = $_SESSION['user_is_loggedin'];

$query = "INSERT INTO user_menu_item (user_id, user_menu_item_title, user_menu_item_color, user_menu_item_position) VALUES ('{$userId}', '{$title}','{$color}' ,'{$position}')";
$result = mysqli_query($db, $query);

if ($result) {

	$findElQuery = "SELECT * FROM user_menu_item WHERE user_id = '$userId' AND user_menu_item_title = '$title' AND user_menu_item_position = $position AND user_menu_item_color = '$color'";
	$findElResult = mysqli_query($db, $findElQuery);

	if ($findElResult) {
		while ($row = mysqli_fetch_assoc($findElResult)) {
			echo $row['user_menu_item_id'];
		}
	}
}else {
	echo 'Sorry, we can\'t add your menu item right now.';
}



 ?>