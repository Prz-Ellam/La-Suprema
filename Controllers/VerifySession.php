<?php 

session_start();


if (isset($_SESSION["username"])) {
    echo json_encode(array("success" => true));
}
else {
    echo json_encode(array("success" => false));
}



?>