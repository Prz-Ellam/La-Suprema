<?php
include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/UserDAO.php");
include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/CartDAO.php");

session_start();

$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["password"];
$confirmPassword = $_POST["confirmpassword"];

if (isset($username) && isset($email) && isset($password) && isset($confirmPassword)) {

    $dao = new UserDAO();
    $result = $dao->SignIn($username, $email, $password);

    if ($result == null) {

        echo json_encode(array("success" => false));

    }
    else {

        $_SESSION["user_id"] = $result->getUserID();
        $_SESSION["username"] = $result->getUsername();

        $cartDao = new CartDAO();
        $cartDao->createCart($result->getUserID());

        echo json_encode(array("success" => true));

    }
} 
else {

    echo json_encode(array("success" => false));
    
}
?>