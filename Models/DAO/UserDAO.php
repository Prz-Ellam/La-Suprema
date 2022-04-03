<?php

include("../Connections/MainConnection.php");

class UserDAO {

    private $insert;
    private $update;
    private $delete;
    private $readAll;
    private $mainConnection;

    public function __construct() {

        $mainConnection = new MainConnection();

        $insert = "INSERT INTO users VALUES(?, ?, ?);";


        echo "Hola Mundo";
        



    }




}

?>