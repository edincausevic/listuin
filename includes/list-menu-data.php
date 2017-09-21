<?php

error_reporting(0);
session_start();


// CONNECT TO THE SERVER
include 'reusable/connection.php';

// GET DATA
$postdata = file_get_contents('php://input');
$data = json_decode($postdata);

$title = mysqli_escape_string($db, $data->title);

if (isset($_SESSION['user_is_loggedin'])) {
    
    $id = $_SESSION['user_is_loggedin'];
    $mylist = array();
    
    $query = "SELECT * FROM user_menu_item WHERE user_id = '$id' AND deleted IS NULL";
    $result = mysqli_query($db, $query);
    
    if ($result) {
        
        // TAKE MENU DATA AND PUSH IT IN $mylist ARRAY
        // FIND ACTIVE LIST MENU ID BASED ON TITLE AND STORE IT IN $titleId
        while ($row = mysqli_fetch_assoc($result)) {
            
            if ($row['user_menu_item_title'] == $title) {
                $titleId = $row['user_menu_item_id'];
            }
            
            $mylist[] = $row;
        }
        
        
        // BRING LIST DATA FOR MENU EL
        $queryList = "SELECT * FROM user_list_item WHERE user_menu_item_id = '$titleId' AND deleted IS NULL";
        $resultList = mysqli_query($db, $queryList);
        
        if ($resultList) {
            
            while ($listRow = mysqli_fetch_assoc($resultList)) {
                $mylist[] = $listRow;
            }
            echo json_encode($mylist);
        }
        
    }
}else if ( isset($_COOKIE["kekslr"]) ) {
    
    $cookie = $_COOKIE["kekslr"];
    
    $cookieQuery = "SELECT user_id FROM users WHERE user_login_cookie = '$cookie'";
    $cookieResult = mysqli_query($db, $cookieQuery);
    
    if ( $cookieResult ) {
        
        while($row = mysqli_fetch_array($cookieResult)) {
            
            // set session
            $id = $row[0];
            $_SESSION['user_is_loggedin'] = $id;
            
            $mylist = array();
            
            $query = "SELECT * FROM user_menu_item WHERE user_id = '$id' AND deleted IS NULL";
            $result = mysqli_query($db, $query);
            
            if ($result) {
                
                // TAKE MENU DATA AND PUSH IT IN $mylist ARRAY
                // FIND ACTIVE LIST MENU ID BASED ON TITLE AND STORE IT IN $titleId
                while ($row = mysqli_fetch_assoc($result)) {
                    
                    if ($row['user_menu_item_title'] == $title) {
                        $titleId = $row['user_menu_item_id'];
                    }
                    
                    $mylist[] = $row;
                }
                
                
                // BRING LIST DATA FOR MENU EL
                $queryList = "SELECT * FROM user_list_item WHERE user_menu_item_id = '$titleId' AND deleted IS NULL";
                $resultList = mysqli_query($db, $queryList);
                
                if ($resultList) {
                    
                    while ($listRow = mysqli_fetch_assoc($resultList)) {
                        $mylist[] = $listRow;
                    }
                    echo json_encode($mylist);
                }
                
            }
        }
    }
}






?>