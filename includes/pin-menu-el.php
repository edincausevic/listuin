<?php 


// CONNECT TO THE SERVER
include 'reusable/connection.php';

// DATA FROM INPUT
$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$menuId = $data->menuElID;
$menuName = $data->menuName;
$pinedItem = $data->pinedItemID;
$title = $data->title;
$url = $data->url;


// GET THE POSITION BY TAKING THE LAST ITEM POSITION IN THAHT MENU LIST AND ADDING ONE
$positionQuery = "SELECT * FROM user_list_item WHERE user_menu_item_id = '$menuId' AND deleted IS NULL";
$positionResult = mysqli_query($db, $positionQuery);

if ($positionResult) {

	// STORE ALL MENU ELEMS IN THIS ARRAY
	$menuElems = array();
	while ( $postionRow = mysqli_fetch_assoc($positionResult)) {
		$menuElems[] = $postionRow;
	}
	
	// CHECHK IF ARRAY EMPTY - NO LIST ELEMENTS
	// AND SET POSITION VARIABLE
	if (empty($menuElems)) {$lastElPosition = 1;}
	else {
		// TAKE LAST ITEM POSITION OF LIST AND INCREMENT IT BY ONE
		$lastElPosition = array_values(array_slice($menuElems, -1))[0]["user_list_item_position"] + 1;
		if ($lastElPosition > 20) {
			die(json_encode(array("fulllist"=>true)));
		} 
	}
}

// SAVE EL IN LISTS TABLE
$query = "INSERT INTO user_list_item (user_menu_item_id, user_list_item_title, user_list_item_url, user_list_item_position) VALUES 
									 ('{$menuId}', '{$title}', '{$url}', '{$lastElPosition}')";
$result = mysqli_query($db, $query);


if ($query) {
	echo json_encode(array("success"=>true));
}

 ?>