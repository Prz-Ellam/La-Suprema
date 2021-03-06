<?php

class ProductDTO {

    private $productId;
    private $name;
    private $price;
    private $discount;
    private $image;

    public function __construct() {

    }

    public function getProductId() {

        return $this->productId;

    }

    public function setProductId($productId) {

        $this->productId = $productId;

    }

    public function getName() {

        return $this->name;

    }

    public function setName($name) {

        $this->name = $name;

    }

    public function getPrice() {

        return $this->price;

    }

    public function setPrice($price) {

        $this->price = $price;

    }

    public function getDiscount() {

        return $this->discount;

    }

    public function setDiscount($discount) {

        $this->discount = $discount;

    }

    public function getImage() {

        return $this->image;

    }

    public function setImage($image) {

        $this->image = $image;

    }

    public function expose() {

        return get_object_vars($this);
        
    }

}
?>