<?php 

session_start();

// CONNECT TO THE SERVER
include 'reusable/connection.php';

// DATA FROM INPUT
$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$title = mysqli_escape_string($db, $data->listuin_item_title);
$url = mysqli_escape_string($db, $data->listuin_item_url);
$itemId = mysqli_escape_string($db, $data->listuin_item_id);

// CHECK IF USER ID REGITERED/ LOGEDIN
if (isset($_SESSION['user_is_loggedin'])) {
	
	$user_id = $_SESSION['user_is_loggedin'];

	//CHECK IF DATA EXSISTS
	$query = "SELECT * FROM user_menu_item WHERE user_id = '$user_id' AND deleted IS NULL";
	$result = mysqli_query($db, $query); 

	// IF THERE IS ONE MENU ELEMENT
	if (mysqli_num_rows($result) == 1) {
		
		// GET ID, COLOR AND TITLE FORM THAT MENU EL
		while($row = mysqli_fetch_assoc($result)) {
			$menuId = $row["user_menu_item_id"];
			$menuName = $row["user_menu_item_title"];
		}
 
		// GET THE LAST LIST EL POSITION FROM THAT MENU EL BASED ON $menuId
		$positionQuery = "SELECT * FROM user_list_item WHERE user_menu_item_id = '$menuId' AND deleted IS NULL";
		$positionResult = mysqli_query($db, $positionQuery);

		if ( $positionResult ) {
			
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
					die(json_encode(array("fulllist"=>"Your " . $menuName . " list is full.")));
				} 
			}

			// STORE NEW LIST EL IN LIST TABLE
			$saveQuery = "INSERT INTO user_list_item (user_menu_item_id, user_list_item_title, user_list_item_url, user_list_item_position) VALUES 
						 							  ('{$menuId}', '{$title}', '{$url}', '{$lastElPosition}')";
			$saveResult = mysqli_query($db, $saveQuery);


			if ($saveResult) {
				echo json_encode(array("success"=>$menuName));
			}else {
				echo "Sorry, you can't do this right now. Please try again later."; 
			}	
		}

	}
	// IF THERE ARE MORE MENU ELEMENTS
	else if (mysqli_num_rows($result) > 1) {
		
		$menuElments = [];
		// PUSH ALL OF THE MENU ELMS IN ARRAY AND SEND IT TO VIEW
		while($row = mysqli_fetch_assoc($result)) {
			$menuElments[] = $row;
		}

		echo json_encode(array('menu'=>$menuElments));
	}
	else {
		echo json_encode(array('noMenuEL'=>"Please make a My List menu element first."));
	}

}else {
	echo json_encode(array('lr'=>'Please login or register first.'));
}


 ?>