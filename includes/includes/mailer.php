<?php

    // save input values
    $title = $_POST['var1'];
    $email = $_POST['var2'];
    $msg = $_POST['var3'];

    // setup email info
    $to      = 'wersastudio@gmail.com';
    $message = "Title: " . $title . "\r\n From: " . $email . "\r\n\r\n" . $msg;
    $headers = 'From: l-mail@listuin.com' . "\r\n" .
        'Reply-To: webmaster@example.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    // Send email
    $send = mail($to, $title, $message, $headers);

    // check if email is send or not
    if ( $send ) {
        echo 'success';
    }else {
        echo 'error';
    }

?>