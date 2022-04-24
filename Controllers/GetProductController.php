<?php
include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/ProductDAO.php");

if (isset($_GET["product"])) {

    $productId = $_GET["product"];

    $productDao = new ProductDAO();

    $product = $productDao->getProduct($productId);

    if (isset($product)) {
        echo json_encode(array("status" => true, "product" => $product->expose()));
    }
    else {
        echo json_encode(array("status" => false));
    }
}
?>