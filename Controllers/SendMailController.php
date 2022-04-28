<?php

if (isset($_POST["email"])) {


    ini_set("smtp_port","587");
    
    $to = $_POST["email"];
    $subject = "Recuperación de contraseña";
    $message = "<html><head></head><body><h1>Holis</h1></body></html>";

    $additional_headers = "MIME-Version: 1.0" . "\r\n" . "Content-type: text/html; charset=iso-8859-1" . "\r\n";
    $additional_headers .= "From: <supreme@domain.com>" . "\r\n";

    echo mail($to, $subject, $message, $additional_headers);

}

?>