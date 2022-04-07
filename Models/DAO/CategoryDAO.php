<?php
require_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/Connections/MainConnection.php");
require_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DTO/CategoryDTO.php");

class CategoryDAO {

    private $readAll;
    private $mainConnection;

    public function __construct() {

        $this->mainConnection = new MainConnection();
        $this->readAll = "CALL sp_GetCategories(?)";

    }

    public function getCategories() {

        $result = $this->mainConnection->executeReader($this->readAll, array(0));

        $categories = [];
        while ($row = $result->fetch()) {

            $element = new CategoryDTO();

            $element->setName($row["name"]);
            $element->setImage($row["image"]);


            $categories[] = $element;
        }

        return $categories;

    }

    public function getUserFavoriteCategories($userID) {

        $parameters = array($userID);
        $result = $this->mainConnection->executeReader($this->readAll, $parameters);

        $categories = [];
        while ($row = $result->fetch()) {

            $element = new CategoryDTO();

            $element->setName($row["name"]);
            $element->setImage($row["image"]);


            $categories[] = $element;
        }

        return $categories;

    }

}
?>