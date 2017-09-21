<?php 

// CREATE A USER
function generateRandomString($length = 5) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

// HASH A PASSWORD
function hashPassword($pass) {
	$options = [
	    'cost' => 8
	];
	return password_hash($pass, PASSWORD_BCRYPT, $options);
} 



 ?>