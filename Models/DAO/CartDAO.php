<?php
include_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/Connections/MainConnection.php");

class CartDAO {

    private $create;
    private $get;
    private $mainConnection;

    public function __construct() {

        $this->mainConnection = new MainConnection();
        $this->create = "CALL sp_CreateCart(?)";
        $this->get = "CALL sp_GetActiveCart(?)";

    }

    public function createCart($userId) {

        $parameters = array($userId);
        $rowCount = $this->mainConnection->executeNonQuery($this->create, $parameters);
        return ($rowCount > 0) ? true : false;

    }

    
    public function getCart($userId) {

        $parameters = array($userId);
        $result = $this->mainConnection->executeReader($this->get, $parameters);

        while ($row = $result->fetch()) {

            return $row["cart_id"];
        }

        return null;

    }


}

?>