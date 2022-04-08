<?php
session_start();

$email = $_COOKIE["email"];
$password = $_COOKIE["password"];
$remember = $_COOKIE["remember"];

if (isset($email) && isset($password)) {
    echo json_encode(array("cookies" => true, "email" => $email, "password" => $password, "remember" => $remember));
}
else {
    echo json_encode(array("cookies" => false));
}
?>