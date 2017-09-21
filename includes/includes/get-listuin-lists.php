<?php 


// CONNECT TO THE SERVER
include 'reusable/connection.php';

// DATA FROM INPUT
$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

$whichPage = $data->page;

// GET LISTUIN LISTS
$query = "SELECT * FROM listuin_list_item WHERE listuin_item_page = '$whichPage' AND deleted IS NULL";
$result = mysqli_query($db, $query);

if ( $result ) {
	
	$page = array();
	while ($row = mysqli_fetch_assoc($result)) {
		$page[] = $row;
	}

	echo json_encode($page);
}



 ?>