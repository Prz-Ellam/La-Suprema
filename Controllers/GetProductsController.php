<?php 

include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/ProductDAO.php");

$dao = new ProductDAO();
$products = $dao->ReadAll();

$recents = [];
foreach($products as $product) {

    $recents[] = $product->expose();

}


$products = $dao->ReadSellerProducts();

$sellers = [];
foreach($products as $product) {

    $sellers[] = $product->expose();

}


echo json_encode(array("recents" => $recents, "sellers" => $sellers));

?>