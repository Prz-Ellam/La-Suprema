<?php 

include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/Connections/dbConnection.php");

class MainConnection extends DBConnection {

    public function executeNonQuery($query, $parameters) {

        $prepareStatement = $this->getConnection()->prepare($query);
        return $prepareStatement->execute($parameters);

    }

    public function executeReader($query, $parameters) {

        $prepareStatement = $this->getConnection()->prepare($query);
        $prepareStatement->execute($parameters);
        return $prepareStatement;
        
    }


}

?>