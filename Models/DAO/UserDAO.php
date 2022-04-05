<?php

include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/Connections/MainConnection.php");

class UserDAO {

    private $insert;
    private $update;
    private $delete;
    private $readAll;
    private $login;
    private $mainConnection;

    public function __construct() {

        $this->mainConnection = new MainConnection();

        $this->insert = "INSERT INTO users(username, email, password) VALUES(?, ?, ?)";
        $this->login = "SELECT username FROM users WHERE email = ? AND password = ?";


    }

    public function SignIn($username, $email, $password) {

        $parameters = array($username, $email, $password);
        $this->mainConnection->executeNonQuery($this->insert, $parameters);

    }

    public function LogIn($email, $password) {

        $parameters = array($email, $password);
        $execute = $this->mainConnection->executeReader($this->login, $parameters);

        if ($row = $execute->fetch()) {
            return $row["username"];
        }
        else {
            return null;
        }


    }




}

?>