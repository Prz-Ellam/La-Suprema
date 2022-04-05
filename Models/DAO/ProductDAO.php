<?php

require_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/Connections/MainConnection.php");
require_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DTO/ProductDTO.php");

class ProductDAO {

    private $create, $update, $delete, $readAll;
    private $connection;

    public function __construct() {

        $this->connection = new MainConnection();

        $this->readAll = "CALL sp_GetProducts()";

    }

    public function ReadAll() {

        $result = $this->connection->executeReader($this->readAll, null);

        $products = [];
        while ($row = $result->fetch()) {

            $element = new ProductDTO();

            $element->setName($row["name"]);
            $element->setPrice($row["price"]);
            $element->setImage($row["image"]);


            $products[] = $element;
        }

        return $products;

    }



}

?>