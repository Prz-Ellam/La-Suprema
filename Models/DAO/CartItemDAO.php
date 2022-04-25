<?php
include_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/Connections/MainConnection.php");
require_once($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/ViewModels/ShoppingCartViewModel.php");

class CartItemDAO {

    private $insert;
    private $getAll;
    private $update;
    private $delete;
    private $mainConnection;

    public function __construct() {

        $this->mainConnection = new MainConnection();
        $this->insert = "CALL sp_InsertCartItem(?, ?, ?)";
        $this->getAll = "CALL sp_GetCartItems(?)";
        $this->update = "CALL sp_UpdateCartItem(?, ?, ?)";
        $this->delete = "CALL sp_DeleteCartItem(?, ?)";

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

            $element->setProductId($row["product_id"]);
            $element->setImage($row["image"]);
            $element->setProductName($row["name"]);
            $element->setPrice($row["price"]);
            $element->setQuantity($row["quantity"]);


            $items[] = $element;
        }

        return $items;

    }

    public function updateCartItem($cartId, $productId, $quantity) {

        $parameters = array($cartId, $productId, $quantity);
        $rowCount = $this->mainConnection->executeNonQuery($this->update, $parameters);
        return ($rowCount > 0) ? true : false;

    }

    public function deleteCartItem($cartId, $productId) {

        $parameters = array($cartId, $productId);
        $rowCount = $this->mainConnection->executeNonQuery($this->delete, $parameters);
        return ($rowCount > 0) ? true : false;

    }

}

?>