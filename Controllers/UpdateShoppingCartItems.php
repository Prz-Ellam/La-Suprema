<?php
include_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/CartItemDAO.php");
include_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/CartDAO.php");

session_start();

if (isset($_POST["product-id"]) && isset($_POST["quantity"])) {

    $productId = $_POST["product-id"];
    $quantity = $_POST["quantity"];

    $cartDAO = new CartDAO();
    $cartId = $cartDAO->getCart($_SESSION["user_id"]);
    
    $cartItemDAO = new CartItemDAO();

    $result = $cartItemDAO->updateCartItem($cartId, $productId, $quantity);

    if ($result > 0) {
        echo json_encode(array("status" => true));
    }
    else {
        echo json_encode(array("status" => false));
    }

}
else {
    echo json_encode(array("status" => false));
}

?>