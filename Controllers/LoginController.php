<?php

include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/UserDAO.php");

if (isset($_POST["email"]) && isset($_POST["password"])) {

    $email = $_POST["email"];
    $password = $_POST["password"];


    $dao = new UserDAO();
    $result = $dao->LogIn($email, $password);


    if ($result != null) {
        session_start();

        $_SESSION["user_id"] = $result[0];
        $_SESSION["username"] = $result[1];
        
        echo json_encode(array("success" => true));

    }
    else {
        echo json_encode(array("success" => false));
    }


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