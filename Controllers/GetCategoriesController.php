<?php
include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/CategoryDAO.php");

session_start();

$dao = new CategoryDAO();

$categories = [];
if (isset($_SESSION["username"])) {

    $results = $dao->getUserFavoriteCategories($_SESSION["user_id"]);

    foreach($result as $results) {

        $categories[] = $result;

    }

}
else {

    $results = $dao->getCategories();

    foreach($result as $results) {

        $categories[] = $result;

    }

}

echo json_encode(array("categories" => $categories));
?>