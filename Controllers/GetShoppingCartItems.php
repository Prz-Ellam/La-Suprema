<?php
include_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/CartItemDAO.php");
include_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/CartDAO.php");

session_start();

$cartDAO = new CartDAO();
$cartId = $cartDAO->getCart($_SESSION["user_id"]);

$cartItemDAO = new CartItemDAO();
$items = $cartItemDAO->getCartItems($cartId);

$sendItems = [];
foreach($items as $item) {
    $sendItems[] = $item->expose();
}


echo json_encode(array("status" => true, "items" => $sendItems));

?>