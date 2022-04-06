<?php
include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/Connections/dbConnection.php");

class MainConnection extends DBConnection {

    public function executeNonQuery($query, $parameters) {

        $prepareStatement = $this->getConnection()->prepare($query);

        if (!$prepareStatement->execute($parameters)) {
            $prepareStatement = null;
            header("location:../../index.php?error=stmtfailed");
            exit();
        }

        $rowCount = $prepareStatement->rowCount();
        $prepareStatement = null;

        return $rowCount;

    }

    public function executeReader($query, $parameters) {

        $prepareStatement = $this->getConnection()->prepare($query);
        $prepareStatement->execute($parameters);
        return $prepareStatement;
        
    }

}
?>