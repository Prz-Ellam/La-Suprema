<?php
include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DAO/CategoryDAO.php");

session_start();

$dao = new CategoryDAO();

$categories = [];
if (isset($_SESSION["username"])) {

    $results = $dao->getUserFavoriteCategories($_SESSION["user_id"]);

    foreach($results as $result) {

        $categories[] = $result->expose();

    }

}
else {

    $results = $dao->getCategories(0);

    foreach($results as $result) {

        $categories[] = $result->expose();

    }

}

echo json_encode(array("categories" => $categories));
?>