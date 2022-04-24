<?php

class ProductViewModel {

    private $productId;
    private $productName;
    private $price;
    private $discount;
    private $image;
    private $categoryName;

    public function __construct() {

    }

    public function getProductId() {

        return $this->productId;

    }

    public function setProductId($productId) {

        $this->productId = $productId;

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

    public function getCategoryName() {

        return $this->categoryName;

    }

    public function setCategoryName($categoryName) {

        $this->categoryName = $categoryName;

    }

    public function expose() {

        return get_object_vars($this);
        
    }

}
?>