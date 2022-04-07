<?php
include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/Connections/MainConnection.php");
include($_SERVER['DOCUMENT_ROOT']."/La-Suprema/Models/DTO/UserDTO.php");

class UserDAO {

    private $insert;
    private $update;
    private $delete;
    private $readAll;
    private $login;
    private $emailExists;
    private $usernameExists;
    private $mainConnection;

    public function __construct() {

        $this->mainConnection = new MainConnection();

        $this->insert = "INSERT INTO users(username, email, password) VALUES(?, ?, ?)";
        $this->login = "SELECT user_id, username, password FROM users WHERE email = ?";
        $this->emailExists = "SELECT COUNT(*) AS Total FROM users WHERE email = ?";
        $this->usernameExists = "SELECT COUNT(*) AS Total FROM users WHERE username = ?";

    }

    public function SignIn($username, $email, $password) {

        $passwordHashed = password_hash($password, PASSWORD_DEFAULT);

        $parameters = array($username, $email, $passwordHashed);
        return $this->mainConnection->executeNonQuery($this->insert, $parameters);

    }

    public function LogIn($email, $password) {

        $parameters = array($email);
        $execute = $this->mainConnection->executeReader($this->login, $parameters);

        if ($row = $execute->fetch()) {

            $passwordHashed = $row["password"];
            $passwordCheck = password_verify($password, $passwordHashed);

            if ($passwordCheck == false) {
                return null;
            }
            else {
                $user = new UserDTO();
                $user->setUserID($row["user_id"]);
                $user->setUsername($row["username"]);
                $user->setEmail($email);
                return $user;
            }

        }
        else {
            return null;
        }

    }

    public function emailExists($email) {

        $parameters = array($email);
        $execute = $this->mainConnection->executeReader($this->emailExists, $parameters);

        if ($row = $execute->fetch()) {
            return $row["Total"];
        }
        else {
            return 0;
        }

    }

    public function usernameExists($username) {

        $parameters = array($username);
        $execute = $this->mainConnection->executeReader($this->usernameExists, $parameters);

        if ($row = $execute->fetch()) {
            return $row["Total"];
        }
        else {
            return 0;
        }

    }

}

?>