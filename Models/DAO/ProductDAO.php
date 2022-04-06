<?php

require_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/Connections/MainConnection.php");
require_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DTO/ProductDTO.php");

class ProductDAO {

    private $create, $update, $delete, $readAll, $sellers, $recomendations;
    private $mainConnection;

    public function __construct() {

        $this->connection = new MainConnection();

        $this->readAll = "CALL sp_GetProducts()";
        $this->sellers = "CALL sp_GetSellersProducts()";
        $this->recomendations = "CALL sp_GetUserRecomendations(?)";

    }

    public function ReadAll() {

        $result = $this->mainConnection->executeReader($this->readAll, null);

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

    public function ReadSellerProducts() {

        $result = $this->mainConnection->executeReader($this->sellers, null);

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

    public function ReadUserFavorites($userID) {

        $parameters = array($userID);
        $result = $this->mainConnection->executeReader($this->recomendations, $parameters);

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