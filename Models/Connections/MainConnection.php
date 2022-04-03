<?php 

include("dbConnection.php");

class MainConnection extends DBConnection {

    public function executeNonQuery($query, $parameters) {

        $prepareStatement = $this->connection->prepare($query);
        return $prepareStatement->execute($parameters);

    }

    public function executeReader($query, $parameters) {

        $prepareStatement = $this->connection->prepare($query);

    }



}

?>