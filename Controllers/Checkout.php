<?php
include_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/CartDAO.php");
include_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/OrderDAO.php");

session_start();

if (isset($_POST["names"]) && isset($_POST["last-name"]) && isset($_POST["street-address"]) &&
isset($_POST["city"]) && isset($_POST["state"]) && isset($_POST["postal-code"]) && 
isset($_POST["email"]) && isset($_POST["phone"])) {

    $name = $_POST["names"];
    $lastName = $_POST["last-name"];
    $streetAddress = $_POST["street-address"];
    $city = $_POST["city"];
    $state = $_POST["state"];
    $postalCode = $_POST["postal-code"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];

    if (!isset($_SESSION["user_id"])) {
        echo json_encode(array("false"));
        return;
    }

    $userId = $_SESSION["user_id"];

    $cartDAO = new CartDAO();
    $cartId = $cartDAO->getCart($userId);

    $orderDAO = new OrderDAO();
    $result = $orderDAO->Create($userId, $cartId);

    if ($result) {
        echo json_encode(array("Siuuu"));
    }
    else {
        echo json_encode(array("Nope"));
    }

    #echo json_encode(array($name, $lastName, $streetAddress, $city, $state, $postalCode, $email, $phone, $cartId));
}
else {
echo json_encode(array("status" => "Se me antoja caca Parker"));
}

?>