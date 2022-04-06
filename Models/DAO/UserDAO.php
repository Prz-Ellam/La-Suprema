<?php
include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/Connections/MainConnection.php");
include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DTO/UserDTO.php");

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
        $this->login = "SELECT user_id, username FROM users WHERE email = ? AND password = ?";


    }

    public function SignIn($username, $email, $password) {

        $passwordHashed = password_hash($password, PASSWORD_DEFAULT);

        $parameters = array($username, $email, $passwordHashed);
        $this->mainConnection->executeNonQuery($this->insert, $parameters);

    }

    public function LogIn($email, $password) {

        $parameters = array($email, $password);
        $execute = $this->mainConnection->executeReader($this->login, $parameters);

        if ($row = $execute->fetch()) {
            $user = new UserDTO();
            $user->setUserID($row["user_id"]);
            $user->setUsername($row["username"]);
            return $user;
        }
        else {
            return null;
        }

    }

}
?>