<?php 

include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/ProductDAO.php");

$dao = new ProductDAO();
$products = $dao->ReadAll();

$array = [];
foreach($products as $product) {

    $array[] = $product->expose();

}

echo json_encode($array);

?>