<?php

require_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/Connections/MainConnection.php");
require_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DTO/ProductDTO.php");
require_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/ViewModels/ProductViewModel.php");

class ProductDAO {

    private $create, $update, $delete, $readAll, $sellers, $recomendations, $shoppingsCount, $productFilter,
    $offerProducts, $getProduct, $categoryProducts;
    private $mainConnection;

    public function __construct() {

        $this->mainConnection = new MainConnection();

        $this->readAll = "CALL sp_GetProducts()";
        $this->sellers = "CALL sp_GetSellersProducts()";
        $this->recomendations = "CALL sp_GetUserRecomendations(?)";
        $this->shoppingsCount = "CALL sp_GetShoppingsCount(?)";
        $this->productFilter = "CALL sp_ProductsFilter(?, ?)";
        $this->offerProducts = "CALL sp_GetOfferProducts()";
        $this->getProductQuery = "CALL sp_GetProduct(?)";
        $this->categoryProducts = "CALL sp_GetCategoryProducts(?)";

    }

    public function ReadAll() {

        $result = $this->mainConnection->executeReader($this->readAll, null);

        $products = [];
        while ($row = $result->fetch()) {

            $element = new ProductDTO();

            $element->setProductId($row["product_id"]);
            $element->setName($row["name"]);
            $element->setPrice($row["price"]);
            $element->setDiscount($row["discount"]);
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

            $element->setProductId($row["product_id"]);
            $element->setName($row["name"]);
            $element->setPrice($row["price"]);
            $element->setDiscount($row["discount"]);
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

            $element->setProductId($row["product_id"]);
            $element->setName($row["name"]);
            $element->setPrice($row["price"]);
            $element->setDiscount($row["discount"]);
            $element->setImage($row["image"]);


            $products[] = $element;
        }

        return $products;

    }

    public function readOfferProducts() {

        $result = $this->mainConnection->executeReader($this->offerProducts, null);

        $products = [];
        while ($row = $result->fetch()) {

            $element = new ProductDTO();

            $element->setProductId($row["product_id"]);
            $element->setName($row["name"]);
            $element->setPrice($row["price"]);
            $element->setDiscount($row["discount"]);
            $element->setImage($row["image"]);


            $products[] = $element;
        }

        return $products;

    }

    public function getShoppingsCount($userID) {

        $parameters = array($userID);
        $execute = $this->mainConnection->executeReader($this->shoppingsCount, $parameters);

        if ($row = $execute->fetch()) {
            return $row["Total"];
        }
        else {
            return 0;
        }

    }

    public function searchProducts($filter) {

        $parameters = array($filter, metaphone($filter));
        $execute = $this->mainConnection->executeReader($this->productFilter, $parameters);

        $products = [];
        while ($row = $execute->fetch()) {

            $element = new ProductDTO();

            $element->setName($row["name"]);
            $element->setPrice($row["price"]);
            $element->setImage($row["image"]);


            $products[] = $element;
        }

        return $products;

    }

    public function getProduct($productId) {

        $parameters = array($productId);
        $execute = $this->mainConnection->executeReader($this->getProductQuery, $parameters);

        while ($row = $execute->fetch()) {

            $element = new ProductViewModel();

            $element->setProductId($row["product_id"]);
            $element->setProductName($row["product_name"]);
            $element->setPrice($row["price"]);
            $element->setDiscount($row["discount"]);
            $element->setImage($row["image"]);
            $element->setCategoryName($row["category_name"]);

            return $element;
        }

        return null;

    }

    public function getCategoryProducts($categoryId) {

        


    }



}

?>