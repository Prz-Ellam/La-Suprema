<?php
include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/UserDAO.php");

if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['password']) && isset($_POST['confirmpassword'])) {

    $username = $_POST["name"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $confirmPassword = $_POST["confirmpassword"];


    $dao = new UserDAO();
    $dao->SignIn($username, $email, $password);


    echo json_encode(array("success" => true));
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