<?php
include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/UserDAO.php");

$username = $_POST["username"];

if (isset($username)) {

    $dao = new UserDAO();
    $result = $dao->usernameExists($username);

    if ($result == 0) {
        echo json_encode(array("result" => false));
    }
    else {
        echo json_encode(array("result" => true));
    }

}
?>