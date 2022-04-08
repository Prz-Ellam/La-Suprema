<?php
include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/ProductDAO.php");

session_start();

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

$products = $dao->readOfferProducts();

$offers = [];
foreach($products as $product) {

    $offers[] = $product->expose();

}

$interest = [];
if (isset($_SESSION["username"])) {

    $shoppingsCount = $dao->getShoppingsCount($_SESSION["user_id"]);

    if ($shoppingsCount > 0) {

        $products = $dao->ReadUserFavorites($_SESSION["user_id"]);
        
        foreach($products as $product) {
            $interest[] = $product->expose();
        }
        
    }

} 


echo json_encode(array("recents" => $recents, "sellers" => $sellers, 
"recomendations" => $interest, "offers" => $offers));
?>