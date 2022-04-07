<?php
require_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/Connections/MainConnection.php");

class CategoryDAO {

    private $readAll, $readUserFavorites;
    private $mainConnection;

    public function __construct() {

        $this->mainConnection = new MainConnection();
        $this->readAll = "";
        $this->readUserFavorites = "";

    }

    public function getCategories() {

        $result = $this->mainConnection->executeReader($this->readAll, null);

    }

    public function getUserFavoriteCategories($userID) {

        $parameters = array($userID);
        $result = $this->mainConnection->executeReader($this->recomendations, $parameters);

    }



}

?>