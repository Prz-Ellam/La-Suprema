<?php
include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/UserDAO.php");

$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["password"];
$confirmPassword = $_POST["confirmpassword"];

if (isset($username) && isset($email) && isset($password) && isset($confirmPassword)) {

    $dao = new UserDAO();
    $result = $dao->SignIn($username, $email, $password);

    if ($result < 0) {

        echo json_encode(array("success" => false));

    }
    else {

        echo json_encode(array("success" => true));

    }
} 
else {

    echo json_encode(array("success" => false));
    
}
?>