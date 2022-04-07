<?php
include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/UserDAO.php");

session_start();

$email = $_POST["email"];
$password = $_POST["password"];

if ($email && $password) {

    $dao = new UserDAO();
    $user = $dao->LogIn($email, $password);

    if ($user != null) {

        $_SESSION["user_id"] = $user->getUserID();
        $_SESSION["username"] = $user->getUsername();

        if (isset($_POST["remember"])) {

            setcookie("email", $user->getEmail(), time() + (60 * 60));
            setcookie("password", $password, time() + (60 * 60));

        }
        else {

            setcookie("email", "", time() - 3600); 
            setcookie("password", "", time() - 3600); 

        }
        
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