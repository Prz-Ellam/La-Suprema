<?php
include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/UserDAO.php");

session_start();

if (isset($_POST["email"]) && isset($_POST["password"])) {

    $email = $_POST["email"];
    $password = $_POST["password"];

    $dao = new UserDAO();
    $result = $dao->LogIn($email, $password);

    if ($result != null) {

        $_SESSION["user_id"] = $result->getUserID();
        $_SESSION["username"] = $result->getUsername();
        
        echo json_encode(array("success" => true));
    }
    else {
        echo json_encode(array("success" => false));
    }

} 
else {
    echo json_encode(array("success" => false));
}
?>