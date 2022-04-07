<?php

class CategoryDTO {

    private $name;
    private $image;

    public function __construct() {

    }

    public function getName() {

        return $this->name;

    }

    public function setName($name) {

        $this->name = $name;

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