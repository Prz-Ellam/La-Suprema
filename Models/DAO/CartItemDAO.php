<?php
include_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/Connections/MainConnection.php");
require_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/ViewModels/ShoppingCartViewModel.php");

class CartItemDAO {

    private $insert;
    private $getTable;
    private $mainConnection;

    public function __construct() {

        $this->mainConnection = new MainConnection();
        $this->insert = "CALL sp_InsertCartItem(?, ?, ?)";
        $this->getAll = "CALL sp_GetCartItems(?)";

    }

    public function insertCartItem($cartId, $productId, $quantity) {

        $parameters = array($cartId, $productId, $quantity);
        $rowCount = $this->mainConnection->executeNonQuery($this->insert, $parameters);
        return ($rowCount > 0) ? true : false;

    }

    public function getCartItems($cartId) {

        $parameters = array($cartId);
        $result = $this->mainConnection->executeReader($this->getAll, $parameters);

        $items = [];
        while ($row = $result->fetch()) {

            $element = new ShoppingCartViewModel();

            $element->setImage($row["image"]);
            $element->setProductName($row["name"]);
            $element->setPrice($row["price"]);
            $element->setQuantity($row["quantity"]);


            $items[] = $element;
        }

        return $items;

    }

}

?>