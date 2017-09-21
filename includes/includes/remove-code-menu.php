<?php 

//error_reporting(0);

// CONNECT TO THE SERVER
include 'reusable/connection.php';

// GET MENU ELEMENT DATA
$postdata = file_get_contents('php://input');
$data = json_decode($postdata);

$mainMenuId = mysqli_escape_string($db, $data->mainMenuId);
$submenusId = $data->submenusIds;
$remove = 1;

$query = "UPDATE user_code_menu_item SET deleted = '$remove' WHERE user_code_menu_item_id = '$mainMenuId'";
$result = mysqli_query($db, $query);

if (count($submenusId) == 0) { echo true;}
else {	

	if ($result) {
		foreach ($submenusId as $id ) {
		
			$submenuquery = "UPDATE user_code_menu_item SET deleted = '$remove' WHERE user_code_menu_item_id = '$id'";
			$submenuresult = mysqli_query($db, $submenuquery);

			$codequery = "UPDATE user_code SET deleted = '$remove' WHERE user_code_menu_item_id = '$id'";
			$coderesult = mysqli_query($db, $codequery);
		}
	}
	if ($coderesult) {
		echo true;
	}
}






 ?>