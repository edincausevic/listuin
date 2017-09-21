<?php 
session_start();
session_destroy();
if (isset($_COOKIE['kekslr'])) {
    unset($_COOKIE['kekslr']);
    setcookie('kekslr', null, -1, '/');
}
echo true;
 ?>