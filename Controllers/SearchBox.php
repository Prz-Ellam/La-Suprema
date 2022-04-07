<?php
require_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/ProductDAO.php");

$search = $_GET["search"];

if (isset($search)) {

    $dao = new ProductDAO();
    $products = $dao->searchProducts($search);

    foreach($products as $product) {
        echo $product->getName()."\n";
        echo $product->getPrice()."\n";
    }
    
}
else {
    
}

?>