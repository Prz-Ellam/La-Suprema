<?php
require_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/ProductDAO.php");

if (isset($_GET["term"])) {

    $search = $_GET["term"];

    $dao = new ProductDAO();
    $products = $dao->searchProducts($search);
/*
    foreach($products as $product) {
        echo $product->getName()."\n";
        echo $product->getPrice()."\n";
    }
*/
    $names = [];
    foreach($products as $product) {
        $names[] =  $product->getName();
    }

    echo json_encode($names);
    
}
else {
    
}

?>