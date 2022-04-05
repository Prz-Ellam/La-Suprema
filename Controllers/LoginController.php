<?php

include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/UserDAO.php");

if (isset($_POST["email"]) && isset($_POST["password"])) {

    $email = $_POST["email"];
    $password = $_POST["password"];


    $dao = new UserDAO();
    $result = $dao->LogIn($email, $password);


    echo json_encode(array("success" => $result));
/*
    if ($response) {
        echo json_encode(array("success" => true));
    }
    else {
        echo json_encode(array("success" => false));
    }
*/
} 
else {
    echo json_encode(array("success" => 0));
}


?>