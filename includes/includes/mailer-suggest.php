<?php

    // save input values
    $email = $_POST['var1'];
    $url = $_POST['var2'];
    $msg = $_POST['var3'];

    // setup email info
    $to      = 'wersastudio@gmail.com';
    $title   = 'SUGGEST THE CONTENT';
    $message = "URL: " . $url . "\r\n From: " . $email . "\r\n\r\n" . $msg;
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