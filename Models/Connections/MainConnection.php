<?php
include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/Connections/dbConnection.php");

class MainConnection extends DBConnection {

    public function executeNonQuery($query, $parameters) {

        try {
            
            $prepareStatement = $this->getConnection()->prepare($query);
            $prepareStatement->execute($parameters);

            $rowCount = $prepareStatement->rowCount();
            $prepareStatement = null;

            return $rowCount;

        }
        catch (PDOException $ex) {

            echo $ex->getMessage();

            return -1;

        }

    }

    public function executeReader($query, $parameters) {

        $prepareStatement = $this->getConnection()->prepare($query);
        $prepareStatement->execute($parameters);
        return $prepareStatement;
        
    }

}
?>