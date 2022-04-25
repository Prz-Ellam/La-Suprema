<?php

class ShoppingCartViewModel {

    private $productId;
    private $image;
    private $productName;
    private $price;
    private $quantity;

    public function __construct() {

    }

    public function getProductId() {

        return $this->productId;

    }

    public function setProductId($productId) {

        $this->productId = $productId;

    }

    public function getImage() {

        return $this->image;

    }

    public function setImage($image) {

        $this->image = $image;

    }

    public function getProductName() {

        return $this->productName;

    }

    public function setProductName($productName) {

        $this->productName = $productName;

    }

    public function getPrice() {

        return $this->price;

    }

    public function setPrice($price) {

        $this->price = $price;

    }

    public function getQuantity() {

        return $this->quantity;

    }

    public function setQuantity($quantity) {

        $this->quantity = $quantity;

    }

    public function expose() {

        return get_object_vars($this);
        
    }

}

?>