<?php
session_start();

if (isset($_COOKIE["email"]) && isset($_COOKIE["password"]) && isset($_COOKIE["remember"])) {
    echo json_encode(array("cookies" => true, "email" => $_COOKIE["email"], "password" => $_COOKIE["password"], "remember" => $_COOKIE["remember"]));
}
else {
    echo json_encode(array("cookies" => false));
}
?>