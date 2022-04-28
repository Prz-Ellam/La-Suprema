<?php
require_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/Connections/MainConnection.php");

class OrderDAO {

    private $create;
    private $mainConnection;

    public function __construct() {

        $this->mainConnection = new MainConnection();
        $this->create = "CALL sp_CreateOrder(?, ?)";

    }

    public function Create($userId, $cartId) {

        $parameters = array($userId, $cartId);
        $execute = $this->mainConnection->executeNonQuery($this->create, $parameters);

        return ($execute > 0) ? true : false;

    }

}


?>