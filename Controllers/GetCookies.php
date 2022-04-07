<?php
session_start();

$email = $_COOKIE["email"];
$password = $_COOKIE["password"];

if (isset($email) && isset($password)) {
    echo json_encode(array("cookies" => true, "email" => $email, "password" => $password));
}
else {
    echo json_encode(array("cookies" => false));
}
?>