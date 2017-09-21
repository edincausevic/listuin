<?php 

error_reporting(0);
session_start();

// CONNECT TO THE SERVER
include 'reusable/connection.php';

if (isset($_SESSION['user_is_loggedin'])) {

	$id = $_SESSION['user_is_loggedin'];
	$mylist = array();
	
	$query = "SELECT * FROM user_menu_item WHERE user_id = '$id' AND deleted IS NULL";
    $result = mysqli_query($db, $query);

    if ( mysqli_num_rows($result) >= 1) {
        
        // TAKE MENU DATA AND FIRST ITEM ID
        $takeFirstItem = false;
        while ($row = mysqli_fetch_assoc($result)) {

            if($takeFirstItem === false) { 
                $firstItemId = $row["user_menu_item_id"];
                $takeFirstItem = true;
            }
            $mylist[] = $row;
        }
        

        // TAKE LIST DATA FROM THE FIRST ITEM IN THE MENU LIST
        $listQuery = "SELECT * FROM user_list_item WHERE user_menu_item_id = '$firstItemId' AND deleted IS NULL";
        $listResult = mysqli_query($db, $listQuery);

        if ( $listResult ) {
            while($listRow = mysqli_fetch_assoc($listResult)) {
                $mylist[] = $listRow;
            }
        }
        
        echo json_encode($mylist);

    }else { echo 'db-empty'; }

} else if ( isset($_COOKIE["kekslr"]) ) {

	$cookie = $_COOKIE["kekslr"];

	$cookieQuery = "SELECT user_id FROM users WHERE user_login_cookie = '$cookie'";
	$cookieResult = mysqli_query($db, $cookieQuery);

	if ( mysqli_num_rows($cookieResult) >= 1 ) {
		while($row = mysqli_fetch_array($cookieResult)) {
			$id = $row[0];

			$_SESSION['user_is_loggedin'] = $id;
			
			$query = "SELECT * FROM user_menu_item WHERE user_id = '$id' AND deleted IS NULL";
		    $result = mysqli_query($db, $query);

		    if ( $result ) {
		        $mylist = array();

		        // TAKE MENU DATA AND FIRST ITEM ID
		        $takeFirstItem = false;
		        while ($row = mysqli_fetch_assoc($result)) {

		            if($takeFirstItem === false) { 
		                $firstItemId = $row["user_menu_item_id"];
		                $takeFirstItem = true;
		            }

		            $mylist[] = $row;
		        }
		        

		        // TAKE LIST DATA FROM THE FIRST ITEM IN THE MENU LIST
		        $listQuery = "SELECT * FROM user_list_item WHERE user_menu_item_id = '$firstItemId' AND deleted IS NULL";
		        $listResult = mysqli_query($db, $listQuery);

		        if ( $listResult ) {
		            while($listRow = mysqli_fetch_assoc($listResult)) {
		                $mylist[] = $listRow;
		            }
		        }
		        
		        echo json_encode($mylist);
		    }
		} // while
	}else { echo 'db-empty'; }
	
}





 ?>