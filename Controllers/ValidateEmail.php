<?php
include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/UserDAO.php");

$email = $_POST["email"];

if (isset($email)) {

    $dao = new UserDAO();
    $result = $dao->emailExists($email);

    if ($result == 0) {
        echo json_encode(array("result" => false));
    }
    else {
        echo json_encode(array("result" => true));
    }

}
?>